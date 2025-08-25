import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Show({ category }) {
  const { translations } = usePage().props;

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {translations.category.category_name}
        </h1>

        <div className="bg-blue-100 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 select-auto">
          {category.name}
        </div>

        <div className="text-gray-600 mt-4">
          {translations.category.category_created_at}{" "}
          {new Date(category.created_at).toLocaleDateString()}
        </div>
        <div className="mt-6 flex justify-between">
          <a
            href={route("category.index")}
            className="inline-block text-sm text-gray-600 hover:text-sky-600 transition"
          >
            {translations.actions.back}
          </a>
          <a
            href={route("category.edit", category.id)}
            className="inline-block text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}
