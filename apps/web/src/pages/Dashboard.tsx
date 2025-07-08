import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
type User = {
  email: string
  role: "user" | "admin"
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/")
      return
    }

    axios
      .get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((err) => {
        console.error(err)
        setError("Unauthorized")
        localStorage.removeItem("token")
        navigate("/")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  return (

    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">
          You are logged in as <span className="font-medium">"{user?.email}"</span>
        </p>
        <p className="text-sm text-primary">Role: {user?.role}</p>

        <Button variant="destructive" onClick={() => {
          localStorage.removeItem("token")
          navigate("/")
        }}>
          Logout
        </Button>
      </div>
    </div>
  )


}

