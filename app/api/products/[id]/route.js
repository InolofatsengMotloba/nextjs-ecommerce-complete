// app/api/products/[id]/route.js
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  const { id } = params;
  console.log("Received ID:", id); // Debug log

  const formattedId = id.padStart(3, "0");
  console.log("Formatted ID:", formattedId); // Debug log

  try {
    const productRef = doc(db, "products", formattedId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.log("Product not found:", formattedId);
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = productSnap.data();
    console.log("Product data:", data); // Debug log

    // Ensure the data is serializable
    const serializableData = JSON.parse(JSON.stringify(data));

    return new Response(JSON.stringify(serializableData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Full error:", error); // More detailed error logging
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
