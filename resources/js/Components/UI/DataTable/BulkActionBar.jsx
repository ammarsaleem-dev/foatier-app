import { X } from "lucide-react";

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

      <div className="flex gap-2 items-center">
        <button
          className="text-red-600 text-sm hover:underline cursor-pointer"
          onClick={onDelete}
        >
          Delete Selected
        </button>
        <button
          className="text-gray-500 text-md cursor-pointer"
          onClick={onClear}
        >
          <X size={15}/>
        </button>
      </div>
    </div>
  );
}
