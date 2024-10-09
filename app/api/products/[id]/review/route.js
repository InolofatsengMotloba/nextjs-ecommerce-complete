import { db } from "@/config/firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// POST: Add a new review for a product
export async function POST(req, { params }) {
  const { id } = params; // Product ID
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        resolve(
          new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
          })
        );
      } else {
        const { rating, comment } = await req.json();

        const newReview = {
          reviewerName: user.displayName || "Anonymous",
          reviewerEmail: user.email,
          rating,
          comment,
          date: new Date().toISOString(),
        };

        try {
          const productRef = doc(db, "products", id);
          await updateDoc(productRef, {
            reviews: arrayUnion(newReview),
          });

          resolve(
            new Response(
              JSON.stringify({ message: "Review added successfully" }),
              { status: 200 }
            )
          );
        } catch (error) {
          resolve(
            new Response(JSON.stringify({ error: "Failed to add review" }), {
              status: 500,
            })
          );
        }
      }
    });
  });
}

export async function PUT(req, { params }) {
  const { id } = params; // Product ID
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { reviewId, newRating, newComment } = await req.json();

  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const reviewToEdit = productData.reviews.find(
        (review) =>
          review.reviewerEmail === user.email && review.id === reviewId
      );

      if (reviewToEdit) {
        // Remove the old review and add the updated one
        await updateDoc(productRef, {
          reviews: arrayRemove(reviewToEdit),
        });

        const updatedReview = {
          ...reviewToEdit,
          rating: newRating,
          comment: newComment,
          date: new Date().toISOString(),
        };

        await updateDoc(productRef, {
          reviews: arrayUnion(updatedReview),
        });

        return new Response(
          JSON.stringify({ message: "Review updated successfully" }),
          { status: 200 }
        );
      } else {
        return new Response(JSON.stringify({ error: "Review not found" }), {
          status: 404,
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update review" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { reviewId } = await req.json();

  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const reviewToDelete = productData.reviews.find(
        (review) =>
          review.reviewerEmail === user.email && review.id === reviewId
      );

      if (reviewToDelete) {
        await updateDoc(productRef, {
          reviews: arrayRemove(reviewToDelete),
        });

        return new Response(
          JSON.stringify({ message: "Review deleted successfully" }),
          { status: 200 }
        );
      } else {
        return new Response(JSON.stringify({ error: "Review not found" }), {
          status: 404,
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete review" }), {
      status: 500,
    });
  }
}
