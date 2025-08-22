import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";
import useAuth from "../../Components/hooks/useAuth";

export default function Browse({ users }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [perPage, setPerPage] = useState(users.per_page || 10);
  const allItemIds = users.data.map((item) => item.id);
  const { translations } = usePage().props;
  const { hasRole, can } = useAuth();

  const handleDelete = (user) => {
    setIsOpen(true);
    setSelectedUser(user);
  };

  const handleShow = (user) => {
    if (!user) return;
    router.get(route("user.show", ("user", user)));
  };

  const handleEdit = (user) => {
    if (!user) return;
    router.get(route("user.edit", ("user", user)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === users.data.length) {
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
    if (!confirm("Are you sure you want to delete selected users?")) return;

    router.delete(route("user.bulkDelete", { ids: selectedItems.join(",") }), {
      onSuccess: () => {
        console.log("Bulk delete successful");
        setSelectedItems([]);
        setShowBulk(false);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
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
      route("user.index"),
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
    if (!selectedUser) return;

    router.delete(route("user.destroy", selectedUser), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedUser(null);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.get(route("user.create"));
  };
  // console.log('canCreate' , can('user.create'));
  return (
    <>
      <Head title="Users" />
      {can("user.index") && (
        <DataTable
          title={translations.user.user_title}
          data={users}
          columns={[
            { label: `${translations.user.user_id}`, value: "id" },
            { label: `${translations.user.user_name}`, value: "name" },            
            {
              label: `${translations.user.user_created_at}`,
              value: "created_at",
            },
            {
              label: `${translations.user.user_updated_at}`,
              value: "updated_at",
            },
          ]}
          canCreate={can("user.create")}
          canShow={can("user.show")}
          canUpdate={can("user.update")}
          canDelete={can("user.delete")}
          perPage={perPage}
          showBulkActionBar={showBulk}
          showCreate={true}
          handleCreate={handleCreate}
          hasSelectionCheckbox={true}
          hasSearchInput={true}
          className="my-custom-class"
          loading={false}
          emptyMessage="No users available"
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
        title={selectedUser?.name || ""}
        message="Are you sure you want to delete this user? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
