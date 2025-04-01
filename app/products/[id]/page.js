import dynamic from "next/dynamic";
import { ImageGallery } from "@/components/ImageGallery";
import { fetchSingleProduct } from "@/api/productsApi";
import { notFound } from "next/navigation";

/**
 * Dynamically imports the BackButton component.
 *
 * This component is loaded only on the client side (SSR is disabled)
 * to improve performance and reduce server-side rendering overhead.
 *
 * @constant {React.Component} BackButton
 *
 */
const BackButton = dynamic(() => import("@/components/BackButton"), {
  ssr: false,
});

/**
 * Generates metadata for a product details page based on the product ID.
 * This function fetches the product data and dynamically sets the page title
 * and description using the product's information.
 *
 * @async
 * @function generateMetadata
 * @param {Object} params - The parameters object containing the product ID.
 * @param {string | number} params.id - The unique identifier of the product.
 * @returns {Promise<Object>} The metadata object containing the page title and description.
 * @throws {Error} Throws an error if the product data fetch fails.
 *
 */
export async function generateMetadata({ params }) {
  const { id } = params;

  // Pad the ID to ensure it is in the correct format
  const paddedId = id.toString().padStart(3, "0");

  try {
    const product = await fetchSingleProduct(paddedId);

    if (!product) {
      return {
        title: "Product Not Found - Her Store",
        description: "The product you're looking for doesn't exist.",
      };
    }

    return {
      title: `${product.title} - Her Store`,
      description: product.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Page - Her Store",
      description: "View product details",
    };
  }
}

/**
 * Renders the product details page.
 *
 * This component fetches the product data based on the provided ID from the params
 * and displays the product information, including its image gallery, details,
 * availability, price, rating, tags, and reviews.
 *
 * @async
 * @function ProductDetails
 * @param {Object} params - The parameters object containing the product ID.
 * @param {string | number} params.id - The unique identifier of the product.
 * @returns {JSX.Element} The rendered product details component.
 * @throws {Error} Throws an error if the product data fetch fails.
 *
 */
export default async function ProductDetails({ params }) {
  const { id } = params;
  // Pad the ID to ensure it is in the correct format
  const paddedId = id.toString().padStart(3, "0");

  try {
    const product = await fetchSingleProduct(paddedId);

    // Handle not found case
    if (!product) {
      return notFound();
    }

    // Validate required product fields
    if (!product.images || !product.title || !product.description) {
      console.error("Invalid product data structure:", product);
      throw new Error("Invalid product data structure");
    }

    return (
      <div className="max-w-5xl mx-auto p-8 bg-white">
        <BackButton />

        <div className="flex flex-col md:flex-row pt-5 mb-6 bg-white">
          {/* Product Image */}
          <ImageGallery
            className="mt-6 md:mt-0 md:ml-8 flex-1"
            images={product.images}
          />

          {/* Product Details */}
          <div className="p-4 mt-6 md:mt-0 md:ml-8 flex-1 bg-white">
            <h1 className="text-3xl font-bold mb-1">{product.title}</h1>
            <p className="text-sm text-gray-700 mb-4 border-b-black">
              {product.brand || "No brand specified"}
            </p>

            <p className="text-base text-gray-700 mb-2">
              {product.description}
            </p>
            <p className="text-lg text-gray-700 mb-2 border-b-black font-semibold">
              {product.category || "Uncategorized"}
            </p>

            <div className="flex flex-wrap justify-between items-center mb-3">
              <button
                className={`text-sm font-medium ${
                  product.stock > 0
                    ? "text-white bg-[#2d7942] px-2 py-1 rounded-md"
                    : "text-white bg-red-600 px-2 py-1 rounded-md"
                }`}
              >
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </button>
              <p className="text-xl font-bold">$ {product.price || "N/A"}</p>
            </div>

            <p className="text-base text-black font-semibold mb-2">
              Rating: {product.rating || "Not rated"}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap items-center mb-4">
                <h3 className="mr-2 font-semibold">Tags:</h3>
                {product.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="border-2 font-bold border-black bg-white text-black m-1 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Review Section */}
        {/* <AddReviewForm productId={id} /> */}

        {/* Product Reviews Section */}
        {/* <ReviewsSort reviews={product.reviews} /> */}
      </div>
    );
  } catch (error) {
    console.error("Error in ProductDetails:", error);

    // For specific errors, you might want to redirect to notFound
    if (error.message.includes("404") || error.message.includes("not found")) {
      return notFound();
    }

    return (
      <div className="max-w-5xl mx-auto p-8 bg-white">
        <BackButton />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
          <p>We couldn't load this product. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
  }
}
