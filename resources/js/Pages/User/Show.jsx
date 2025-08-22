import { usePage } from "@inertiajs/react";
import { UserLock } from "lucide-react";
import { route } from "ziggy-js";

export default function Show({ user }) {
  const { translations } = usePage().props;

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {translations.user.user_name}
        </h1>

        <div className="bg-blue-100 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 select-auto">
          {user.name}
        </div>
        <div className="flex items-center bg-sky-200 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 select-auto">
          <UserLock className="size-8" />
          <span className="flex-1 text-center">
            {user.roles[0]?.name || translations.user.no_role_assigned}
          </span>
        </div>

        <div className="text-gray-600 mt-4">
          {translations.user.user_created_at}{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </div>

        <div className="mt-6">
          <a
            href={route("user.index")}
            className="inline-block text-sm text-gray-600 hover:text-sky-600 transition"
          >
            ← {translations.actions.back}
          </a>
        </div>
      </div>
    </div>
  );
}
