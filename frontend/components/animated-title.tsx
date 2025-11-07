"use client"

import { useEffect, useState } from "react"

const TITLE = "KAVITAARA"

export default function AnimatedTitle() {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    setHasStarted(true)
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    if (displayedText.length === TITLE.length) {
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(TITLE.slice(0, displayedText.length + 1))
    }, 200)

    return () => clearTimeout(timer)
  }, [displayedText, hasStarted])

  return (
    <div className="mb-0">
      <h1 className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight flex items-center justify-center font-serif font-black text-6xl sm:text-7xl md:text-8xl leading-tight">
        {displayedText}
        {!isComplete && (
          <span className="ml-1 inline-block w-1 h-10 sm:h-12 bg-linear-to-b from-purple-400 to-pink-400 animate-pulse rounded-full"></span>
        )}
      </h1>
      <p className="text-white/50 text-xs sm:text-sm mt-2 font-sans font-light tracking-wide">
        Your creative space awaits
      </p>
    </div>
  )
}
