import { usePage } from "@inertiajs/react";

export default function useAuth() {
  const { auth } = usePage().props;

  const hasRole = (role) => {
    if (auth?.user?.roles?.includes("Super Admin")) return true;
    return auth?.user?.roles?.includes(role);
  };

  const can = (permission) => {
    if (auth?.user?.roles?.includes("Super Admin")) return true;
    return auth?.user?.permissions?.includes(permission);
  };

  return {
    user: auth?.user,
    hasRole,
    can,
  };
}
