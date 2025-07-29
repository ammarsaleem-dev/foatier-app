import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import {route} from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";

export default function Browse({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const allItemIds = categories.data.map((item) => item.id);
  const [category, setcategory] = useState(null);
  const [perPage, setPerPage] = useState(categories.per_page || 10);

  return (
    <>
      <Head title="Categories" />
      <DataTable
        title="Categories"
        data={categories}
        columns={[
          { label: "ID", value: "id" },
          { label: "Name", value: "name" },
          { label: "Created At", value: "created_at" },
          { label: "Updated At", value: "updated_at" },
        ]}
        perPage={perPage}
        hasPagination={true}
        hasSelectionCheckbox={true}
        hasSearchInput={true}
        className="my-custom-class"
        loading={false}
        emptyMessage="No categories available"
        hasActions={true}
        handleDelete={(category) => {
          setIsOpen(true);
          setcategory(category);
        }}
        // Handle Show
        handleShow={(category) => {
          if (!category) return;
          router.get(route("category.show", { category: category }), {
            onSuccess: () => {
              setcategory(null);
            },
            onError: (errors) => {
              console.error(errors);
            },
          });
        }}
        // Handle Edit
        handleEdit={(category) => {
          if (!category) return;
          router.get(route("category.edit", { category: category }), {
            onSuccess: () => {
              setcategory(null);             
            },
            onError: (errors) => {
              console.error(errors);
            },
          });
        }}
        // Select Rows
        selectedRows={selectedItems}
        // Handle when select all items.
        handleSelectAll={() => {
          if (selectedItems.length === categories.data.length) {
            setSelectedItems([]);
            setShowBulk(false);
          } else {
            setSelectedItems(allItemIds);
            setShowBulk(true);
          }
        }}
        // Handle when select one item
        handleSelect={(id, isSelected) => {
          const updated = isSelected
            ? [...selectedItems, id]
            : selectedItems.filter((itemId) => itemId !== id);
          setSelectedItems(updated);
          setShowBulk(updated.length > 0);
        }}
        // Handle when make bulk delete.
        handleBulkDelete={() => {
          console.log("Bulk delete action for selected items:", selectedItems);
          setSelectedItems([]);
          setShowBulk(false);
        }}
        // Handle when make bulk cancel
        onClear={() => {
          setSelectedItems([]);
          setShowBulk(false);
        }}
        // Handle changing number of rows
        handleNumberOfRowsChange={(e) => {
          e.preventDefault();
          const newPerPage = parseInt(e.target.value);
          setPerPage(newPerPage);
          router.get(
            route("category.index"),
            { perPage: newPerPage },
            {
              preserveState: true,
              replace: true,
            }
          );
        }}
      />
      <DeleteModal
        title={`${category ? category.name : ""}`}
        message="Are you sure you want to delete this category? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={(e) => {
          e.preventDefault();
          if (!category) return;
          router.delete(route("category.destroy", { category: category }), {
            onSuccess: () => {
              setIsOpen(false);
              setcategory(null);
              setPerPage(10);
            },
            onError: (errors) => {
              console.error(errors);
            },
          });
        }}
      />
    </>
  );
}
