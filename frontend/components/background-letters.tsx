"use client";
import { useEffect, useState } from "react";

const EFFECT_TYPES = [
  "spark",
  "flash",
  "wave",
  "star",
  "petal",
  "thunder",
  "fire",
  "ember",
  "glow",
  "rain",
] as const;

type EffectType = typeof EFFECT_TYPES[number];

interface Letter {
  id: string;
  char: string;
  x: number;
  y: number;
  size: number;
  color: string;
  floatType: string;
  delay: number;
}

interface Effect {
  id: string;
  x: number;
  y: number;
  color: string;
  type: EffectType;
  angle?: number;
  delay?: number;
  z?: number;
}

const LANGUAGES = {
  hindi: ["क", "ख", "ग", "घ", "च", "छ", "ज", "झ"],
  telugu: ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఎ", "ఏ"],
  english: ["A", "B", "C", "D", "E", "F", "G", "H"],
  chinese: ["中", "国", "文", "字", "书", "写", "语", "言"],
};

const COLORS = [
  "#fbbf24", "#f59e0b", "#a78bfa", "#f87171", "#facc15",
  "#fb923c", "#ffffff", "#fef9c3", "#fbcfe8", "#eab308",
  "#38bdf8", "#22c55e", "#f472b6",
];

export default function BackgroundLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [effects, setEffects] = useState<Effect[]>([]);

  const uid = () =>
    (typeof crypto !== "undefined" && "randomUUID" in crypto)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  useEffect(() => {
    const makeLetters = () => {
      const all = [
        ...LANGUAGES.hindi,
        ...LANGUAGES.telugu,
        ...LANGUAGES.english,
        ...LANGUAGES.chinese,
      ];
      const floats = ["floatDrift", "floatWave", "floatSpin", "floatRise"];
      return Array.from({ length: 14 }, () => ({
        id: uid(),
        char: all[Math.floor(Math.random() * all.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 24 + Math.random() * 48,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        floatType: floats[Math.floor(Math.random() * floats.length)],
        delay: Math.random() * 5,
      }));
    };

    setLetters(makeLetters());

    const interval = setInterval(() => {
      setLetters((prev) => {
        const copy = [...prev];
        const removed = copy.splice(Math.floor(Math.random() * copy.length), 1)[0];
        if (removed) triggerExplosion(removed);
        return [...copy, ...makeLetters().slice(0, 1)];
      });
    }, 2800);

    const thunderInterval = setInterval(() => triggerGlobalEffect("thunder"), 5000);
    const fireInterval = setInterval(() => {
      triggerGlobalEffect("fire");
      triggerGlobalEffect("ember");
    }, 3500);
    const rainInterval = setInterval(() => triggerGlobalEffect("rain"), 1800);

    return () => {
      clearInterval(interval);
      clearInterval(thunderInterval);
      clearInterval(fireInterval);
      clearInterval(rainInterval);
    };
  }, []);

  function triggerGlobalEffect(type: EffectType) {
    const newEffects: Effect[] = [];
    const count =
      type === "thunder" ? 3 : type === "rain" ? 25 : type === "fire" ? 10 : 12;

    for (let i = 0; i < count; i++) {
      newEffects.push({
        id: uid(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
        angle: Math.random() * 360,
        delay: Math.random() * 0.4,
      });
    }

    setEffects((p) => [...p, ...newEffects]);
    setTimeout(
      () => setEffects((p) => p.filter((s) => !newEffects.find((n) => n.id === s.id))),
      2500
    );
  }

  function triggerExplosion(letter: Letter) {
    const newEffects: Effect[] = [];
    for (let i = 0; i < 18; i++) {
      const type = EFFECT_TYPES[Math.floor(Math.random() * EFFECT_TYPES.length)];
      newEffects.push({
        id: uid(),
        x: letter.x + Math.random() * 3 - 1.5,
        y: letter.y + Math.random() * 3 - 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
        angle: Math.random() * 360,
        delay: Math.random() * 0.3,
      });
    }
    setEffects((p) => [...p, ...newEffects]);
    setTimeout(
      () => setEffects((p) => p.filter((s) => !newEffects.find((n) => n.id === s.id))),
      2300
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Storm Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 via-purple-900/20 to-black animate-ambientPulse"></div>

      {letters.map((l) => (
        <div
          key={l.id}
          className="absolute font-extrabold opacity-0"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            fontSize: `${l.size}px`,
            color: l.color,
            textShadow: `0 0 20px ${l.color}AA, 0 0 40px ${l.color}55`,
            animationName: `fadeGlow, ${l.floatType}, hueRotate, shine`,
            animationDuration: `10s, 20s, 25s, 4s`,
            animationTimingFunction: `ease-in-out, ease-in-out, linear, ease-in-out`,
            animationDelay: `${l.delay}s, ${l.delay}s, 0s, ${Math.random() * 3}s`,
            animationIterationCount: "infinite, infinite, infinite, infinite",
            animationFillMode: "forwards",
          }}
        >
          {l.char}
        </div>
      ))}

      {effects.map((e) => (
        <div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            background: e.color,
            width: e.type === "rain" ? "1px" : "6px",
            height: e.type === "rain" ? "40px" : "6px",
            boxShadow:
              e.type === "fire"
                ? `0 0 30px #ff7700, 0 0 80px #ff3300`
                : e.type === "ember"
                ? `0 0 12px #ff6600aa`
                : e.type === "thunder"
                ? `0 0 60px #ffffff`
                : e.type === "rain"
                ? `0 0 12px #60a5fa55`
                : `0 0 25px ${e.color}`,
            animation:
              e.type === "fire"
                ? "fireExplosion 1.8s ease-out forwards"
                : e.type === "ember"
                ? "emberRise 2.4s ease-out forwards"
                : e.type === "thunder"
                ? "flashThunder 0.9s ease-out forwards"
                : e.type === "rain"
                ? "rainFall 2s linear forwards"
                : "sparkFire 1.5s ease-out forwards",
            transform:
              e.type === "rain"
                ? "rotate(15deg)"
                : `rotate(${e.angle ?? 0}deg) scale(${0.8 + Math.random() * 1.2})`,
            opacity: 0.9,
          }}
        />
      ))}

      <style>{`
        @keyframes fadeGlow {0%{opacity:0;transform:scale(0.8) translateY(40px);}60%{opacity:1;}100%{opacity:0;transform:scale(1.1) translateY(-40px);}}
        @keyframes hueRotate {0%{filter:hue-rotate(0deg);}50%{filter:hue-rotate(180deg);}100%{filter:hue-rotate(360deg);}}
        @keyframes shine {0%,100%{text-shadow:0 0 10px rgba(255,255,255,0.3);}50%{text-shadow:0 0 25px rgba(255,255,255,0.9);}}
        @keyframes floatDrift {0%{transform:translate(0,0);}50%{transform:translate(-25px,-50px);}100%{transform:translate(0,0);}}
        @keyframes floatWave {0%,100%{transform:translateY(0);}50%{transform:translateY(-50px);}}
        @keyframes floatSpin {0%{transform:rotate(0deg);}50%{transform:rotate(180deg);}100%{transform:rotate(360deg);}}
        @keyframes floatRise {0%{transform:translateY(60px);}50%{transform:translateY(-60px);}100%{transform:translateY(60px);}}
        @keyframes fireExplosion {0%{opacity:1;transform:scale(0.8);}30%{filter:blur(1px);}100%{opacity:0;transform:scale(3) translate(20px,-20px);filter:blur(3px);}}
        @keyframes emberRise {0%{opacity:1;}100%{opacity:0;transform:translateY(-80px) scale(0.6);filter:blur(2px);}}
        @keyframes flashThunder {0%{opacity:1;box-shadow:0 0 100px #fff;}100%{opacity:0;transform:scaleY(0.6);}}
        @keyframes rainFall {0%{opacity:0.6;transform:translate(0,0);}100%{opacity:0;transform:translate(-20px,100vh);}}
        @keyframes sparkFire {0%{opacity:1;}100%{opacity:0;transform:translate(60px,-60px) scale(0.3);}}
        @keyframes ambientPulse {0%,100%{opacity:0.3;}50%{opacity:0.8;filter:brightness(1.2);}}
      `}</style>
    </div>
  );
}
