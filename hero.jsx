import { useState, useEffect, useRef } from "react";

const HUBS = [
  { id: 1, angle: 315, label: "Sector 7\nMicro-Hub", time: "8 min" },
  { id: 2, angle: 0,   label: "Kothrud\nMicro-Hub", time: "12 min" },
  { id: 3, angle: 45,  label: "Baner\nMicro-Hub", time: "6 min" },
  { id: 4, angle: 135, label: "Wakad\nMicro-Hub", time: "10 min" },
  { id: 5, angle: 180, label: "Nigdi\nMicro-Hub", time: "15 min" },
  { id: 6, angle: 225, label: "Chinchwad\nMicro-Hub", time: "9 min" },
];

function polarToXY(angle, radius) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
}

function WarehouseIcon({ size = 32, color = "#FF6B35", glowColor = "#FF6B35" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <filter id={`glow-${color.replace('#','')}`}>
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect x="6" y="18" width="28" height="16" rx="1.5" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <polygon points="4,18 20,8 36,18" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5"/>
      <rect x="14" y="24" width="6" height="10" rx="1" fill={color} opacity="0.5"/>
      <rect x="22" y="24" width="5" height="6" rx="1" fill={color} opacity="0.4"/>
      <circle cx="20" cy="14" r="2" fill={color}/>
    </svg>
  );
}

function MicroHubIcon({ size = 24, color = "#4A90D9" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="16" width="22" height="12" rx="1" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <polygon points="3,16 16,7 29,16" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5"/>
      <rect x="11" y="20" width="4" height="8" rx="1" fill={color} opacity="0.5"/>
      <rect x="17" y="20" width="4" height="5" rx="1" fill={color} opacity="0.35"/>
    </svg>
  );
}

export default function FlashStoreHubSection() {
  const [activeHub, setActiveHub] = useState(null);
  const [pulse, setPulse] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = HUBS.map((hub, i) => {
      const pos = polarToXY(hub.angle, 33);
      return { id: i, x: pos.x, y: pos.y, progress: (i * 16) % 100 };
    });
    setParticles(newParticles);
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        progress: (p.progress + 0.8) % 100
      })));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const radius = 33;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#FAFAF8" }}>
      {/* Logo */}
      <div style={{
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: "1px solid #EFEFED"
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="#FF6B35"/>
          <polygon points="18,6 30,13 30,23 18,30 6,23 6,13" fill="white" opacity="0.15"/>
          <path d="M18 8 L28 14 L28 22 L18 28 L8 22 L8 14 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
          <path d="M14 17 L17 20 L22 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 18 L18 9 L26 18" fill="white" opacity="0.2"/>
        </svg>
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.5px" }}>
          Flash<span style={{ color: "#FF6B35" }}>Store</span>
        </span>
        <span style={{
          marginLeft: "8px",
          fontSize: "10px",
          fontWeight: 600,
          color: "#FF6B35",
          background: "#FFF0EB",
          padding: "2px 8px",
          borderRadius: "20px",
          border: "1px solid #FFD6C4",
          letterSpacing: "0.5px"
        }}>PHYSICAL CLOUD</span>
      </div>

      {/* Hero */}
      <div style={{
        padding: "60px 40px 40px",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center"
      }}>
        {/* Left Text */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#FFF0EB",
            border: "1px solid #FFD6C4",
            borderRadius: "20px",
            padding: "5px 12px",
            marginBottom: "20px"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6B35", display: "inline-block" }}/>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#FF6B35", letterSpacing: "0.3px" }}>10-MINUTE FLASH RETRIEVAL</span>
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            color: "#1A1A1A",
            lineHeight: 1.1,
            margin: "0 0 20px",
            letterSpacing: "-1.5px"
          }}>
            Cloud Storage<br/>
            <span style={{ color: "#FF6B35" }}>for Your Home.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.7, margin: "0 0 32px", maxWidth: "420px" }}>
            A city-wide network of Micro-Hubs keeps your most-needed items nearby. One tap and it's at your door in minutes — not hours.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button style={{
              background: "#FF6B35",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,107,53,0.35)"
            }}>Get Started →</button>
            <button style={{
              background: "white",
              color: "#1A1A1A",
              border: "1.5px solid #E5E5E0",
              padding: "14px 28px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer"
            }}>Watch How It Works</button>
          </div>
          <div style={{ display: "flex", gap: "24px", marginTop: "36px" }}>
            {[["Fully Insured","🛡️"], ["App Controlled","📱"], ["10-Min Delivery","⚡"]].map(([label, icon]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#888" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Network Diagram */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "white",
            borderRadius: "24px",
            border: "1.5px solid #EFEFED",
            padding: "20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            overflow: "hidden"
          }}>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "1px", textTransform: "uppercase" }}>Your City's Storage Network</span>
            </div>

            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "auto" }}>
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF5F0"/>
                  <stop offset="100%" stopColor="#FAFAF8"/>
                </radialGradient>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Background circles */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F0EDE8" strokeWidth="0.3" strokeDasharray="1 2"/>
              <circle cx="50" cy="50" r="33" fill="none" stroke="#F0EDE8" strokeWidth="0.3" strokeDasharray="1 2"/>
              <circle cx="50" cy="50" r="18" fill="none" stroke="#FFE0D0" strokeWidth="0.4" strokeDasharray="1 3"/>

              {/* Connecting lines */}
              {HUBS.map(hub => {
                const pos = polarToXY(hub.angle, radius);
                return (
                  <line
                    key={hub.id}
                    x1="50" y1="50"
                    x2={pos.x} y2={pos.y}
                    stroke={activeHub === hub.id ? "#FF6B35" : "#E8DDD5"}
                    strokeWidth={activeHub === hub.id ? "0.8" : "0.5"}
                    strokeDasharray="1.5 1.5"
                    style={{ transition: "stroke 0.3s" }}
                  />
                );
              })}

              {/* Animated particles on lines */}
              {particles.map(p => {
                const hub = HUBS[p.id];
                const endPos = polarToXY(hub.angle, radius);
                const t = p.progress / 100;
                const px = 50 + (endPos.x - 50) * t;
                const py = 50 + (endPos.y - 50) * t;
                return (
                  <circle key={p.id} cx={px} cy={py} r="0.8" fill="#FF6B35" opacity={0.6 - t * 0.3}/>
                );
              })}

              {/* Micro-Hub nodes */}
              {HUBS.map(hub => {
                const pos = polarToXY(hub.angle, radius);
                const isActive = activeHub === hub.id;
                return (
                  <g key={hub.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveHub(isActive ? null : hub.id)}
                  >
                    <circle cx={pos.x} cy={pos.y} r={isActive ? "8" : "6.5"}
                      fill={isActive ? "#FFF0EB" : "white"}
                      stroke={isActive ? "#FF6B35" : "#4A90D9"}
                      strokeWidth={isActive ? "0.8" : "0.6"}
                      style={{ transition: "all 0.3s" }}
                    />
                    <circle cx={pos.x} cy={pos.y} r={isActive ? "8.5" : "7"}
                      fill="none"
                      stroke={isActive ? "#FF6B35" : "#4A90D9"}
                      strokeWidth="0.3"
                      opacity="0.4"
                    />
                    {/* Tiny house icon */}
                    <polygon
                      points={`${pos.x},${pos.y - 3} ${pos.x - 2.5},${pos.y - 0.5} ${pos.x + 2.5},${pos.y - 0.5}`}
                      fill={isActive ? "#FF6B35" : "#4A90D9"}
                      opacity="0.8"
                    />
                    <rect x={pos.x - 2} y={pos.y - 0.5} width="4" height="3" rx="0.3"
                      fill={isActive ? "#FF6B35" : "#4A90D9"}
                      opacity="0.6"
                    />

                    {/* Time badge */}
                    <rect x={pos.x - 5} y={pos.y + 7} width="10" height="4" rx="2"
                      fill={isActive ? "#FF6B35" : "#4A90D9"}
                      opacity={isActive ? 1 : 0.85}
                    />
                    <text x={pos.x} y={pos.y + 10.2}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="white"
                      fontWeight="700"
                    >{hub.time}</text>
                  </g>
                );
              })}

              {/* Central Mega-Hub */}
              <g>
                <circle cx="50" cy="50" r="13" fill="#FFF5F0" stroke="#FF6B35" strokeWidth="0.8"/>
                <circle cx="50" cy="50" r="14.5" fill="none" stroke="#FF6B35" strokeWidth="0.3" opacity="0.4"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                {/* Warehouse shape */}
                <polygon points="50,40 60,45 60,54 50,59 40,54 40,45" fill="#FF6B35" opacity="0.12" stroke="#FF6B35" strokeWidth="0.8"/>
                <path d="M44 49 L50 44 L56 49" fill="#FF6B35" opacity="0.5"/>
                <rect x="46" y="49" width="8" height="8" rx="0.5" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="0.5"/>
                <rect x="48.5" y="52" width="3" height="5" rx="0.3" fill="#FF6B35" opacity="0.7"/>

                <text x="50" y="66" textAnchor="middle" fontSize="2.8" fill="#FF6B35" fontWeight="800">MEGA-HUB</text>
                <text x="50" y="69.5" textAnchor="middle" fontSize="2.2" fill="#999" fontWeight="600">Cold Storage</text>
              </g>

              <style>{`
                @keyframes pulse {
                  0%, 100% { r: 14; opacity: 0.5; }
                  50% { r: 16; opacity: 0.1; }
                }
              `}</style>
            </svg>

            {activeHub && (
              <div style={{
                margin: "0 8px 8px",
                background: "#FFF5F0",
                border: "1px solid #FFD6C4",
                borderRadius: "10px",
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1A1A1A" }}>
                    {HUBS.find(h => h.id === activeHub)?.label.replace('\n', ' ')}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Cache • Flash Items Ready</div>
                </div>
                <div style={{
                  background: "#FF6B35",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 800
                }}>⚡ {HUBS.find(h => h.id === activeHub)?.time}</div>
              </div>
            )}

            {!activeHub && (
              <p style={{ textAlign: "center", fontSize: "11px", color: "#AAA", margin: "0 0 8px" }}>
                Tap a Micro-Hub to see delivery time
              </p>
            )}
          </div>
        </div>
      </div>

      {/* How It Works Reimagined */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 60px",
        padding: "0 40px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#FF6B35", letterSpacing: "1.5px", textTransform: "uppercase" }}>THE SYSTEM</span>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1A1A1A", marginTop: "8px", letterSpacing: "-1px" }}>
            Two-tier storage network
          </h2>
          <p style={{ color: "#888", fontSize: "15px", maxWidth: "480px", margin: "12px auto 0" }}>
            A Mega-Hub holds everything cold. Micro-Hubs cache your most-requested items close to you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "20px", alignItems: "center" }}>
          {/* Mega Hub card */}
          <div style={{
            background: "white",
            border: "1.5px solid #EFEFED",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "#FFF0EB", border: "1.5px solid #FFD6C4",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "16px", fontSize: "22px"
            }}>🏭</div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1A1A1A", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Mega-Hub</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, margin: "0 0 16px" }}>
              Main warehouse — climate controlled, insured, holds all your items long-term.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Cold Storage", "All Items", "2–4hr Delivery"].map(tag => (
                <span key={tag} style={{
                  fontSize: "11px", fontWeight: 600, color: "#FF6B35",
                  background: "#FFF0EB", padding: "3px 10px", borderRadius: "20px",
                  border: "1px solid #FFD6C4"
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "#F5F3F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", margin: "0 auto 6px"
            }}>⇄</div>
            <span style={{ fontSize: "10px", fontWeight: 600, color: "#BBB", letterSpacing: "0.5px" }}>SYNC</span>
          </div>

          {/* Micro Hub card */}
          <div style={{
            background: "white",
            border: "1.5px solid #EFEFED",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "#EBF4FF", border: "1.5px solid #C4D9FF",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "16px", fontSize: "22px"
            }}>🏪</div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1A1A1A", margin: "0 0 8px", letterSpacing: "-0.5px" }}>Micro-Hubs</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, margin: "0 0 16px" }}>
              Local cache points scattered across your city — hold your most-requested items for instant dispatch.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Cache", "Flash Items", "10–60 min"].map(tag => (
                <span key={tag} style={{
                  fontSize: "11px", fontWeight: 600, color: "#4A90D9",
                  background: "#EBF4FF", padding: "3px 10px", borderRadius: "20px",
                  border: "1px solid #C4D9FF"
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}