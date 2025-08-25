import { router, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Button from "../../Components/UI/Button";
import { useState } from "react";

export default function Update({ product, brands = [], categories = [] }) {
  const { translations } = usePage().props;
  const [preview, setPreview] = useState(
    product.image ? `/storage/${product.image}` : null
  );
  const { data, setData, errors, progress } = useForm({
    name: product.name,
    image: null,
    sku: product.sku,
    uom: product.uom,
    size: product.size,
    description: product.description,
    status: product.status,
    brand_id: product.brand_id,
    category_id: product.category_id,
  });
  function submit(e) {
    e.preventDefault();
    console.log(data);
    const formData = { ...data, _method: "put" };
    router.post(route("product.update", product.id), formData, {
      forceFormData: true,
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setData("image", file);
    setPreview(URL.createObjectURL(file));
  }
  console.log(product.image);
  return (
    <div className="bg-white shadow">
      <h1 className="p-3 text-xl text-gray-500 text-center">
        {translations.product.product_title}
      </h1>
      <form
        className="flex flex-col w-full sm:w-3/4 md:w-1/2 mx-auto p-4 space-y-5"
        onSubmit={submit}
      >
        {/* Name */}
        <input
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          className={`border rounded-lg p-2 ${
            errors.name ? "border-red-600" : "border-gray-300"
          } ${errors.name && "ring-red-600"}`}
          name="name"
          placeholder="Type your product name here."
        />
        {errors.name && <p className="text-red-600">{errors.name}</p>}
        {/* Sku */}
        <input
          value={data.sku}
          onChange={(e) => setData("sku", e.target.value)}
          className={`border rounded-lg p-2 ${
            errors.sku ? "border-red-600" : "border-gray-300"
          } ${errors.sku && "ring-red-600"}`}
          name="sku"
          placeholder="Type your product sku here."
        />
        {errors.sku && <p className="text-red-600">{errors.sku}</p>}
        {/* Uom */}
        <input
          value={data.uom}
          onChange={(e) => setData("uom", e.target.value)}
          className={`border rounded-lg p-2 ${
            errors.uom ? "border-red-600" : "border-gray-300"
          } ${errors.uom && "ring-red-600"}`}
          name="uom"
          placeholder="Type your product uom here."
        />
        {errors.uom && <p className="text-red-600">{errors.uom}</p>}
        {/* Size */}
        <input
          value={data.size}
          onChange={(e) => setData("size", e.target.value)}
          className={`border rounded-lg p-2 ${
            errors.size ? "border-red-600" : "border-gray-300"
          } ${errors.size && "ring-red-600"}`}
          name="size"
          placeholder="Type your product size here."
        />
        {errors.size && <p className="text-red-600">{errors.size}</p>}
        {/* Description */}
        <textarea
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          className={`border rounded-lg p-2 ${
            errors.description ? "border-red-600" : "border-gray-300"
          } ${errors.description && "ring-red-600"}`}
          name="description"
          placeholder="Type your product description here."
        />
        {/* Status */}
        <select
          name="status"
          value={data.status}
          className={`border rounded-lg p-2 ${
            errors.status ? "border-red-600" : "border-gray-300"
          } ${errors.status && "ring-red-600"}`}
          onChange={(e) => setData("status", e.target.value)}
        >
          <option value="">Select Status</option>
          {["active", "inactive"].map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        {errors.status && <p className="text-red-600">{errors.status}</p>}
        {/* Brand */}
        <select
          name="brand_id"
          value={data.brand_id}
          className={`border rounded-lg p-2 ${
            errors.brand_id ? "border-red-600" : "border-gray-300"
          } ${errors.brand_id && "ring-red-600"}`}
          onChange={(e) => setData("brand_id", e.target.value)}
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
          name="category_id"
          value={data.category_id}
          className={`border rounded-lg p-2 ${
            errors.category_id ? "border-red-600" : "border-gray-300"
          } ${errors.category_id && "ring-red-600"}`}
          onChange={(e) => setData("category_id", e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-600">{errors.category_id}</p>
        )}
        {/* Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className={`border rounded-lg p-2 ${
            errors.image ? "border-red-600" : "border-gray-300"
          } ${errors.image && "ring-red-600"}`}
        />
        {progress && (
          <progress value={progress.percentage} max="100">
            {progress.percentage}%
          </progress>
        )}
        {preview && (
          <div>
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          </div>
        )}
        {errors.image && <p className="text-red-600">{errors.image}</p>}
        <Button label={translations.actions.update} />
      </form>
    </div>
  );
}
