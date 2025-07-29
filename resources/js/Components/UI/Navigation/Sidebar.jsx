import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Tag } from "lucide-react";
import Logo from "../Logo";
import { useRoute } from "../../../../../vendor/tightenco/ziggy/src/js";

export default function Sidebar() {
  const { url, component } = usePage();

  const route = useRoute();

  const style = {
    active: "bg-sky-100 text-sky-950",
    inactive: "hover:bg-sky-800 text-gray-300",
  };

  return (
    <aside className="lg:w-1/6 sm:w-1/6 bg-sky-900 text-white flex flex-col">
      <Logo />
      {/* Top Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/"
          className={`flex items-center py-2 px-3 rounded transition-colors
                    ${url === "/" ? style.active : style.inactive}`}
        >
          <LayoutDashboard
            className={url === "/" ? "text-sky-950 mr-2" : "text-gray-300 mr-2"}
          />
          Dashboard
        </Link>
        <Link
          href={route("category.index")}
          className={`flex items-center py-2 px-3 rounded transition-colors
                    ${
                      component.startsWith("Category")
                        ? style.active
                        : style.inactive
                    }`}
        >
          <Tag
            className={
              url.includes("category")
                ? "text-sky-950 mr-2"
                : "text-gray-300 mr-2"
            }
          />
          Categories
        </Link>
      </nav>
      {/* Bottom Navigation */}
      <nav className="p-4 space-y-2">
        <a
          href="#"
          className="block py-2 px-3 rounded transition-colors hover:bg-sky-800"
        >
          Profile
        </a>
        <a
          href="#"
          className="block py-2 px-3 rounded transition-colors hover:bg-sky-800"
        >
          Settings
        </a>
      </nav>
    </aside>
  );
}
