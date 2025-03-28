import Link from "next/link";
import { fetchProducts } from "@/api/productsApi";
import { SingleImageGallery } from "@/components/ImageGallery";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/FilterProducts";
import PriceSort from "@/components/SortProducts";
import ResetButton from "@/components/ResetButton";

async function getProducts(page, search = "", category = "", sort = "") {
  try {
    const products = await fetchProducts(page, search, category, sort);
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
  const category = searchParams?.category || ""; // Get the category from URL
  const sortBy = searchParams?.sort || "";
  const { products, currentPage, totalPages } = await getProducts(
    page,
    searchQuery,
    category,
    sortBy
  );

  return (
    <div>
      <div className="bg-white max-w-[90rem] mx-auto p-8 pb-12 gap-8 sm:p-12 min-h-screen">
        <div className="bg-white flex flex-col md:flex-row justify-between mb-4 gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-2/3">
            <SearchBar initialSearch={searchQuery} />
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between w-full md:w-auto">
            <div className="w-full md:w-auto">
              <CategoryFilter initialCategory={category} />
            </div>
            <div className="w-full md:w-auto">
              <PriceSort initialSort={sortBy} />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <ResetButton />

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
          sortBy={sortBy}
          category={category}
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
function Pagination({
  currentPage,
  totalPages,
  searchQuery,
  sortBy,
  category,
}) {
  const createPageURL = (pageNumber) => {
    return `/products?page=${pageNumber}&search=${searchQuery}&sort=${sortBy}&category=${category}`;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex flex-wrap items-center gap-1 overflow-x-auto max-w-full px-4">
        {/* Previous Button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`px-3 py-2 rounded-full bg-[#2d7942] text-white text-sm font-medium transition-colors duration-200 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed bg-gray-200"
              : "hover:bg-[#11752d]"
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {/* Page Numbers */}
        {totalPages > 7 ? (
          <>
            {currentPage > 3 && (
              <>
                <Link
                  href={createPageURL(1)}
                  className="px-3 py-2 rounded-full border text-sm font-medium"
                >
                  1
                </Link>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
              .filter((page) => page > 0 && page <= totalPages)
              .map((page) => (
                <Link
                  key={page}
                  href={createPageURL(page)}
                  className={`px-3 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-[#2d7942] text-white border-transparent"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </Link>
              ))}

            {currentPage < totalPages - 3 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <Link
                  href={createPageURL(totalPages)}
                  className="px-3 py-2 rounded-full border text-sm font-medium"
                >
                  {totalPages}
                </Link>
              </>
            )}
          </>
        ) : (
          [...Array(totalPages).keys()].map((page) => (
            <Link
              key={page + 1}
              href={createPageURL(page + 1)}
              className={`px-3 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                currentPage === page + 1
                  ? "bg-[#2d7942] text-white border-transparent"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </Link>
          ))
        )}

        {/* Next Button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`px-3 py-2 rounded-full bg-[#2d7942] text-white text-sm font-medium transition-colors duration-200 ${
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
