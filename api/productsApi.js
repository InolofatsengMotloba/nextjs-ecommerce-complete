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
export async function fetchProducts(page = 1, search = "") {
  
  const queryParams = new URLSearchParams({ page: page.toString() });
  if (search) {
    queryParams.append("search", search);
  }

  const res = await fetch(
    `http://localhost:3000/api/products?${queryParams.toString()}`,
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
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "force-cache",
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
}

/**
 * Fetches the list of product categories from the API.
 *
 * The function sends a GET request to the specified API endpoint to retrieve
 * categories. The request is cached with `force-cache`, and the response is
 * revalidated every 1800 seconds (30 minutes).
 *
 * @throws {Error} If the response from the API is not successful (i.e., `res.ok` is `false`).
 *
 * @returns {Promise<Array<string>>} A promise that resolves to an array of categories as strings.
 */
export async function fetchCategories() {
  const res = await fetch("https://next-ecommerce-api.vercel.app/categories", {
    cache: "force-cache",
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
}
