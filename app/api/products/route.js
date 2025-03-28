import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
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

    // Check if data is cached
    const cacheKey = `page-${page}-${searchQuery}-${category}-${sort}`;
    const cachedData = cache.get(cacheKey);
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data, { status: 200 });
    }

    // Firestore collection reference
    const productsRef = collection(db, "products");

    // Construct query constraints dynamically
    const constraints = [];

    if (category) {
      constraints.push(where("category", "==", category));
    }

    // Apply sorting based on the selected option
    if (sort === "price_asc") {
      constraints.push(orderBy("price", "asc"));
    } else if (sort === "price_desc") {
      constraints.push(orderBy("price", "desc"));
    }

    // Create Firestore query with constraints
    const firestoreQuery = query(productsRef, ...constraints);

    // Fetch matching products
    const snapshot = await getDocs(firestoreQuery);
    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply fuzzy search if a search query is provided
    if (searchQuery) {
      const fuse = new Fuse(products, fuseOptions);
      products = fuse.search(searchQuery).map((result) => result.item);
    }

    const totalCount = products.length;

    // Apply pagination
    const paginatedProducts = paginateProducts(products, page, pageSize);

    // Prepare response
    const response = {
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    };

    // Cache response
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

// Pagination function
function paginateProducts(products, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  return products.slice(startIndex, startIndex + pageSize);
}
