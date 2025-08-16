import { usePage } from "@inertiajs/react";
import { LockIcon, ShieldCheck } from "lucide-react"; // lucide-react icons
import { route } from "ziggy-js";

export default function Show({ role }) {
  const { translations } = usePage().props;
';'
 console.log(role);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        {/* Role Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {translations.role.role_name}
        </h1>

        {/* Role Name */}
        <div className="bg-blue-100 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 text-center">
          {role.name}
        </div>

        {/* Created At */}
        <div className="text-gray-600 mt-4 text-center">
          {translations.role.role_created_at}{" "}
          {new Date(role.created_at).toLocaleDateString()}
        </div>

        {/* Permissions Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-sky-600" />
            {translations.permission.permission_title}
          </h2>
            
          {role.permissions && role.permissions.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {role.permissions.map((permission) => (
                <li
                  key={permission.id}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
                >
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{permission.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500 italic">
              {translations.role.no_permissions}
            </p>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href={route("role.index")}
            className="inline-block text-sm text-gray-600 hover:text-sky-600 transition"
          >
            ← {translations.actions.back}
          </a>
        </div>
      </div>
    </div>
  );
}
