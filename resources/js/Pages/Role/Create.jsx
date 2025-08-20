import { Head, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Button from "../../Components/UI/Button";

export default function Create() {
  const { translations } = usePage().props;
  const { data, setData, post, errors } = useForm({
    name: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("role.store"));
  };

  return (
    <>
      <Head title="Create" />
      <div className="bg-white shadow">
        <h1 className="p-3 text-xl font-gray-500 text-center">Create Role</h1>
        <form
          onSubmit={submit}
          className="flex flex-col w-1/2 mx-auto p-4 space-y-5"
        >
            <input
              className={`border rounded-lg p-2 ${
                errors.name ? "border-red-600" : "border-gray-300"
              } ${errors.name && "ring-red-600"}`}
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder={translations.role.role_name}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          <Button label={translations.actions.create} />
        </form>
      </div>
    </>
  );
}
