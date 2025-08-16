import { Head, useForm, usePage } from "@inertiajs/react";
import Button from "../../Components/UI/Button";
import { ShieldAlert, ShieldCheck, ShieldIcon } from "lucide-react";

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

  return (
    <>
      <Head title="Update" />
      <div className="bg-white shadow">
        <h1 className="p-3 text-xl font-gray-500 text-center">Roles</h1>

        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
        >
          <input
            className={`border rounded-lg p-2 ${
              errors.name ? "border-red-600" : "border-gray-300"
            } ${errors.name && "ring-red-600"}`}
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="Type your role here."
          />
          {permissions && permissions.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {permissions.map((perm) => (
                <label
                  key={perm.id}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
                >
                  <input
                    type="checkbox"
                    checked={data.permissions.includes(perm.id)}
                    onChange={() => togglePermission(perm.id)}
                  />
                  {perm.name}
                </label>
              ))}
            </ul>
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

  // return (
  // <div>
  //   <h1>Edit Role</h1>
  //   <form onSubmit={submit}>
  //     <div>
  //       <label>Name:</label>
  //       <input
  //         value={data.name}
  //         onChange={(e) => setData("name", e.target.value)}
  //       />
  //       {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
  //     </div>

  //     <div style={{ marginTop: "20px" }}>
  //       <h3>Assign Permissions</h3>
  //       {permissions.map((perm) => (
  //         <label key={perm.id} style={{ display: "block" }}>
  //           <input
  //             type="checkbox"
  //             checked={data.permissions.includes(perm.id)}
  //             onChange={() => togglePermission(perm.id)}
  //           />
  //           {perm.name}
  //         </label>
  //       ))}
  //     </div>

  //     <button type="submit" style={{ marginTop: "20px" }}>Update</button>
  //   </form>
  // </div>
  // );
}
