import { useForm } from "@inertiajs/react";
import Logo from "../../Components/UI/Logo";

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

  const inputObject = [
    {
      type: "text",
      value: data.name,
      onChange: (e) => setData("name", e.target.value),
      placeholder: "Name",
    },
    {
      type: "text",
      value: data.username,
      onChange: (e) => setData("username", e.target.value),
      placeholder: "Username",
    },
    {
      type: "password",
      value: data.password,
      onChange: (e) => setData("password", e.target.value),
      placeholder: "Password",
    },
    {
      type: "password",
      value: data.password_confirmation,
      onChange: (e) => setData("password_confirmation", e.target.value),
      placeholder: "Confirm Password",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="flex flex-col justify-between items-center bg-white p-6 rounded shadow-md w-96 space-y-5"
        onSubmit={handleSubmit}
      >
        <Logo />
        {/* Username and Password Inputs */}

        {inputObject.map((input, index) => (
          <div key={index} className="w-full">
            <input
              autoFocus={index === 0}
              className={`mb-4 p-2 border border-gray-300 rounded w-full ${
                errors[input.placeholder.toLowerCase()]
                  ? "border-red-600"
                  : "border-gray-300"
              } ${errors[input.placeholder.toLowerCase()] && "ring-red-600"}`}
              type={input.type}
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
            />
            {errors[input.placeholder.toLowerCase()] && (
              <div className="text-red-500 text-sm">
                {errors[input.placeholder.toLowerCase()]}
              </div>
            )}
          </div>
        ))}
        <button
          className="bg-sky-700 font-medium text-white p-2 rounded w-full cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <input
    //     value={data.name}
    //     onChange={(e) => setData("name", e.target.value)}
    //     placeholder="name"
    //   />
    //   {errors.username && <div>{errors.username}</div>}

    //   <input
    //     value={data.username}
    //     onChange={(e) => setData("username", e.target.value)}
    //     placeholder="Username"
    //   />
    //   {errors.username && <div>{errors.username}</div>}

    //   <input
    //     type="password"
    //     value={data.password}
    //     onChange={(e) => setData("password", e.target.value)}
    //     placeholder="Password"
    //   />
    //   {errors.password && <div>{errors.password}</div>}

    //   <
    //     type="password"
    //     value={data.password_confirmation}
    //     onChange={(e) => setData("password_confirmation", e.target.value)}
    //     placeholder="Confirm Password"
    //   />

    //   <button type="submit">Register</button>
    // </form>
  );
}

Register.layout = (page) => page;
export default Register;
