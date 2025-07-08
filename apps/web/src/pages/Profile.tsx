import { useEffect, useState } from "react"
import axios from "axios"

type User = {
    email: string
    role: "user" | "admin"
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setError("Unauthorized")
            return
        }

        axios
            .get("http://localhost:5000/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setUser(res.data.user))
            .catch(() => {
                setError("Unauthorized")
                localStorage.removeItem("token")
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-center mt-10">Loading profile...</p>
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

    return (
        <div className="min-h-screen bg-muted py-10 px-4">
            <div className="max-w-md mx-auto space-y-4 text-center">
                <h1 className="text-2xl font-bold">👤 Your Profile</h1>
                <p className="text-lg">Email: <span className="font-medium">{user?.email}</span></p>
                <p className="text-muted-foreground">Role: {user?.role}</p>
            </div>
        </div>
    )
}
