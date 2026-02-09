import { useEffect, useRef, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types/userRole";
import { selectAuthUser } from "@/store/selectors/authSelectors";

const DOMAIN_CONFIG: Record<string, string> = {
  [UserRole.ADMIN]: import.meta.env.VITE_ADMIN_URL || "",
  [UserRole.ASSOCIATE]: import.meta.env.VITE_ASSOCIATE_URL || "",
  [UserRole.USER]: import.meta.env.VITE_MAIN_URL || "",
};

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useSelector(selectAuthUser);
  const location = useLocation();

  const processingRef = useRef(false);

  useEffect(() => {
    if (!user || processingRef.current) return;

    const currentOrigin = window.location.origin.replace(/\/$/, "");
    const targetDomain = DOMAIN_CONFIG[user.role as UserRole]?.replace(
      /\/$/,
      "",
    );

    if (
      targetDomain &&
      targetDomain !== "" &&
      currentOrigin !== targetDomain &&
      !currentOrigin.includes("localhost")
    ) {
      processingRef.current = true;
      window.location.href = `${targetDomain}${location.pathname}`;
    }
  }, [user, location.pathname]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
