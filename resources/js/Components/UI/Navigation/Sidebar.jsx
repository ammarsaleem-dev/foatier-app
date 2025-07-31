import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Tag } from "lucide-react";
import Logo from "../Logo";
import {route} from 'ziggy-js';

export default function Sidebar() {
  const { url, component } = usePage();
  // const route = useRoute();

  const style = {
    active: "bg-sky-100 text-sky-950 font-semibold",
    inactive: "hover:bg-sky-800 text-gray-300 hover:text-white",
    iconBase: "mr-2 w-5 h-5",
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: url === "/",
    },
    {
      name: "Categories",
      href: route("category.index"),
      icon: Tag,
      isActive: component.startsWith("Category"),
    },
  ];

  return (
    <aside className="lg:w-1/6 sm:w-1/6 bg-sky-900 text-white flex flex-col">
      <Logo />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ name, href, icon: Icon, isActive }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center py-2 px-3 rounded transition-colors duration-200 ${
              isActive ? style.active : style.inactive
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className={`${style.iconBase} ${
                isActive
                  ? "text-sky-950"
                  : "text-gray-300 group-hover:text-white"
              }`}
            />
            {name}
          </Link>
        ))}
      </nav>

      <nav className="p-4 space-y-2 border-t border-sky-800">
        {["Profile", "Settings"].map((label) => (
          <a
            key={label}
            href="#"
            className="block py-2 px-3 rounded transition-colors hover:bg-sky-800"
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
