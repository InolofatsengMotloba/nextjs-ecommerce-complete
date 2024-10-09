"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";

/**
 * PriceSort component for sorting products by price.
 *
 * This component provides a dropdown to sort products by price either in ascending or
 * descending order. The selected sort order is synced with the URL query parameters, and
 * updates the product list accordingly.
 *
 * @component
 * @returns {JSX.Element} The rendered PriceSort component.
 */
export default function PriceSort({ initialSort }) {
  const [sort, setSort] = useState(initialSort || "default");
  const router = useRouter();

  /**
   * Handle sort change when the user selects a different sorting option.
   * This updates the URL query parameters with the selected sorting option.
   *
   * @param {Event} e - The change event triggered by selecting a sort option.
   */
  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSort(newSort); // Update the local state

    // Update the URL with the new sort query, similar to search behavior
    if (newSort === "default") {
      router.push("/products");
    } else {
      router.push(`/products?page=1&sort=${encodeURIComponent(newSort)}`);
    }
  };

  return (
    <div className="mb-4">
      <div className="relative flex items-center space-x-2">
        <FaSortAmountDown className="text-[#2d7942]" />
        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
          className="w-52 px-4 py-2 bg-white text-black rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942] transition-all duration-300 overflow-hidden"
        >
          <option value="">Sort: Default</option>
          <option
            value="price_asc"
            className="px-4 py-2 hover:bg-[#2d7942] hover:text-white transition-colors duration-300 rounded-md"
          >
            Price: Low to High
          </option>
          <option
            value="price_desc"
            className="px-4 py-2 hover:bg-[#2d7942] hover:text-white transition-colors duration-300 rounded-md"
          >
            Price: High to Low
          </option>
        </select>
      </div>
    </div>
  );
}
