import { router, usePage } from "@inertiajs/react";
import Dropdown from "../Dropdown";
import Breadcrumb from "./Breadcrumb";

export default function Navbar() {
  const { auth } = usePage().props;

  return (
    <header className="bg-white shadow">
      <nav className="px-4 py-2 flex justify-between items-center">
        <Breadcrumb />
        <Dropdown
          label={auth.user.name}
          items={[
            {
              label: "Profile",
              onClick: () => router.visit("/profile"),
            },
            {
              label: "Logout",
              onClick: () => router.post("/logout"),
            },
          ]}
        />
      </nav>
    </header>
  );
}
