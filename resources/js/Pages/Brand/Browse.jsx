import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";
import useAuth from "../../Components/hooks/useAuth";

export default function Browse({ brands }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [perPage, setPerPage] = useState(brands.per_page || 10);
  const allItemIds = brands.data.map((item) => item.id);
  const { translations } = usePage().props;
  const { hasRole, can } = useAuth();

  const handleDelete = (brand) => {
    setIsOpen(true);
    setSelectedBrand(brand);
  };

  const handleShow = (brand) => {
    if (!brand) return;
    router.get(route("brand.show", ("brand", brand)));
  };

  const handleEdit = (brand) => {
    if (!brand) return;
    router.get(route("brand.edit", ("brand", brand)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === brands.data.length) {
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
    if (!confirm("Are you sure you want to delete selected brands?"))
      return;

    router.delete(
      route("brand.bulkDelete", { ids: selectedItems.join(",") }),
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
      route("brand.index"),
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
    if (!selectedBrand) return;

    router.delete(route("brand.destroy", selectedBrand), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedBrand(null);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.get(route("brand.create"));
  };
  // console.log('canCreate' , can('brand.create'));
  return (
    <>
      <Head title="Brands" />
      {can("brand.index") && (
        <DataTable
          title={translations.brand.brand_title}
          data={brands}
          columns={[
            { label: `${translations.brand.brand_id}`, value: "id" },
            { label: `${translations.brand.brand_name}`, value: "name" },
            {
              label: `${translations.brand.brand_created_at}`,
              value: "created_at",
            },
            {
              label: `${translations.brand.brand_updated_at}`,
              value: "updated_at",
            },
          ]}
          canCreate={can("brand.create")}
          canShow={can("brand.show")}
          canUpdate={can("brand.update")}
          canDelete={can("brand.delete")}
          perPage={perPage}
          showBulkActionBar={showBulk}
          showCreate={true}
          handleCreate={handleCreate}
          hasSelectionCheckbox={true}
          hasSearchInput={true}
          className="my-custom-class"
          loading={false}
          emptyMessage="No brands available"
          hasActions={true}
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
      )}
      <DeleteModal
        title={selectedBrand?.name || ""}
        message="Are you sure you want to delete this brand? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
