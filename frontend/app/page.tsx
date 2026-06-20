"use client"
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const demoCredentials = {
  admin: { email: "admin@medicare.com", password: "admin123" },
}

type Role = keyof typeof demoCredentials

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>("admin")
  const [email, setEmail] = useState(demoCredentials.admin.email)
  const [password, setPassword] = useState(demoCredentials.admin.password)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleRoleSelect = (role: string) => {
    setEmail(demoCredentials.admin.email)
    setPassword(demoCredentials.admin.password)
    clearErrors()
  }

  const clearErrors = () => {
    setError(null)
    setEmailError(false)
    setPasswordError(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    const expected = demoCredentials[selectedRole]
    const emailOk = email === expected.email
    const pwOk = password === expected.password

    if (!emailOk || !pwOk) {
      setEmailError(!emailOk)
      setPasswordError(!pwOk)
      setError("Wrong details. Please check your email and password.")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    localStorage.setItem("userEmail", email)
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-blue-400 rounded-full p-2">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MediCare</h1>
        </div>

        {/* Card */}
        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl text-gray-900">Hospital Management</CardTitle>
            <CardDescription className="text-gray-500">Sign in to access the system</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">

            {/* Error alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 text-black" />
                <AlertDescription className="text-sm ml-1">{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErrors() }}
                  placeholder="your@email.com"
                  required
                  className={`bg-white border text-gray-900 placeholder:text-gray-400 ${emailError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-primary"
                    }`}
                />
                {emailError && (
                  <p className="text-xs text-red-500">Email doesn't match</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearErrors() }}
                    placeholder="••••••••"
                    required
                    className={`bg-white border text-gray-900 placeholder:text-gray-400 pr-10 ${passwordError
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-primary"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500">Password doesn't match</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400">
              This is a demo. Use the pre-filled credentials.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}