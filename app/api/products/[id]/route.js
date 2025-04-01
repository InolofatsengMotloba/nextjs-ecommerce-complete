import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Async function to handle the product details request
export async function GET(req, { params }) {
  const { id } = params;
  const formattedId = id.padStart(3, "0");

  try {
    // Reference the product document in Firestore using the padded ID
    const productRef = doc(db, "products", formattedId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const data = productSnap.data();
      console.log(`Successfully retrieved product ${formattedId}`);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log(`Product ${formattedId} not found`);
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(`Error fetching product ${formattedId}:`, error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch product",
        message: error.message,
        code: error.code
      }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}