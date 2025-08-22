import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Show({ brand }) {

  const {translations} = usePage().props;

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{translations.brand.brand_name}</h1>

        <div className="bg-blue-100 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 select-auto">
          {brand.name}
        </div>

        <div className="text-gray-600 mt-4">
          {translations.brand.brand_created_at} {new Date(brand.created_at).toLocaleDateString()}
        </div>

        <div className="mt-6">
          <a
            href={route("brand.index")}
            className="inline-block text-sm text-gray-600 hover:text-sky-600 transition"
          >
            ← {translations.actions.back}
          </a>
        </div>
      </div>
    </div>
  );
}
