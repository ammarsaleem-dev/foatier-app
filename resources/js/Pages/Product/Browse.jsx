import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";
import useAuth from "../../Components/hooks/useAuth";

export default function Browse({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [perPage, setPerPage] = useState(products.per_page || 10);
  const allItemIds = products.data.map((item) => item.id);
  const { translations } = usePage().props;
  const { hasRole, can } = useAuth();

  const handleDelete = (product) => {
    setIsOpen(true);
    setSelectedProduct(product);
  };

  const handleShow = (product) => {
    if (!product) return;
    router.get(route("product.show", ("product", product)));
  };

  const handleEdit = (product) => {
    if (!product) return;
    router.get(route("product.edit", ("product", product)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === products.data.length) {
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
    if (!confirm("Are you sure you want to delete selected products?"))
      return;

    router.delete(
      route("product.bulkDelete", { ids: selectedItems.join(",") }),
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
      route("product.index"),
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
    if (!selectedProduct) return;

    router.delete(route("product.destroy", selectedProduct), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedProduct(null);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.get(route("product.create"));
  };
  // console.log('canCreate' , can('product.create'));
  return (
    <>
      <Head title="Categories" />
      {can("product.index") && (
        <DataTable
          title={translations.product.product_title}
          data={products}
          columns={[
            { label: `${translations.product.product_id}`, value: "id" },
            { label: `${translations.product.product_name}`, value: "name" },
            {
              label: `${translations.product.product_created_at}`,
              value: "created_at",
            },
            {
              label: `${translations.product.product_updated_at}`,
              value: "updated_at",
            },
          ]}
          canCreate={can("product.create")}
          canShow={can("product.show")}
          canUpdate={can("product.update")}
          canDelete={can("product.delete")}
          perPage={perPage}
          showBulkActionBar={showBulk}
          showCreate={true}
          handleCreate={handleCreate}
          hasSelectionCheckbox={true}
          hasSearchInput={true}
          className="my-custom-class"
          loading={false}
          emptyMessage="No products available"
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
        title={selectedProduct?.name || ""}
        message="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
