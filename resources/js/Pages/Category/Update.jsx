import { Head, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

export default function Update({ category }) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
  });

  const route = useRoute();

  function submit(e) {
    e.preventDefault();
    put(route("category.update", category.id), {
      onSuccess: () => {
        console.log("Category updated successfully");
      },
      onError: (errors) => {
        console.error("Failed to update category", errors);
      },
    });
  }

  return (
    <>
      <Head title="Update" />
      <div className="bg-white shadow ">
        <h1 className="p-3 text-xl font-gray-500 text-center">
          Update Category
        </h1>
        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
        >
          <input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className={`border rounded-lg p-2 ${
              errors.name ? "border-red-600" : "border-gray-300"
            } ${errors.name && "ring-red-600"}`}
            name="name"
            autoFocus
            placeholder="Type your category here."
          ></input>
          {errors.name && <p className="text-red-600">{errors.name}</p>}
          <button type="submit">Update </button>
        </form>
      </div>
    </>
  );
}
