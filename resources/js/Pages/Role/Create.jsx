import { useForm } from "@inertiajs/react";
import { route } from 'ziggy-js';

export default function Create() {
  const { data, setData, post, errors } = useForm({
    name: ""
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("roles.store"));
  };

  return (
    <div>
      <h1>Create Role</h1>
      <form onSubmit={submit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
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
