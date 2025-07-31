import { useState } from "react";

export default function Dropdown({ label = "Select", items = [] }) {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div className="relative inline-block text-gray-500 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className={`px-4 py-2 rounded cursor-pointer ${
          open ? "bg-gray-100" : ""
        } `}
      >
        {label}
        <svg
          className={`inline-block w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 mt-1 bg-white border border-gray-100 rounded shadow">
          {items.map((item, index) => (
            <li
              type="submit"
              key={index}
              className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer "
              onClick={() => {
                setOpen(false);
                item.onClick && item.onClick();
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
