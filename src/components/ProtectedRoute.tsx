import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { UserRole } from "@/types/userRole";
import {
  selectAuthLoading,
  selectAuthUser,
} from "@/store/selectors/authSelectors";

const DOMAIN_CONFIG: Record<string, string> = {
  [UserRole.ADMIN]: import.meta.env.VITE_ADMIN_URL,
  [UserRole.ASSOCIATE]: import.meta.env.VITE_ASSOCIATE_URL,
  [UserRole.USER]: import.meta.env.VITE_MAIN_URL,
};
const MAIN_DOMAIN = import.meta.env.VITE_MAIN_URL;

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useSelector(selectAuthUser);
  const isLoading = useSelector(selectAuthLoading);

  const currentOrigin = window.location.origin;
  const normalizedCurrent = currentOrigin.replace(/\/$/, "");
  const normalizedMain = MAIN_DOMAIN.replace(/\/$/, "");

  const isOnMainDomain = normalizedCurrent === normalizedMain;

  const targetBaseUrl = user ? DOMAIN_CONFIG[user.role as UserRole] : null;
  const normalizedTarget = targetBaseUrl
    ? targetBaseUrl.replace(/\/$/, "")
    : "";

  const isWrongDomainForUser =
    user && normalizedTarget && normalizedCurrent !== normalizedTarget;

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isOnMainDomain) {
      window.location.href = `${normalizedMain}/`;
      return;
    }

    if (user && isWrongDomainForUser) {
      window.location.href = `${normalizedTarget}/home`;
    }
  }, [
    user,
    isLoading,
    isOnMainDomain,
    isWrongDomainForUser,
    normalizedMain,
    normalizedTarget,
  ]);

  if (isLoading) return null;

  if (!user) {
    if (isOnMainDomain) return <Navigate to="/" replace />;
    return null;
  }

  if (isWrongDomainForUser) return null;

  return <>{children}</>;
}
