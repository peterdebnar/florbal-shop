import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UserAuth } from "./AuthContext"

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute ({ children }: ProtectedRouteProps) {
    const auth = UserAuth()
    const { user } = auth
    const loading = auth === null

    if (loading) {
        return null
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
} 