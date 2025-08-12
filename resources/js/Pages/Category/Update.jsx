import { Head, useForm, usePage } from "@inertiajs/react";
import Button from "../../Components/UI/Button";
import { route } from "ziggy-js";
export default function Update({ category }) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
  });

  const { translations } = usePage().props;

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
          {translations.category.category_update}
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
          <Button label={translations.actions.update} on />
        </form>
      </div>
    </>
  );
}
