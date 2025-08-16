import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";
import DataTable from "../../Components/UI/DataTable/DataTable";
import DeleteModal from "../../Components/Modals/DeleteModal";

export default function Browse({ roles }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [perPage, setPerPage] = useState(roles.per_page || 10);
  const allItemIds = roles.data.map((item) => item.id);
  const {translations} = usePage().props;

  const handleDelete = (role) => {
    setIsOpen(true);
    setSelectedRole(role);
  };

  const handleShow = (role) => {
    if (!role) return;
    router.get(route("role.show", ("role", role)));
  };

  const handleEdit = (role) => {
    if (!role) return;
    router.get(route("role.edit", ("role", role)));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === roles.data.length) {
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
    if (!confirm("Are you sure you want to delete selected roles?"))
      return;

    router.delete(
      route("role.bulkDelete", { ids: selectedItems.join(",") }),
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
      route("role.index"),
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
    if (!selectedRole) return;

    router.delete(route("role.destroy", selectedRole), {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedRole(null);
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    router.get(route("role.create"));
  };

  return (
    <>
      <Head title="Roles" />
      <DataTable
        title={translations.role.role_title}
        data={roles}
        columns={[
          { label: `${translations.role.role_id}`, value: "id" },
          { label: `${translations.role.role_name}`, value: "name" },
          { label: `${translations.role.role_created_at}`, value: "created_at" },
          { label: `${translations.role.role_updated_at}`, value: "updated_at" },
        ]}
        perPage={perPage}
        showBulkActionBar={showBulk}
        showCreate={true}
        handleCreate={handleCreate}
        hasSelectionCheckbox={true}
        hasSearchInput={true}
        className="my-custom-class"
        loading={false}
        emptyMessage="No Roles available"
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
      <DeleteModal
        title={selectedRole?.name || ""}
        message="Are you sure you want to delete this role? This action cannot be undone."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}


// import { Link, router, usePage } from "@inertiajs/react";
// import { route } from 'ziggy-js';

// export default function Browse() {
//   const { roles, flash } = usePage().props;

//   const deleteRole = (id) => {
//     if (confirm("Delete this role?")) {
//       router.delete(route("role.destroy", id));
//     }
//   };

//   return (
//     <div>
//       <h1>Roles</h1>
//       {flash.success && <div style={{ color: "green" }}>{flash.success}</div>}
//       <Link href={route("role.create")}>Create Role</Link>
//       <table border="1" cellPadding="5" style={{ marginTop: 10 }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Permissions</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role.id}>
//               <td>{role.id}</td>
//               <td>{role.name}</td>
//               <td>{role.permissions.map((p) => p.name).join(", ")}</td>
//               <td>
//                 <Link href={route("role.edit", role.id)}>Edit</Link> |{" "}
//                 <button onClick={() => deleteRole(role.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
