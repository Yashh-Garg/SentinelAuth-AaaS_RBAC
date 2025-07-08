import type { ReactNode } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

type Props = {
  children: ReactNode
}

type TokenPayload = {
  id: string
  role: "user" | "admin"
  exp?: number
}

export default function RequireAdmin({ children }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token)
      if (decoded.role !== "admin") {
        navigate("/dashboard")
      }
    } catch {
      navigate("/login")
    }
  }, [navigate])

  return <>{children}</>
}
