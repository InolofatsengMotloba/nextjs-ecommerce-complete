"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

/**
 * SearchBar component that allows users to search for products.
 *
 * This component provides a search input that syncs with the URL query parameters and
 * allows users to search for products by entering a search query. When the form is
 * submitted, the search query is added to the URL, and the results are reset to the first page.
 *
 * @component
 * @returns {JSX.Element} The rendered search bar component.
 */
export default function SearchBar({ initialSearch }) {
  const [search, setSearch] = useState(initialSearch || "");
  const router = useRouter();

  /**
   * Handle the form submission for searching.
   * When the user submits the search form, the search query is added to the URL query parameters,
   * and the page is reset to the first page.
   *
   * @param {Event} event - The submit event triggered by form submission.
   */
  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <div className="relative flex w-full max-w-md">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Products"
            className="flex-grow px-4 py-2 pl-6 text-gray-500 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942] transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-0 p-3 bg-[#2d7942] rounded-full text-white  shadow-lg hover:bg-[#1d5931] transition-colors duration-300"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
