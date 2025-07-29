/**
 * A component managing the number of rows.
 *
 * @param {Function} onChange - Function callback for tracking onChange of select.
 * @param {value} perPage - The value of the input.
 * @param {isDisabled} - Show/hide the component.
 * @returns JSX Component.
 */
export default function RowsNumber({ onChange, value, isDisabled = false }) {
  return (
    <div
      className={`${
        !isDisabled ? "flex" : "hidden"
      } flex-row items-center space-x-1 text-gray-600 `}
    >
      <span>Show</span>
      <select
        className="px-2 border rounded-md focus:outline-none focus:ring-2 "
        onChange={onChange}
        value={value}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>rows.</span>
    </div>
  );
}
