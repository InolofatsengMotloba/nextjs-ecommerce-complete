import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Async function to handle the product details request
export async function GET(req, { params }) {
  // Extract and format the product ID
  const { id } = params;
  const formattedId = id.padStart(3, "0"); // Convert "1" to "001"

  try {
    // Reference the product document in Firestore using the padded ID
    const productRef = doc(db, "products", formattedId);
    const productSnap = await getDoc(productRef);

    // Check if the product document exists
    if (productSnap.exists()) {
      // Return the product data as JSON
      return new Response(JSON.stringify(productSnap.data()), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Return a 404 response if the product is not found
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
