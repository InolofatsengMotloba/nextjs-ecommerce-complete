// app/api/test-firebase/route.js
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function GET() {
  try {
    // Test a simple document read
    const testDoc = await getDoc(doc(db, "products", "001"));
    const exists = testDoc.exists();

    // Get list of all product IDs
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    const productIds = productSnapshot.docs.map((doc) => doc.id);

    return new Response(
      JSON.stringify({
        dbConnectionWorks: true,
        productWithId001Exists: exists,
        availableProductIds: productIds,
        totalProducts: productIds.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        dbConnectionWorks: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
