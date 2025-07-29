import { Link } from "@inertiajs/react";

export default function BulkActionBar({
  selectedItems = [],
  onDelete,
  onClear,
}) {
  if (selectedItems.length === 0) return null;

  return (
    <div className="relative bg-white  rounded-xl flex  items-center px-4 py-0.5">
      <div className="text-sm text-gray-700 px-4">
        {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}{" "}
        selected
      </div>

      <div className="flex gap-2 ">
        <Link
          className="text-red-600 text-sm hover:underline"
          variant="destructive"
          onClick={onDelete}
        >
          Delete Selected
        </Link>
        <Link
          className="text-gray-600 text-sm hover:underline"
          variant="outline"
          onClick={onClear}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
