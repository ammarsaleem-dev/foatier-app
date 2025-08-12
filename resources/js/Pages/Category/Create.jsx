import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
  });
  const { translations } = usePage().props;

  function submit(e) {
    e.preventDefault();
    post(route("category.store"));
  }

  return (
    <>
      <Head title="Create" />
      <div className="bg-white shadow ">
        <h1 className="p-3 text-xl font-gray-500 text-center">
          {translations.category.category_create}
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
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors duration-200"
            onClick={submit}
            type="submit"
          >
            {translations.actions.create}
          </button>
        </form>
      </div>
    </>
  );
}
