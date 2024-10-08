import Link from "next/link";
import { fetchProducts } from "@/api/productsApi";
import { SingleImageGallery } from "@/components/ImageGallery";
import SearchBar from "@/components/SearchBar";
import { CategoryFilter } from "@/components/FilterProducts";
import PriceSort from "@/components/SortProducts";
import ResetButton from "@/components/ResetButton";

async function getProducts(page, search = "") {
  try {
    const products = await fetchProducts(page, search);
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products.");
  }
}

/**
 * Products component that fetches and displays a list of products based on search parameters.
 *
 * This component handles pagination, searching, filtering by category, and sorting.
 *
 * @async
 * @function Products
 * @param {Object} props - The component props.
 * @param {Object} props.searchParams - The search parameters for fetching products.
 * @param {string} [props.searchParams.page="1"] - The page number for pagination (defaults to "1").
 * @param {string} [props.searchParams.search=""] - The search query for filtering products (defaults to an empty string).
 * @param {string} [props.searchParams.category=""] - The category for filtering products (defaults to an empty string).
 * @param {string} [props.searchParams.sortBy=""] - The field to sort by (defaults to an empty string).
 * @param {string} [props.searchParams.order=""] - The order to sort the results (e.g., "asc" or "desc").
 * @returns {JSX.Element} The rendered component containing product cards, search bar, filters, and pagination.
 * @throws {Error} Throws an error if fetching products fails.
 *
 */
export default async function Products({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.search || ""; // Get the search query from URL
  const { products, currentPage, totalPages } = await getProducts(page, searchQuery);

  // const search = searchParams.search || "";
  // const category = searchParams.category || "";
  // const sortBy = searchParams.sortBy || "";
  // const order = searchParams.order || "";
  // const lastVisible = searchParams.lastVisible || null;

  return (
    <div>
      <div className="max-w-[90rem] mx-auto p-8 pb-12 gap-8 sm:p-12 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-2/3">
            <SearchBar initialSearch={searchQuery} />
          </div>

          {/* Filter and Sort */}
          {/* <div className="flex flex-col md:flex-row gap-4 justify-between w-full md:w-auto">
            <div className="w-full md:w-auto">
              <CategoryFilter initialCategory={category} />
            </div>
            <div className="w-full md:w-auto">
              <PriceSort />
            </div>
          </div> */}
        </div>

        {/* Reset Button */}
        {/* <ResetButton /> */}

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col max-h-[100rem] border border-gray-200 shadow-md bg-white rounded-3xl overflow-hidden hover:shadow-lg hover:scale-105 transition duration-500 relative"
            >
              {/* Product Image */}
              <SingleImageGallery alt={product.name} images={product.images} />

              {/* Product Details */}
              <div className="flex-1 flex flex-col p-6">
                <div className="flex-1">
                  <header className="mb-2 flex-2">
                    <h2 className="text-lg line-clamp-2 font-extrabold leading-snug text-gray-700">
                      {product.title}
                    </h2>
                  </header>
                </div>

                <div className="flex-1">
                  <header className="mb-2 flex-2">
                    <p className="text-sm line-clamp-2 leading-snug text-gray-400">
                      {product.description}
                    </p>
                  </header>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="inline-flex items-center rounded-sm px-2 py-1 text-xs border-2 font-bold border-black bg-white text-black ring-1 ring-inset ring-blue-700/10">
                    {product.category}
                  </span>

                  <p className="text-base font-bold text-[#2d7942] leading-snug">
                    ${product.price}
                  </p>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="flex text-black justify-center mt-3 bg-white px-3 py-2 text-sm font-semibold hover:text-[#2d7942]"
                >
                  <span>View Details →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

/**
 * Pagination component that provides navigation between pages of product listings.
 *
 * This component displays the current page number and provides buttons to navigate to the previous and next pages.
 *
 * @function Pagination
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {string} props.searchQuery - The current search query for filtering products.
 * @param {string} props.category - The current category for filtering products.
 * @param {string} props.sortBy - The field to sort by.
 * @param {string} props.order - The order to sort the results (e.g., "asc" or "desc").
 * @param {Array} props.products - The array of products currently displayed.
 * @returns {JSX.Element} The rendered pagination component with navigation buttons.
 *
 */
// function Pagination({
//   currentPage,
//   searchQuery,
//   category,
//   sortBy,
//   order,
//   products,
//   lastVisible,
// }) {
//   const pageNumber = parseInt(currentPage, 10);
//   const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
//   const nextPage = pageNumber + 1;
//   const searchParam = searchQuery
//     ? `&search=${encodeURIComponent(searchQuery)}`
//     : "";
//   const categoryParam = category
//     ? `&category=${encodeURIComponent(category)}`
//     : "";
//   const sortParam = sortBy && order ? `&sortBy=${sortBy}&order=${order}` : "";
//   // const lastVisibleParam = lastVisible ? `&lastVisible=${lastVisible}` : "";

//   return (
//     <div className="flex justify-center items-center mt-8 space-x-2">
//       {prevPage && (
//         <Link
//           href={`/products?page=${prevPage}${searchParam}${categoryParam}${sortParam}`}
//         >
//           <button className="px-4 py-2 bg-[#2d7942] text-white rounded-lg hover:bg-[#1d5931] transition-colors duration-300">
//             Previous
//           </button>
//         </Link>
//       )}
//       <span className="text-lg">Page {currentPage}</span>
//       {products.length === 20 && (
//         <Link
//           href={`/products?page=${nextPage}${searchParam}${categoryParam}${sortParam}`}
//         >
//           <button className="px-4 py-2 bg-[#2d7942] text-white rounded-lg hover:bg-[#1d5931] transition-colors duration-300">
//             Next
//           </button>
//         </Link>
//       )}
//     </div>
//   );
// }
function Pagination({ currentPage, totalPages, searchQuery }) {
  const createPageURL = (pageNumber) => {
    return `/products?page=${pageNumber}&search=${searchQuery}`;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex space-x-1">
        {/* Previous Button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`px-4 py-2 rounded-full bg-[#2d7942] text-white text-sm font-medium transition-colors duration-200 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed bg-gray-200"
              : "hover:bg-[#11752d]"
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((page) => (
          <Link
            key={page + 1}
            href={createPageURL(page + 1)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
              currentPage === page + 1
                ? "bg-[#2d7942] text-white border-transparent"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page + 1}
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`px-4 py-2 rounded-full bg-[#2d7942] text-white text-sm font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed bg-gray-200"
              : "hover:bg-[#11752d]"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </nav>
    </div>
  );

}
