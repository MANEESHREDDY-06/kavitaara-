"use client";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* 🌌 Cosmic Background */}
      <div className="absolute inset-0 bg-linear
      -to-br from-indigo-950 via-black to-purple-950 animate-ambientPulse"></div>

      {/* 🌞 Smaller Sun with Explosion Cycle */}
      <div
        className="absolute animate-sunCycle"
        style={{
          right: "10%",
          top: "38%",
          width: "160px", // 🔥 smaller sun size
          height: "160px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #fff7b2, #fde047, #f59e0b, #b45309 80%)",
          boxShadow: `
            0 0 40px #fde68a,
            0 0 80px #fbbf24,
            0 0 140px #f59e0b,
            0 0 220px #fcd34d55
          `,
          filter: "blur(0.3px)",
        }}
      >
        {/* Inner plasma swirl */}
        <div
          className="absolute inset-0 rounded-full animate-plasmaRotate"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0.3), rgba(255,255,0,0.2), rgba(255,120,0,0.3), rgba(255,255,255,0.3))",
            filter: "blur(4px)",
          }}
        />

        {/* Outer flares */}
        <div
          className="absolute inset-[-30px] rounded-full animate-flareShockwave"
          style={{
            border: "2px solid rgba(255,200,50,0.25)",
            filter: "blur(6px)",
          }}
        />
        <div
          className="absolute inset-[-60px] rounded-full animate-flareShockwaveDelay"
          style={{
            border: "2px solid rgba(255,180,0,0.1)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* ✨ Floating space particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-spaceDrift"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: "white",
            opacity: Math.random() * 0.4 + 0.3,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      <style>{`
        /* 🌌 Background soft pulse */
        @keyframes ambientPulse {
          0%,100% { opacity: 0.3; filter: brightness(1); }
          50% { opacity: 0.7; filter: brightness(1.2); }
        }
        .animate-ambientPulse {
          animation: ambientPulse 20s ease-in-out infinite;
        }

        /* 🌞 Sun brightening → explosion → reset */
        @keyframes sunCycle {
          0% {
            transform: scale(1);
            filter: brightness(1);
            box-shadow:
              0 0 40px #fbbf24,
              0 0 80px #f59e0b,
              0 0 120px #f59e0b;
          }
          60% {
            transform: scale(1.1);
            filter: brightness(1.6);
            box-shadow:
              0 0 60px #fde68a,
              0 0 140px #fbbf24,
              0 0 200px #f59e0b;
          }
          75% {
            transform: scale(1.4);
            filter: brightness(3);
            box-shadow:
              0 0 200px #fff,
              0 0 400px #fcd34d,
              0 0 600px #fbbf24;
          }
          80% {
            transform: scale(1.8);
            filter: brightness(0.5);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
            opacity: 1;
          }
        }
        .animate-sunCycle {
          animation: sunCycle 15s ease-in-out infinite;
        }

        /* 🔄 Plasma rotation */
        @keyframes plasmaRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-plasmaRotate {
          animation: plasmaRotate 30s linear infinite;
        }

        /* 💥 Shockwave effects */
        @keyframes flareShockwave {
          0% { transform: scale(1); opacity: 0; }
          60% { opacity: 0; }
          75% { transform: scale(1); opacity: 1; }
          90% { transform: scale(2); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-flareShockwave {
          animation: flareShockwave 15s ease-in-out infinite;
        }

        @keyframes flareShockwaveDelay {
          0%,70% { opacity: 0; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-flareShockwaveDelay {
          animation: flareShockwaveDelay 15s ease-in-out infinite;
        }

        /* 🌠 Floating stars */
        @keyframes spaceDrift {
          0% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(20px); opacity: 0.8; }
          100% { transform: translateY(0px); opacity: 0.4; }
        }
        .animate-spaceDrift {
          animation: spaceDrift 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
