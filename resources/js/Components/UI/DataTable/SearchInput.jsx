import { SearchIcon } from "lucide-react";
import { useState } from "react";
//
/**
 * Search input component.
 *
 * @param {string} onSearch - The query string that changes.
 * @returns JSX Search input element.
 */
export default function SearchInput({ onSearch, value }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative flex items-center">
      <input
        onChange={handleChange}
        type="text"
        value={value}
        placeholder="search here..."
        className="w-full px-2 pl-8 pr-8 border border-gray-400 rounded-md"
      />
      <span className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2">
        <SearchIcon size={18} />
      </span>
      {query && (
        <button
          onClick={() => {
            setQuery("");
            onSearch("");
          }}
          className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-2 top-1/2 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
