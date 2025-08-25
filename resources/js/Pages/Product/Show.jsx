import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Show({ product, brand, category, translations }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
        {product.image && (
          <img src={`/storage/${product.image}`} alt={product.name} className="mx-auto mb-4 max-h-48 rounded border" />
        )}
        <div className="text-gray-600 mb-2">SKU: {product.sku}</div>
        <div className="text-gray-600 mb-2">UOM: {product.uom}</div>
        <div className="text-gray-600 mb-2">Size: {product.size}</div>
        <div className="text-gray-600 mb-2">Status: {product.status}</div>
        <div className="text-gray-600 mb-2">Brand: {brand ? brand.name : "-"}</div>
        <div className="text-gray-600 mb-2">Category: {category ? category.name : "-"}</div>
        <div className="bg-blue-100 text-sky-700 font-semibold text-lg rounded-lg px-6 py-4 select-auto mt-4">
          {product.description}
        </div>
        <div className="text-gray-600 mt-4">
          Created: {new Date(product.created_at).toLocaleDateString()}
        </div>
        <div className="mt-6 flex justify-between">
          <a
            href={route("product.index")}
            className="inline-block text-sm text-gray-600 hover:text-sky-600 transition"
          >
             {translations.actions.back}
          </a>
          <a
            href={route("product.edit", product.id)}
            className="inline-block text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}
