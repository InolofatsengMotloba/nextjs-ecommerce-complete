import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  const { id } = params;
  console.log("API route - Received ID:", id);

  let formattedId = id;
  // If the ID is numeric, pad it to match your Firestore document IDs
  if (!isNaN(id)) {
    formattedId = String(id).padStart(3, "0");
  }

  console.log("API route - Looking up document with ID:", formattedId);

  try {
    const productRef = doc(db, "products", formattedId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.log("API route - Product not found:", formattedId);
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = productSnap.data();
    console.log("API route - Product found with data keys:", Object.keys(data));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API route - Error fetching product:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch product",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
