import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Button from "../../Components/UI/Button";

export default function Update({ user, roles }) {
  const { translations } = usePage().props;

  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    username: user.username || "",
    password: "",
    password_confirmation: "",
    role_id: user.roles[0]?.id || "",
  });

  function submit(e) {
    e.preventDefault();
    put(route("user.update", user.id));
  }
  console.log(data);
  return (
    <>
      <Head title="Update" />
      <div className="bg-white shadow">
        <h1 className="p-3 text-xl font-gray-500 text-center">
          {translations.user.user_update}
        </h1>

        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
        >
          {/* Name */}
          <input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.name ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="Full name"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}

          {/* Username */}
          <input
            value={data.username}
            onChange={(e) => setData("username", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.username ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-600">{errors.username}</p>}

          {/* Password */}
          <input
            autoComplete="new-password" // Prevent browser from autofilling with old password
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.password ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="New Password (leave blank to keep current)"
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}

          {/* Confirm Password */}
          <input
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.password_confirmation
                ? "border-red-600"
                : "border-gray-300"
            }`}
            placeholder="Confirm Password"
          />
          {errors.password_confirmation && (
            <p className="text-red-600">{errors.password_confirmation}</p>
          )}

          {/* Role */}
          <select
            value={data.role_id}
            onChange={(e) => setData("role_id", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.role_id ? "border-red-600" : "border-gray-300"
            }`}
          >
            <option value="">Select Role</option>
            {roles &&
              roles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
          </select>
          {errors.role_id && <p className="text-red-600">{errors.role_id}</p>}

          {/* Submit Button */}
          <Button label={translations.actions.update} />
        </form>
      </div>
    </>
  );
}
