export default function Button({ label, onClick, variant = "primary" }) {
  const typeStyle = {
    primary: "bg-sky-600 hover:bg-sky-800 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-800 text-white",
  };

  const baseStyle = "px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer";

  return (
    <button onClick={onClick} className={`${baseStyle} ${typeStyle[variant]}`}>
      {label}
    </button>
  );
}
