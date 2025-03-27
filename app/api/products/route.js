import { NextResponse } from "next/server";
import { db } from "@/config/firebaseConfig";
import Fuse from "fuse.js";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

// In-memory cache to store paginated products (expires after 30 minutes)
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: ["title"], // Search on the title field
  threshold: 0.4, // Adjust the fuzziness of search (0 = exact match, 1 = very fuzzy)
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 20;
    const searchQuery = searchParams.get("search") || ""; // Get search query from URL
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "default";

    // Check if the data is already cached
    const cacheKey = `page-${page}-${searchQuery}-${category}-${sort}`;
    const cachedData = cache.get(cacheKey);
    const now = new Date().getTime();

    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data, { status: 200 });
    }

    const productsRef = collection(db, "products");

    let firestoreQuery = query(productsRef, orderBy("id")); // Default by ID

    // Apply category filter first if provided
    if (category) {
      firestoreQuery = query(firestoreQuery, where("category", "==", category));
    }

    // Apply sorting
    switch (sort) {
      case "price_asc":
        firestoreQuery = query(firestoreQuery, orderBy("price", "asc"));
        break;
      case "price_desc":
        firestoreQuery = query(firestoreQuery, orderBy("price", "desc"));
        break;
      default:
        firestoreQuery = query(firestoreQuery, orderBy("id"));
    }

    // Fetch all products that match the query
    const snapshot = await getDocs(firestoreQuery);
    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Perform fuzzy search if there's a search query
    if (searchQuery) {
      const fuse = new Fuse(products, fuseOptions);
      products = fuse.search(searchQuery).map((result) => result.item);
    }

    const totalCount = products.length;

    // Apply pagination to the filtered and sorted products
    const paginatedProducts = paginateProducts(products, page, pageSize);

    const response = {
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    };

    // Cache the response
    cache.set(cacheKey, { timestamp: now, data: response });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}

// Function to paginate the filtered products
function paginateProducts(products, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  return products.slice(startIndex, startIndex + pageSize);
}