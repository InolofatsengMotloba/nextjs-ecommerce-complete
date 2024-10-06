/**
 * Fetches a paginated list of products from the e-commerce API.
 *
 * This function supports searching, filtering by category, and sorting the results.
 *
 * @async
 * @function fetchProducts
 * @param {number} [page=1] - The page number to fetch (default is 1).
 * @param {string} [search=""] - The search query to filter products by name (default is an empty string).
 * @param {string} [category=""] - The category to filter products (default is an empty string).
 * @param {string} [sortBy="id"] - The field to sort by (default is "id").
 * @param {string} [order=""] - The order to sort the results (e.g., "asc" or "desc").
 * @returns {Promise<Object>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the response is not OK.
 *
 */
export async function fetchProducts(
  page = 1,
  search = "",
  category = "",
  sortBy = "id",
  order = ""
) {
  const skip = (page - 1) * 20;
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const categoryParam = category
    ? `&category=${encodeURIComponent(category)}`
    : "";
  const sortParam = sortBy ? `&sortBy=${sortBy}&order=${order}` : "";

  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?limit=20&skip=${skip}${searchParam}${categoryParam}${sortParam}`,
    {
      cache: "force-cache",
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
}

/**
 * Fetches product details data from the e-commerce API.
 *
 * @async
 * @function fetchProduct
 * @param {string | number} id - The unique identifier of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} Throws an error if the response is not OK.
 *
 */
export async function fetchSingleProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`,
    {
      cache: "force-cache",
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
}
