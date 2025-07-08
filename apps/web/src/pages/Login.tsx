import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })

      const token = res.data.token
      localStorage.setItem("token", token)
      navigate("/dashboard")
    } catch (err: any) {
      let apiMessage = "Login failed. Try again."
      const data = err.response?.data

      if (data?.message) {
        apiMessage = data.message
      } else if (Array.isArray(data)) {
        apiMessage = data[0]?.message || apiMessage
      }

      setError(apiMessage)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm shadow-md border">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <CardTitle className="text-xl font-semibold text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={loading}
              variant="default"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {error && (
              <div className="rounded-md border border-red-400 bg-red-100 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>

            <hr className="my-4" />

            <p className="text-xs text-center text-muted-foreground">
              🔒 Secured by{" "}
              <span className="font-semibold text-primary">@SentinelAuth</span>
            </p>
          </CardContent>
        </form>
      </Card>
    </main>
  )
}
