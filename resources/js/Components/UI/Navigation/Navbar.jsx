import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Dropdown from "../Dropdown";
import Breadcrumb from "./Breadcrumb";

export default function Navbar() {
  const { auth, locale, translations } = usePage().props;

  const switchLang = (lang) => {
    router.get(route("lang.switch", ("locale", lang)));
  };

  return (
    <nav className="bg-white z-0 shadow px-4 py-2 flex justify-between items-center">
      <Breadcrumb />
      <div>{translations.language}</div>
      {/* Language */}
      <div className="divide-x divide-solid divide-gray-100">
        <Dropdown
          label={locale}
          items={[
            {
              label: "English",
              onClick: () => switchLang("en"),
            },
            {
              label: "Arabic",
              onClick: () => switchLang("ar"),
            },
          ]}
        />
        {/* User */}
        <Dropdown
           label={auth.user.name}
          items={[
            {
              label:  `${translations.auth.profile}`,
              onClick: () => router.visit("/profile"),
            },
            {
              label: `${translations.auth.logout}`,
              onClick: () => router.post("/logout"),
            },
          ]}
        />
      </div>
    </nav>
  );
}
