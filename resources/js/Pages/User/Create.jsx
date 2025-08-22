import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Button from "../../Components/UI/Button";
import { Eye } from "lucide-react";

export default function Create({ roles }) {
  const { translations } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
    role_id: "",
  });

  function submit(e) {
    e.preventDefault();
    post(route("user.store"));
  }

  return (
    <>
      <Head title="Create" />
      <div className="bg-white shadow">
        <h1 className="p-3 text-xl font-gray-500 text-center">
          {translations.user.user_title}
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
            placeholder={translations.user.user_name}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}

          {/* Username */}
          <input
            value={data.username}
            onChange={(e) => setData("username", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.username ? "border-red-600" : "border-gray-300"
            }`}
            placeholder={translations.user.user_username}
          />
          {errors.username && <p className="text-red-600">{errors.username}</p>}

          {/* Password */}
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.password ? "border-red-600" : "border-gray-300"
            }`}
            placeholder={translations.user.user_password}
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
            placeholder={translations.user.user_con_password}
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
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && <p className="text-red-600">{errors.role_id}</p>}

          {/* Submit Button */}
          <Button label={translations.actions.create} />
        </form>
      </div>
    </>
  );
}
