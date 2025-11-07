"use client"

import { useState } from "react"
import AnimatedTitle from "@/components/animated-title"
import BackgroundLetters from "@/components/background-letters"
import AuthForm from "@/components/auth-form"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4 bg-linear-to-br from-black via-neutral-950 to-black">
      <BackgroundLetters />

      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* main content */}
      <div className="relative z-20 w-full max-w-md flex flex-col items-center justify-center">
        <div className="text-center mb-0 sm:mb-1 md:mb-2">
          <AnimatedTitle />
        </div>

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl w-full transition-all duration-300 hover:shadow-3xl hover:bg-white/15">
          <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          <div className="mt-3 text-center">
            <p className="text-white/70 text-sm font-sans">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-amber-300 hover:text-amber-200 font-semibold transition-colors duration-200 hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-4 font-sans font-light tracking-wide max-w-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%,100%{transform:translate(0,0) scale(1);}
          33%{transform:translate(30px,-40px) scale(1.1);}
          66%{transform:translate(-20px,20px) scale(0.9);}
        }
        .animate-blob{animation:blob 18s infinite;}
        .animation-delay-2000{animation-delay:2s;}
        .animation-delay-4000{animation-delay:4s;}
      `}</style>
    </div>
  )
}
