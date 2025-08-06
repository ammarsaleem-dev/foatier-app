import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";

export default function Browse({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [perPage, setPerPage] = useState(categories.per_page || 10);
  const allItemIds = categories.data.map((item) => item.id);

  const handleDelete = (category) => {
    setIsOpen(true);
    setSelectedCategory(category);
  };

  const handleShow = (category) => {
    if (!category) return;
    router.get(route("category.show", ("category", category)));
  };

  const handleEdit = (category) => {
    if (!category) return;
    router.get(route("category.edit", ("category", category)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === categories.data.length) {
      setSelectedItems([]);
      setShowBulk(false);
    } else {
      setSelectedItems(allItemIds);
      setShowBulk(true);
    }
  };

  const handleSelect = (id, isSelected) => {
    const updated = isSelected
      ? [...selectedItems, id]
      : selectedItems.filter((itemId) => itemId !== id);
    setSelectedItems(updated);
    setShowBulk(updated.length > 0);
  };

  const handleBulkDelete = (e) => {
    e.preventDefault();
    if (!selectedItems.length) return;
    if (!confirm("Are you sure you want to delete selected categories?"))
      return;

    router.delete(
      route("category.bulkDelete", { ids: selectedItems.join(",") }),
      {
        onSuccess: () => {
          console.log("Bulk delete successful");
          setSelectedItems([]);
          setShowBulk(false);
        },
        onError: (errors) => {
          console.error(errors);
        },
      }
    );
    setSelectedItems([]);
    setShowBulk(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
    setShowBulk(false);
  };

  const handleRowsChange = (e) => {
    // e.preventDefault();
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    router.get(
      route("category.index"),
      { perPage: newPerPage },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    if (!selectedCategory) return;

    router.delete(route("category.destroy", selectedCategory), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedCategory(null);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.get(route("category.create"));
  };

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
        showBulkActionBar={showBulk}
        showCreate={true}
        handleCreate={handleCreate}
        hasSelectionCheckbox = {true}
        hasSearchInput = {true}
        className="my-custom-class"
        loading={false}
        emptyMessage="No categories available"
        hasActions = {true}
        handleDelete={handleDelete}
        handleShow={handleShow}
        handleEdit={handleEdit}
        selectedRows={selectedItems}
        handleSelectAll={handleSelectAll}
        handleSelect={handleSelect}
        handleBulkDelete={handleBulkDelete}
        onClear={handleClear}
        handleNumberOfRowsChange={handleRowsChange}
        
      />
      <DeleteModal
        title={selectedCategory?.name || ""}
        message="Are you sure you want to delete this category? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
