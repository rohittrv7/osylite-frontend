import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "@/store/api/authApi";
import { UserRole } from "@/types/userRole";
import { DOMAINS } from "@/config/config";

export default function PublicRoute({ children }: { children?: ReactNode }) {
  const { data: user, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (!user) return;

    const host = window.location.hostname;

    if (user.role === UserRole.ADMIN && host !== "admin.osylite.com") {
      window.location.href = DOMAINS.ADMIN_URL;
    }

    if (user.role === UserRole.ASSOCIATE && host !== "associate.osylite.com") {
      window.location.href = DOMAINS.ASSOCIATE_URL;
    }

    if (user.role === UserRole.USER && host === "admin.osylite.com") {
      window.location.href = DOMAINS.MAIN_URL + "/home";
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="animate-pulse text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
