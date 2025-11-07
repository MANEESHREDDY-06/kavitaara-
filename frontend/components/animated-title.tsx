"use client"

import { useEffect, useState } from "react"

interface Star {
  id: string
  x: number
  y: number
  size: number
  delay: number
}

const TITLE = "KAVITAARA"

export default function AnimatedTitle() {
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < TITLE.length) {
        setVisibleLetters((prev) => prev + 1)
        // sparkle burst for each letter
        const newStars: Star[] = Array.from({ length: 10 }, (_, j) => ({
          id: `${i}-${j}-${Date.now()}`,
          x: 50 + Math.random() * 40 - 20,
          y: 50 + Math.random() * 10 - 5,
          size: 1 + Math.random() * 2.5,
          delay: Math.random() * 0.3,
        }))
        setStars((prev) => [...prev, ...newStars])
        i++
      } else clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // remove older stars to keep perf nice
  useEffect(() => {
    const clean = setInterval(() => setStars((p) => p.slice(-80)), 2000)
    return () => clearInterval(clean)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      {/* dark golden backdrop */}
      <div className="absolute inset-0 bg-gradient-radial from-black via-neutral-950 to-black opacity-95" />

      {/* glowing aura */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-amber-500/10 via-yellow-400/5 to-transparent blur-3xl rounded-full animate-soft-pulse" />

      {/* title */}
      <div className="relative z-10 flex justify-center">
        {TITLE.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block font-serif font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-amber-400 to-yellow-600 text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none drop-shadow-[0_0_25px_rgba(255,220,130,0.3)]"
            style={{
              opacity: visibleLetters > i ? 1 : 0,
              animationName: visibleLetters > i ? "letterAppear" : "none",
              animationDuration: "1.2s",
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <p className="relative z-10 text-white/70 text-sm sm:text-base mt-2 font-sans font-light tracking-wide text-center">
        Your creative space awaits
      </p>

      {/* star particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-yellow-200/90"
            style={{
              left: `${s.x + Math.random() * 5 - 2.5}%`,
              top: `${s.y + Math.random() * 5 - 2.5}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationName: "star",
              animationDuration: "1.3s",
              animationTimingFunction: "ease-in-out",
              animationDelay: `${s.delay}s`,
              animationFillMode: "forwards",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes letterAppear {
          0% { opacity:0; transform:translateY(60px) scale(0.8) rotate(10deg); filter:blur(10px); }
          60%{ opacity:0.8; transform:translateY(-8px) scale(1.05) rotate(-5deg); filter:blur(3px);}
          100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0);}
        }
        @keyframes star {
          0% {opacity:0; transform:scale(0);}
          40%{opacity:1; transform:scale(1.4) translateY(-20px);}
          100%{opacity:0; transform:scale(0) translateY(-60px);}
        }
        @keyframes soft-pulse {
          0%,100%{opacity:0.4;transform:scale(1);}
          50%{opacity:0.7;transform:scale(1.05);}
        }
        .animate-soft-pulse { animation:soft-pulse 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
