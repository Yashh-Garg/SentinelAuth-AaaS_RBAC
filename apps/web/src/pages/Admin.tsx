import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"

type User = {
    _id: string
    email: string
    role: "user" | "admin"
}

export default function Admin() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const token = localStorage.getItem("token")

    const fetchUsers = () => {
        axios
            .get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setUsers(res.data.users))
            .catch(() => setError("Failed to fetch users"))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            fetchUsers()
        } catch {
            alert("Failed to delete user")
        }
    }

    const toggleRole = async (userId: string, currentRole: "user" | "admin") => {
        const newRole = currentRole === "admin" ? "user" : "admin"
        try {
            await axios.patch(
                `http://localhost:5000/api/users/${userId}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            fetchUsers()
        } catch {
            alert("Failed to update role")
        }
    }

    if (loading) return <p className="text-center mt-10">Loading users...</p>
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

    return (
        <div className="min-h-screen bg-muted py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-4">
                <h1 className="text-2xl font-bold">👤 All Registered Users</h1>

                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="bg-white p-4 shadow rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium">{user.email}</p>
                                <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => toggleRole(user._id, user.role)}
                                    variant="secondary"
                                >
                                    {user.role === "admin" ? "Demote" : "Promote"}
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
