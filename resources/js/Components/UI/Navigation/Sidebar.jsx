import { Link, usePage } from "@inertiajs/react";
import {
  LayoutDashboard,
  Settings,
  ShieldUser,
  Tag,
  User,
  UserLock,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
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
    {
      name: translations.sidebar.dashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: url === "/dashboard",
    },
    {
      name: translations.sidebar.categories,
      href: route("category.index"),
      icon: Tag,
      isActive: component.startsWith("Category"),
      permission: can("category.index"),
    },
    {
      name: translations.sidebar.adminstration,
      href: route("permission.index"),
      icon: UserLock,
      isActive:
        component.startsWith("Roles") || component.startsWith("Permissions"),
      isDropDown: true,
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
        {
          name: translations.sidebar.users,
          href: route("user.index"),
          icon: Users,
          isActive: component.startsWith("User"),
        },
      ],
    },
    
  ];

  // ✅ Automatically open dropdown if one of its children is active
  useEffect(() => {
    const adminMenu = navItems.find((item) => item.isDropDown);
    if (adminMenu && adminMenu.navGroup.some((g) => g.isActive)) {
      setOpen(true);
    }
  }, [component]);

  // Helper to close dropdown when navigating
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <aside className="lg:w-1/6 sm:w-1/3 bg-sky-900 text-white flex flex-col">
      <Logo />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(
          (
            {
              name,
              href,
              icon: Icon,
              isActive,
              permission = true,
              isDropDown = false,
              navGroup,
            },
            index
          ) =>
            !permission ? null : !isDropDown ? (
              <Link
                key={index}
                href={href}
                className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                  isActive ? style.active : style.inactive
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={handleLinkClick}
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
                key={index}
                className={`relative ${
                  open ? "bg-sky-800" : "bg-sky-900"
                } rounded transition-colors duration-200 ${
                  isActive ? style.active : style.inactive
                }`}
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="flex flex-row w-full justify-start items-center px-4 py-2 rounded cursor-pointer"
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
                    className={`inline-block h-4 ml-2 transform transition-transform ${
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
                  <ul className="relative flex flex-col w-full bg-sky-800">
                    {navGroup.map(
                      ({
                        name,
                        href,
                        icon: Icon,
                        isActive,
                        permission = true,
                      }) =>
                        permission && (
                          <li key={name}>
                            <Link
                              href={href}
                              className={`flex items-center py-2 pl-8 rounded transition-colors duration-200 ${
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
            component.startsWith("Settings") ? style.active : style.inactive
          }`}
          onClick={handleLinkClick}
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
