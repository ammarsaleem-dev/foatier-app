import { useForm } from "@inertiajs/react";

function Register() {
  const { data, setData, post, errors } = useForm({
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/register");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        placeholder="name"
      />
      {errors.username && <div>{errors.username}</div>}

      <input
        value={data.username}
        onChange={(e) => setData("username", e.target.value)}
        placeholder="Username"
      />
      {errors.username && <div>{errors.username}</div>}

      <input
        type="password"
        value={data.password}
        onChange={(e) => setData("password", e.target.value)}
        placeholder="Password"
      />
      {errors.password && <div>{errors.password}</div>}

      <input
        type="password"
        value={data.password_confirmation}
        onChange={(e) => setData("password_confirmation", e.target.value)}
        placeholder="Confirm Password"
      />

      <button type="submit">Register</button>
    </form>
  );
}

Register.layout = (page) => page;
export default Register;
