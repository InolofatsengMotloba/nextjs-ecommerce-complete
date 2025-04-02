import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  const { id } = params; // Extract product ID from URL (1, 2, 3, etc.)

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the product document using the Firestore document ID (001, 002, 003, etc.)
    const productRef = doc(db, "products", id.padStart(3, "0")); // Ensure the ID is 3 digits (001, 002, etc.)
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(productSnap.data(), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 }
    );
  }
}
