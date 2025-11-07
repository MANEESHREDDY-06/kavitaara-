"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthFormProps {
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
}

export default function AuthForm({ isSignUp, setIsSignUp }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!email) {
        setError("Please enter your email address")
        return
      }

      if (isForgotPassword) {
        console.log("Password recovery for:", email)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        alert("If this email exists, password recovery instructions have been sent.")
        setEmail("")
        setIsForgotPassword(false)
        return
      }

      if (!password) {
        setError("Please fill in all fields")
        return
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          return
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters")
          return
        }
        console.log("Sign up:", { email })
      } else {
        console.log("Sign in:", { email })
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    try {
      console.log("Google auth clicked")
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleEmailAuth} className="space-y-6 sm:space-y-7">
      {/* Email Field */}
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="email" className="text-white/80 font-medium text-sm font-sans min-w-[130px] text-right">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 font-sans transition-all h-11 rounded-lg flex-1"
          disabled={loading}
        />
      </div>

      {/* Password Field */}
      {!isForgotPassword && (
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="password" className="text-white/80 font-medium text-sm font-sans min-w-[130px] text-right">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 font-sans transition-all h-11 rounded-lg flex-1"
            disabled={loading}
          />
        </div>
      )}

      {/* Confirm Password */}
      {isSignUp && !isForgotPassword && (
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="confirm-password"
            className="text-white/80 font-medium text-sm font-sans min-w-[130px] text-right"
          >
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 font-sans transition-all h-11 rounded-lg flex-1"
            disabled={loading}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/15 border border-red-500/40 rounded-lg p-3 text-red-300 text-sm font-sans animate-in fade-in duration-300">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                   text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 font-sans shadow-lg 
                   hover:shadow-purple-500/40 duration-200 h-11 text-base"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : isForgotPassword ? (
          "Recover Password"
        ) : isSignUp ? (
          "Create Account"
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Forgot Password Link */}
      {!isSignUp && !isForgotPassword && (
        <div className="text-center mt-1">
          <button
            type="button"
            onClick={() => setIsForgotPassword(true)}
            className="text-purple-300 hover:text-purple-200 text-sm font-medium font-sans transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      )}

      {/* Back to Sign In */}
      {isForgotPassword && (
        <div className="text-center mt-1">
          <button
            type="button"
            onClick={() => setIsForgotPassword(false)}
            className="text-purple-300 hover:text-purple-200 text-sm font-medium font-sans transition-colors"
          >
            ← Back to Sign In
          </button>
        </div>
      )}

      {/* Divider */}
      {!isForgotPassword && (
        <>
          <div className="relative my-6 sm:my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white/60 font-sans text-xs font-medium">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <Button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-sans 
                       bg-white/5 backdrop-blur-sm rounded-lg h-11 transition-all duration-200 font-medium 
                       flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2 -shrink-0 translate-y-[0.5px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isSignUp ? "Sign up with Google" : "Sign in with Google"}
          </Button>
        </>
      )}
    </form>
  )
}
