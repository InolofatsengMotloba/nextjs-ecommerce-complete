import { NextResponse } from "next/server";
import { db } from "@/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const productsRef = collection(db, "products");

    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
