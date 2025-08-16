import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";
import useAuth from "../../Components/hooks/useAuth";

export default function Browse({ permissions }) {  
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [perPage, setPerPage] = useState(permissions.per_page || 10);
  const allItemIds = permissions.data.map((item) => item.id);
  const { translations } = usePage().props;
  const { hasRole, can } = useAuth();

  const handleDelete = (permission) => {
    setIsOpen(true);
    setSelectedPermission(permission);
  };

  const handleShow = (permission) => {
    if (!permission) return;
    router.get(route("permission.show", ("permission", permission)));
  };

  const handleEdit = (permission) => {
    if (!permission) return;
    router.get(route("permission.edit", ("permission", permission)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === permissions.data.length) {
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
    if (!confirm("Are you sure you want to delete selected permissions?"))
      return;

    router.delete(
      route("permission.bulkDelete", { ids: selectedItems.join(",") }),
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
      route("permission.index"),
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
    if (!selectedPermission) return;

    router.delete(route("permission.destroy", selectedPermission), {
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
    router.get(route("permission.create"));
  };
  return (
    <>    
      <Head title="permissions" />
      {can("permission.index") && (
        <DataTable
          title={translations.permission.permission_title}
          data={permissions}
          columns={[
            { label: `${translations.permission.permission_id}`, value: "id" },
            {
              label: `${translations.permission.permission_name}`,
              value: "name",
            },
            {
              label: `${translations.permission.permission_created_at}`,
              value: "created_at",
            },
            {
              label: `${translations.permission.permission_updated_at}`,
              value: "updated_at",
            },
          ]}
          canCreate={can("permission.create")}
          canShow={can("permission.show")}
          canUpdate={can("permission.update")}
          canDelete={can("permission.delete")}
          perPage={perPage}
          showBulkActionBar={showBulk}
          showCreate={true}
          handleCreate={handleCreate}
          hasSelectionCheckbox={true}
          hasSearchInput={true}
          className="my-custom-class"
          loading={false}
          emptyMessage="No permissions available"
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
        title={selectedPermission?.name || ""}
        message="Are you sure you want to delete this permission? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
