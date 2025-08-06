import Logo from "../../Components/UI/Logo";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

function Login() {
  const { props } = usePage();
  const { data, setData, post, errors } = useForm({
    username: "",
    password: "",
  });
  // Handle form submission
  const authUser = props.auth.user ?? null; // Check if user is authenticated

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };

  useEffect(() => {
    if (authUser) {
      router.visit("/");
    }
  }, [authUser]);

  const inputObjects = [
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
  ];

  return (
    !authUser && (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          className="flex flex-col justify-between items-center bg-white p-6 rounded shadow-md w-96 space-y-5"
          onSubmit={handleSubmit}
        >
          <Logo />
          {/* Username and Password Inputs */}
          {inputObjects.map((input, index) => (
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
            Login
          </button>
        </form>
      </div>
    )
  );
}

Login.layout = (page) => page;
export default Login;
