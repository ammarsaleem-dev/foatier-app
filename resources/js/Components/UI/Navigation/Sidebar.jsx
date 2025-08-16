import { Link, usePage } from "@inertiajs/react";
import {
  LayoutDashboard,
  Settings,
  ShieldUser,
  Tag,
  UserLock,
} from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo";

export default function Sidebar() {
  const { url, component } = usePage();
  const { translations } = usePage().props;
  const { hasRole, can } = useAuth();
  const [open, setOpen] = useState(false);
  const style = {
    active: "bg-sky-100 text-sky-950 font-medium",
    inactive: "hover:bg-sky-800 text-gray-300 hover:text-white",
    iconBase: "mr-2 w-5 h-5",
  };

  const navItems = [
    // {
    //   name: translations.sidebar.welcome,
    //   href: "/",
    //   icon: House,
    //   isActive: url === "/",
    //   role: hasRole("admin"),
    // },
    {
      name: translations.sidebar.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: url === "/dashboard",
      // permission: hasRole("admin"),
    },
    {
      name: translations.sidebar.categories,
      href: route("category.index"),
      icon: Tag,
      isActive: component.startsWith("Category"),
      permission: can("category.index"),
    },
    // {
    //   name: translations.sidebar.roles,
    //   href: route("role.index"),
    //   icon: ShieldUser,
    //   isActive: component.startsWith("Role"),
    // },
    // {
    //   name: translations.sidebar.permissions,
    //   href: route("permission.index"),
    //   icon: UserLock,
    //   isActive: component.startsWith("Permission"),
    // },
    {
      name: translations.sidebar.adminstration,
      href: route("permission.index"),
      icon: UserLock,
      isActive: component.startsWith(["Roles", "Permission"]),
      isDropDown: true,
      groupName: "Admin",
      navGroup: [
        {
          name: translations.sidebar.roles,
          href: route("role.index"),
          icon: ShieldUser,
          isActive: component.startsWith("Role"),
        },
        {
          name: translations.sidebar.permissions,
          href: route("permission.index"),
          icon: UserLock,
          isActive: component.startsWith("Permission"),
        },
      ],
    },
  ];

  return (
    <aside className="lg:w-1/6 sm:w-1/4 bg-sky-900 text-white flex flex-col">
      <Logo />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(
          ({
            name,
            href,
            icon: Icon,
            isActive,
            permission = true,
            isDropDown = false,
            navGroup,
          }) =>
            !permission ? (
              ""
            ) : !isDropDown ? (
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
            ) : (
              <div
                key={name}
                className={`relative ${
                  open ? "bg-sky-800" : "bg-sky-900"
                } rounded transition-colors duration-200 ${
                  isActive ? style.active : style.inactive
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className={`flex flex-row justify-center items-center px-4 py-2 rounded cursor-pointer`}
                >
                  <Icon
                    className={`${style.iconBase} ${
                      isActive
                        ? "text-sky-950"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  />
                  {name}
                  <svg
                    className={`inline-block  h-4 ml-2 transform transition-transform ${
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
                  <ul className="aboslute left-0 mt-1">
                    {navGroup.map(
                      ({
                        name,
                        href,
                        icon: Icon,
                        isActive,
                        permission = true,
                      }) => (
                        <li  key={name}>
                          <Link
                           
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
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            )
        )}
      </nav>

      <nav className="py-2 px-3 rounded transition-colors duration-200">
        <Link
          href="/"
          className={`flex items-center py-2 px-3 rounded transition-colors duration-200 ${
            component.startsWith("settings") ? style.active : style.inactive
          }`}
        >
          <Settings
            className={`${style.iconBase} ${
              component.startsWith("Settings")
                ? "text-sky-950"
                : "text-gray-300 group-hover:text-white"
            }`}
          />
          {translations.sidebar.settings}
        </Link>
      </nav>
    </aside>
  );
}
