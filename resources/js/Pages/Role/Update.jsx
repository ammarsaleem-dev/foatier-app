import { Head, useForm, usePage } from "@inertiajs/react";
import Button from "../../Components/UI/Button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Update({ role, permissions }) {
  const { translations } = usePage().props;
  const { data, setData, put, errors } = useForm({
    name: role.name,
    permissions: role.permissions.map((p) => p.id),
  });

  const togglePermission = (id) => {
    if (data.permissions.includes(id)) {
      setData(
        "permissions",
        data.permissions.filter((pid) => pid !== id)
      );
    } else {
      setData("permissions", [...data.permissions, id]);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    put(route("role.update", role));
  };

  // 🔹 Group permissions by prefix (before ".")
  const groupedPermissions = permissions.reduce((acc, perm) => {
    const [group, action] = perm.name.split(".");
    if (!acc[group]) acc[group] = [];
    acc[group].push(perm);
    return acc;
  }, {});

  // 🔹 Track which groups are expanded
  const [openGroups, setOpenGroups] = useState(
    Object.keys(groupedPermissions).reduce((acc, g) => {
      acc[g] = false; // start collapsed
      return acc;
    }, {})
  );

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <>
      <Head title="Update" />
      <div className="bg-white shadow">
        <h1 className="p-3 text-xl font-gray-500 text-center">Roles</h1>

        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
        >
          {/* Role name input */}
          <input
            className={`border rounded-lg p-2 ${
              errors.name ? "border-red-600" : "border-gray-300"
            } ${errors.name && "ring-red-600"}`}
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="Type your role here."
          />

          {/* Grouped permissions with collapsible cards */}
          {Object.keys(groupedPermissions).length > 0 ? (
            <div className="mt-6 space-y-4">
              {Object.entries(groupedPermissions).map(([group, perms]) => (
                <div
                  key={group}
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Group Header */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
                  >
                    <span className="text-lg font-semibold capitalize">
                      {group}
                    </span>
                    {openGroups[group] ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  {/* Collapsible body */}
                  {openGroups[group] && (
                    <ul className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 p-4 bg-white">
                      {perms.map((perm) => (
                        <label
                          key={perm.id}
                          className={`flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 ${
                            data.permissions.includes(perm.id)
                              ? "border-green-300 transition-colors duration-200"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={data.permissions.includes(perm.id)}
                            onChange={() => togglePermission(perm.id)}
                          />
                          {perm.name.split(".")[1]} {/* action only */}
                        </label>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-500 italic">
              {translations.role.no_permissions}
            </p>
          )}

          <Button label={translations.actions.update} />
        </form>
      </div>
    </>
  );
}
