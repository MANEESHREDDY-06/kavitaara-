"use client"

import { useState } from "react"
import AnimatedTitle from "@/components/animated-title"
import AuthForm from "@/components/auth-form"

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌈 Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute -top-5 -right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-5 -right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      {/* 🌟 Main content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-10">
          <AnimatedTitle />
        </div>

        {/* Auth Card */}
        <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl w-full transition-all duration-300">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm font-sans">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-white/35 text-xs mt-6 font-sans font-light tracking-wide max-w-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
