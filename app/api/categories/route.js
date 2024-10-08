import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export async function GET() {
  try {
    // Reference to the "categories" collection
    const categoriesRef = collection(db, "categories");

    // Fetch all categories
    const snapshot = await getDocs(categoriesRef);

    // Process the documents into an array
    const categories = snapshot.docs.map((doc) => ({
      // id: doc.id,
      ...doc.data(),
    }));

    // Return the categories as a JSON response
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories", details: error.message },
      { status: 500 }
    );
  }
}
