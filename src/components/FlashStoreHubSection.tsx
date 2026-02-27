import React, { useState, useEffect } from "react";

const HUBS = [
  { id: 1, angle: 315, label: "Sector 7\nMicro-Hub", time: "8 min" },
  { id: 2, angle: 0, label: "Kothrud\nMicro-Hub", time: "12 min" },
  { id: 3, angle: 45, label: "Baner\nMicro-Hub", time: "6 min" },
  { id: 4, angle: 135, label: "Wakad\nMicro-Hub", time: "10 min" },
  { id: 5, angle: 180, label: "Nigdi\nMicro-Hub", time: "15 min" },
  { id: 6, angle: 225, label: "Chinchwad\nMicro-Hub", time: "9 min" },
];

function polarToXY(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
}

export default function FlashStoreHubSection() {
  const [activeHub, setActiveHub] = useState<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const radius = 33;

  useEffect(() => {
    const newParticles = HUBS.map((hub, i) => {
      const pos = polarToXY(hub.angle, radius);
      return { id: i, x: pos.x, y: pos.y, progress: (i * 16) % 100 };
    });
    setParticles(newParticles);
    const interval = setInterval(() => {
      setParticles((prev) => prev.map((p) => ({ ...p, progress: (p.progress + 0.8) % 100 })));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          background: "white",
          borderRadius: 24,
          border: "1.5px solid #EFEFED",
          padding: 20,
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "1px", textTransform: "uppercase" }}>
            Your City's Storage Network
          </span>
        </div>

        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "auto" }}>
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF5F0" />
              <stop offset="100%" stopColor="#FAFAF8" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="50" cy="50" r="42" fill="none" stroke="#F0EDE8" strokeWidth="0.3" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="33" fill="none" stroke="#F0EDE8" strokeWidth="0.3" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#FFE0D0" strokeWidth="0.4" strokeDasharray="1 3" />

          {/* Connecting lines */}
          {HUBS.map((hub) => {
            const pos = polarToXY(hub.angle, radius);
            return (
              <line
                key={hub.id}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke={activeHub === hub.id ? "#FF6B35" : "#E8DDD5"}
                strokeWidth={activeHub === hub.id ? "0.8" : "0.5"}
                strokeDasharray="1.5 1.5"
                style={{ transition: "stroke 0.3s" }}
              />
            );
          })}

          {/* Animated particles */}
          {particles.map((p) => {
            const hub = HUBS[p.id];
            const endPos = polarToXY(hub.angle, radius);
            const t = p.progress / 100;
            const px = 50 + (endPos.x - 50) * t;
            const py = 50 + (endPos.y - 50) * t;
            return <circle key={p.id} cx={px} cy={py} r="0.8" fill="#FF6B35" opacity={0.6 - t * 0.3} />;
          })}

          {/* Micro-Hub nodes */}
          {HUBS.map((hub) => {
            const pos = polarToXY(hub.angle, radius);
            const isActive = activeHub === hub.id;
            return (
              <g
                key={hub.id}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveHub(isActive ? null : hub.id)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? "8" : "6.5"}
                  fill={isActive ? "#FFF0EB" : "white"}
                  stroke={isActive ? "#FF6B35" : "#4A90D9"}
                  strokeWidth={isActive ? "0.8" : "0.6"}
                  style={{ transition: "all 0.3s" }}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? "8.5" : "7"}
                  fill="none"
                  stroke={isActive ? "#FF6B35" : "#4A90D9"}
                  strokeWidth="0.3"
                  opacity="0.4"
                />
                <polygon
                  points={`${pos.x},${pos.y - 3} ${pos.x - 2.5},${pos.y - 0.5} ${pos.x + 2.5},${pos.y - 0.5}`}
                  fill={isActive ? "#FF6B35" : "#4A90D9"}
                  opacity="0.8"
                />
                <rect
                  x={pos.x - 2}
                  y={pos.y - 0.5}
                  width="4"
                  height="3"
                  rx="0.3"
                  fill={isActive ? "#FF6B35" : "#4A90D9"}
                  opacity="0.6"
                />

                <rect x={pos.x - 5} y={pos.y + 7} width="10" height="4" rx="2" fill={isActive ? "#FF6B35" : "#4A90D9"} opacity={isActive ? 1 : 0.85} />
                <text x={pos.x} y={pos.y + 10.2} textAnchor="middle" fontSize="2.5" fill="white" fontWeight={700}>
                  {hub.time}
                </text>
              </g>
            );
          })}

          {/* Central Mega-Hub */}
          <g>
            <circle cx="50" cy="50" r="13" fill="#FFF5F0" stroke="#FF6B35" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="14.5" fill="none" stroke="#FF6B35" strokeWidth="0.3" opacity="0.4" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            <polygon points="50,40 60,45 60,54 50,59 40,54 40,45" fill="#FF6B35" opacity="0.12" stroke="#FF6B35" strokeWidth="0.8" />
            <path d="M44 49 L50 44 L56 49" fill="#FF6B35" opacity="0.5" />
            <rect x="46" y="49" width="8" height="8" rx="0.5" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="0.5" />
            <rect x="48.5" y="52" width="3" height="5" rx="0.3" fill="#FF6B35" opacity="0.7" />

            <text x="50" y="66" textAnchor="middle" fontSize="2.8" fill="#FF6B35" fontWeight={800}>
              MEGA-HUB
            </text>
            <text x="50" y="69.5" textAnchor="middle" fontSize="2.2" fill="#999" fontWeight={600}>
              Cold Storage
            </text>
          </g>

          <style>{`@keyframes pulse {0%,100%{r:14;opacity:0.5;}50%{r:16;opacity:0.1;}}`}</style>
        </svg>

        {activeHub ? (
          <div
            style={{
              margin: "0 8px 8px",
              background: "#FFF5F0",
              border: "1px solid #FFD6C4",
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A" }}>{HUBS.find((h) => h.id === activeHub)?.label.replace('\n', ' ')}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Cache • Flash Items Ready</div>
            </div>
            <div style={{ background: "#FF6B35", color: "white", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
              ⚡ {HUBS.find((h) => h.id === activeHub)?.time}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: 11, color: "#AAA", margin: "0 0 8px" }}>Tap a Micro-Hub to see delivery time</p>
        )}
      </div>
    </div>
  );
}
