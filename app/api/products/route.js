import { NextResponse } from "next/server";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

// In-memory cache to store paginated products (expires after 30 minutes)
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 20;

    // Check if the data is already cached
    const cacheKey = `page-${page}`;
    const cachedData = cache.get(cacheKey);
    const now = new Date().getTime();

    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data, { status: 200 });
    }

    const productsRef = collection(db, "products");
    let q = query(productsRef, orderBy("id"), limit(pageSize));

    if (page > 1) {
      const lastVisibleDoc = await getLastVisibleDoc(page, pageSize);
      if (lastVisibleDoc) {
        q = query(
          productsRef,
          orderBy("id"),
          startAfter(lastVisibleDoc),
          limit(pageSize)
        );
      }
    }

    const snapshot = await getDocs(q);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch the total product count using Firestore's count function
    const totalCount = await getTotalCount();

    const response = {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
    };

    // Cache the response
    cache.set(cacheKey, { timestamp: now, data: response });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}

async function getLastVisibleDoc(page, pageSize) {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("id"), limit((page - 1) * pageSize));
  const snapshot = await getDocs(q);
  return snapshot.docs[snapshot.docs.length - 1];
}

async function getTotalCount() {
  const productsRef = collection(db, "products");

  // Use Firestore's count aggregation function to avoid reading all documents
  const snapshot = await getCountFromServer(productsRef);

  return snapshot.data().count;
}
