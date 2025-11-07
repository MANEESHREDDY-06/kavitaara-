"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ArrowRight } from "lucide-react"

const poetryFacts = [
  "Poetry has been a form of human expression for over 4,000 years, dating back to ancient Sumeria.",
  "The oldest known poem is 'The Epic of Gilgamesh', written around 2100 BCE.",
  "Shakespeare invented over 1,700 words that are still used in English today through his poetry and plays.",
  "Haiku poetry originated in 17th century Japan and consists of only 17 syllables.",
  "Poetry improves memory and cognitive function by engaging multiple parts of the brain.",
  "Pablo Neruda wrote 'Twenty Love Poems and a Song of Despair' and became one of the most influential poets of the 20th century.",
  "Emily Dickinson wrote nearly 1,800 poems but only a dozen were published during her lifetime.",
]

export default function LandingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"welcome" | "about">("welcome")
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [randomFact, setRandomFact] = useState(poetryFacts[0])
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * poetryFacts.length)
    setRandomFact(poetryFacts[randomIndex])
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    setActiveTab("about")
    setTimeout(() => {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleProceed = () => {
    router.push("/auth")
  }

  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle glass-edge-linear mesh */}
        <div className="absolute inset-0 bg-[radial-linear(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-linear(ellipse_80%_80%_at_80%_80%,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>

        {/* Animated orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <nav
          className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5 transition-all duration-300"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              WELCOME TO KAVITAARA
            </h1>
            <div className="flex gap-12 items-center">
              <button
                onClick={() => setActiveTab("welcome")}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  activeTab === "welcome" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Home
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-slate-400 to-slate-300 group-hover:w-full transition-all duration-300 ${
                    activeTab === "welcome" ? "w-full" : ""
                  }`}
                ></span>
              </button>
              <button
                onClick={scrollToAbout}
                className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-300 flex items-center gap-2 group"
              >
                About
                <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </nav>

        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl w-full text-center space-y-12 animate-fadeIn">
            {/* Headline */}
            <div className="space-y-6">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white text-balance leading-tight">
                Poetry for
                <br />
                <span className="bg-linear-to-r from-slate-300 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Everyone
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-slate-300 text-balance mx-auto max-w-2xl font-light leading-relaxed">
                Create. Share. Connect. Transform your poetry with AI. Express yourself through every language and form.
              </p>
            </div>

            <div className="group relative mx-auto max-w-xl">
              <div className="absolute -inset-1 bg-linear-to-r from-slate-400/20 via-slate-300/20 to-slate-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 group-hover:bg-white/8 group-hover:border-white/20 transition-all duration-500">
                <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Did You Know</p>
                <p className="text-lg text-slate-100 font-light leading-relaxed">{randomFact}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={handleProceed}
                className="group relative px-8 py-4 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 sm:gap-2"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToAbout}
                className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center px-6 py-24 border-t border-white/5"
        >
          <div className="max-w-7xl w-full space-y-20">
            {/* Section header */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h3 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                About
                <br />
                <span className="bg-linear-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
                  Kavitaara
                </span>
              </h3>
              <p className="text-lg text-slate-300 font-light">
                A modern platform for poets to connect, create, and celebrate the timeless art of expression.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "01",
                  title: "Social Connection",
                  desc: "Share your poetry, build your audience, and engage with a vibrant community of fellow poets and enthusiasts.",
                },
                {
                  number: "02",
                  title: "AI Translation",
                  desc: "Translate your work across languages while preserving the essence and beauty of your original composition.",
                },
                {
                  number: "03",
                  title: "Style Conversion",
                  desc: "Transform your poetry between different forms — from haiku to sonnets, free verse to structured styles.",
                },
                {
                  number: "04",
                  title: "Collaborate & Grow",
                  desc: "Connect with other creators, join writing challenges, and grow your craft through meaningful interaction.",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-linear-to-br from-slate-400/10 to-slate-300/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 group-hover:bg-white/8 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col justify-between">
                    <div>
                      <p className="text-5xl font-bold text-slate-400/30 mb-6 group-hover:text-slate-300/50 transition-colors">
                        {feature.number}
                      </p>
                      <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                      <p className="text-slate-300 font-light leading-relaxed">{feature.desc}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-slate-300 to-slate-400 group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="relative group text-center space-y-8 pt-12">
              <div className="absolute -inset-1 bg-linear-to-r from-slate-400/20 via-slate-300/20 to-slate-400/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4">Ready to start?</h3>
                <p className="text-lg text-slate-300 font-light mb-8">
                  Join poets from around the world on your creative journey.
                </p>
                <button
                  onClick={handleProceed}
                  className="group/btn px-8 py-4 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                >
                  <span>Join Now</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/50 backdrop-blur">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-slate-400 text-sm">
              <p>Kavitaara • Celebrating Poetry & Connection</p>
              <div className="flex gap-8">
                <button className="hover:text-slate-200 transition-colors">About</button>
                <button className="hover:text-slate-200 transition-colors">Privacy</button>
                <button className="hover:text-slate-200 transition-colors">Terms</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
