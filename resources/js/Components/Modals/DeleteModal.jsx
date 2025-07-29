import { Link } from "@inertiajs/react";

/**
 * A delete modal used to show a confirmation dialog when the user tries to delete an item.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.onClose - Function to call when the cancel button is clicked.
 * @param {Function} props.onConfirm - Function to call when the delete button is clicked.
 * @param {string} [props.title="Delete Item"] - Title of the modal.
 * @param {string} [props.message="Are you sure you want to delete this item?"] - Message shown in the modal body.
 * @returns {JSX.Element|null}
 */
export default function DeleteModal({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
}) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-all ease-in-out duration-300">
        <div className="bg-white rounded-2xl shadow w-full max-w-md p-6 transition-all ease-in-out duration-300">
          <span className="inline-block text-xl font-semibold text-red-600 mb-2 bg-red-50 p-2 rounded-xl">
            {title}
          </span>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl hover:underline transition-all ease-in-out duration-300 cursor-pointer text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl transition-all ease-in-out duration-300 bg-red-500 text-white hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}
