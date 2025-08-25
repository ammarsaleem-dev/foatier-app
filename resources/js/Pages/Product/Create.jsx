import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Create({ brands = [], categories = [] }) {
  const { translations } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    image: null,
    description: "",
    sku: "",
    uom: "",
    size: "",
    status: "active",
    brand_id: "",
    category_id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  function submit(e) {
    e.preventDefault();
    post(route("product.store"));
  }

  return (
    <>
      <Head title="Create" />
      <div className="bg-white shadow ">
        <h1 className="p-3 text-xl font-gray-500 text-center">
          {translations.product.product_create}
        </h1>
        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
          encType="multipart/form-data"
        >
          {/* Name */}
          <input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.name ? "border-red-600" : "border-gray-300"
            }`}
            name="name"
            autoFocus
            placeholder="Product name"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}

          {/* SKU */}
          <input
            value={data.sku}
            onChange={(e) => setData("sku", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.sku ? "border-red-600" : "border-gray-300"
            }`}
            name="sku"
            placeholder="SKU"
          />
          {errors.sku && <p className="text-red-600">{errors.sku}</p>}

          {/* UOM */}
          <input
            value={data.uom}
            onChange={(e) => setData("uom", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.uom ? "border-red-600" : "border-gray-300"
            }`}
            name="uom"
            placeholder="Unit of Measure (e.g. Box, Pack)"
          />
          {errors.uom && <p className="text-red-600">{errors.uom}</p>}

          {/* Size */}
          <input
            value={data.size}
            onChange={(e) => setData("size", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.size ? "border-red-600" : "border-gray-300"
            }`}
            name="size"
            placeholder="Size (e.g. 500ml, 1L)"
          />
          {errors.size && <p className="text-red-600">{errors.size}</p>}

          {/* Status */}
          <select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.status ? "border-red-600" : "border-gray-300"
            }`}
            name="status"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-600">{errors.status}</p>}

          {/* Brand */}
          <select
            value={data.brand_id}
            onChange={(e) => setData("brand_id", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.brand_id ? "border-red-600" : "border-gray-300"
            }`}
            name="brand_id"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brand_id && <p className="text-red-600">{errors.brand_id}</p>}

          {/* Category */}
          <select
            value={data.category_id}
            onChange={(e) => setData("category_id", e.target.value)}
            className={`border rounded-lg p-2 w-full ${
              errors.category_id ? "border-red-600" : "border-gray-300"
            }`}
            name="category_id"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-600">{errors.category_id}</p>
          )}

          {/* Description */}
          <textarea
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.description ? "border-red-600" : "border-gray-300"
            }`}
            name="description"
            placeholder="Product description"
          />
          {errors.description && (
            <p className="text-red-600">{errors.description}</p>
          )}

          {/* Image */}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setData("image", file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
              } else {
                setImagePreview(null);
              }
            }}
            className={`border rounded-lg p-2 ${
              errors.image ? "border-red-600" : "border-gray-300"
            }`}
            name="image"
            accept="image/*"
          />
          {imagePreview && (
            <div className="my-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded border"
              />
            </div>
          )}
          {errors.image && <p className="text-red-600">{errors.image}</p>}

          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors duration-200"
            onClick={submit}
            type="submit"
            disabled={processing}
          >
            {translations.actions.create}
          </button>
        </form>
      </div>
    </>
  );
}
