import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

type User = {
    email: string
    role: "user" | "admin"
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser must be used within UserProvider")
    return context
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return


        axios
            .get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null))
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}