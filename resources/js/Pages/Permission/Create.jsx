import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({ name: "" });

  const submit = (e) => {
    e.preventDefault();
    post(route("permission.store"));
  };

  return (
    <div>
      <h1>Create Permission</h1>
      <form onSubmit={submit}>
        <div>
          <label>Name:</label>
          <input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
