import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "@/store/api/authApi";
import { UserRole } from "@/types/userRole";
import { DOMAINS } from "@/config/config";

export default function PublicRoute() {
  const { data: user, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (user) {
      const currentHost = window.location.hostname;

      if (user.role === UserRole.ADMIN) {
        if (
          currentHost !== "admin.osylite.com" &&
          !currentHost.includes("localhost")
        ) {
          window.location.href = DOMAINS.ADMIN_URL;
        }
      }

      if (user.role === UserRole.USER) {
        if (currentHost === "admin.osylite.com") {
          window.location.href = DOMAINS.MAIN_URL + "/home";
        }
      }
    }
  }, [user]);

  if (isLoading) return null;

  if (user) {
    const currentHost = window.location.hostname;

    if (user.role === UserRole.ADMIN) {
      if (
        currentHost === "admin.osylite.com" ||
        currentHost.includes("localhost")
      ) {
        return <Navigate to="/dashboard" replace />;
      }
      return null;
    }

    if (user.role === UserRole.USER) {
      if (currentHost !== "admin.osylite.com") {
        return <Navigate to="/home" replace />;
      }
      return null;
    }
  }

  return <Outlet />;
}
