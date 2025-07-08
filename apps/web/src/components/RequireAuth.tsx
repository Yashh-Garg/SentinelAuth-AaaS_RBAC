// src/components/RequireAuth.tsx
import { useEffect } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

type Props = {
    children: ReactNode
}

type TokenPayload = {
    id: string
    role: "user" | "admin"
}

export default function RequireAuth({ children }: Props) {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        try {
            jwtDecode<TokenPayload>(token) // just validating it
        } catch {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }, [navigate])

    return <>{children}</>
}
