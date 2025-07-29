import { useEffect, useMemo, useState } from "react";
import Pagination from "../DataTable/Pagination";
import BulkActionBar from "./BulkActionBar";
import RowsNumber from "./RowsNumber";
import SearchInput from "./SearchInput";
import {
  CrosshairIcon,
  CrossIcon,
  Delete,
  DeleteIcon,
  Edit,
  Edit2Icon,
  EyeClosedIcon,
  EyeIcon,
  LucideCircleX,
  LucideDelete,
  RemoveFormattingIcon,
} from "lucide-react";

export default function DataTable({
  title = "Data Table",
  data = [],
  columns = [],
  className = "",
  loading = false,
  emptyMessage = "No data available",
  hasPagination = true,
  hasActions = false,
  hasSelectionCheckbox = false,
  handleDelete = null,
  handleEdit = () => {},
  handleShow = () => {},
  handleSelectAll = () => {},
  handleSelect = () => {},
  selectedRows = [],
  handleBulkDelete = () => {},
  onClear = () => {},
  hasSearchInput = false,
  handleNumberOfRowsChange = () => {},
  perPage,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredData = useMemo(() => {
    const items = data.data || [];
    if (!debouncedSearchQuery.trim()) return items;
    return items.filter((item) =>
      item.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [data, debouncedSearchQuery]);

  return (
    <div className={`data-table ${className} overflow-x-auto`}>
      <h2 className="text-2xl">{title}</h2>
      <div className="flex flex-row justify-between items-center p-2">
        <RowsNumber
          isDisabled={false}
          value={perPage}
          onChange={handleNumberOfRowsChange}
        />
        <BulkActionBar
          selectedItems={selectedRows}
          onDelete={handleBulkDelete}
        />
        {hasSearchInput && (
          <SearchInput
            onSearch={(query) => setSearchQuery(query)}
            value={searchQuery}
          />
        )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredData.length === 0 ? (
        <div className="empty-message">{emptyMessage}</div>
      ) : (
        <table className="table">
          <thead className="text-gray-700 bg-gray-150">
            <tr>
              {hasSelectionCheckbox && (
                <th className="th">
                  <input
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      filteredData.every((row) => selectedRows.includes(row.id))
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, index) => (
                <th className="th" key={index}>
                  {col.label}
                </th>
              ))}
              {hasActions && <th className="th">Action</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredData &&
              filteredData.map((row, index) => (
                <tr className="hover:bg-gray-100" key={index}>
                  {hasSelectionCheckbox && (
                    <td className="td">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => handleSelect(row.id, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td className="td" key={col.value}>
                      {col.value == "created_at" || col.value == "updated_at"
                        ? new Date(row[col.value]).toLocaleString()
                        : row[col.value]}
                      {/* {row[col.value]} */}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="td flex flex-row space-x-3">
                      {/* Show */}
                      <EyeIcon
                        className=" text-green-600 size-4 cursor-pointer "
                        onClick={(e) => {
                          e.preventDefault();
                          handleShow(row);
                        }}
                      />
                      {/* Edit */}
                      <Edit2Icon
                        className="text-blue-600 size-4 cursor-pointer "
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(row);
                        }}
                      />
                      {/* Delete */}
                      <LucideCircleX
                        className="text-red-600 size-4 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(row);
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {hasPagination && (
        <div className="pagination">
          <Pagination data={data.links} perPage={perPage} query={searchQuery} />
        </div>
      )}
    </div>
  );
}
