import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { UserRole } from "@/types/userRole";
import {
  selectAuthLoading,
  selectAuthUser,
} from "@/store/selectors/authSelectors";
// import { useGetProfileQuery } from "@/store/api/authApi"; // Agar slice me data nahi hai to yahan bhi call kar sakte hain

// Config
const DOMAIN_CONFIG: Record<string, string> = {
  [UserRole.ADMIN]: import.meta.env.VITE_ADMIN_URL,
  [UserRole.ASSOCIATE]: import.meta.env.VITE_ASSOCIATE_URL,
  [UserRole.USER]: import.meta.env.VITE_MAIN_URL,
};
const MAIN_DOMAIN = import.meta.env.VITE_MAIN_URL;

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useSelector(selectAuthUser);
  const isLoading = useSelector(selectAuthLoading);

  // --- Logic ---
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
    // 🛑 Agar load ho raha hai to kuch mat karo (Wait for Cookie check)
    if (isLoading) return;

    // 1. Login nahi hai -> Go to Main
    if (!user && !isOnMainDomain) {
      window.location.href = `${normalizedMain}/`;
      return;
    }

    // 2. Login hai, par galat domain -> Go to Target (Cookie browser ke pass hai, wahan bhi chalegi)
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

  // --- Render ---

  if (isLoading) return null; // Spinner dikhao jab tak user check na ho jaye

  if (!user) {
    if (isOnMainDomain) return <Navigate to="/" replace />;
    return null;
  }

  if (isWrongDomainForUser) return null;

  return <>{children}</>;
}
