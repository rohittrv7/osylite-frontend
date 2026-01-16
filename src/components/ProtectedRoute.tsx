import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useSelector((state: RootState) => state.auth)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
