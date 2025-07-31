import { Link } from "@inertiajs/react";

/**
 * A pagination component that divides data into pages.
 *
 * @param {Array} - The list of data to paginate.
 * @returns JSX Pagination controls.
 */
export default function PaginationLink({ data, perPage }) {
  if (!data || !data.length) return null;
  return (
    <div className="flex gap-2 mt-4">
      {data &&
        data.map((link, idx) => (
          <Link
            as="button"
            disabled={!link.url}
            key={idx}
            href={`${link.url}&perPage=${perPage}` || "#"}
            className={`px-3 py-1 rounded transition duration-200 cursor-pointer ${
              link.active
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } ${!link.url ? "disabled opacity-50" : ""}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
    </div>
  );
}
