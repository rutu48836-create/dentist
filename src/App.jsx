import { useState, useEffect, useRef } from "react";

const theme = {
  saffron: "#C8510A",
  saffronLight: "#E8722A",
  saffronPale: "#FDF0E8",
  earth: "#3D2B1F",
  earthLight: "#6B4C3B",
  cream: "#FAF6F0",
  gold: "#C9973A",
  goldLight: "#F5D78E",
  sage: "#5C7A5E",
  terracotta: "#B85C38",
  white: "#FFFFFF",
  offWhite: "#F7F3ED",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
`;

const globalStyles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { 
  font-family: 'DM Sans', sans-serif; 
  background: ${theme.cream}; 
  color: ${theme.earth}; 
  overflow-x: hidden;
}
.display { font-family: 'Cinzel', serif; }
.serif { font-family: 'Cormorant Garamond', serif; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideRight {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  20% { transform: translate(3%, 2%); }
  30% { transform: translate(-1%, 4%); }
  40% { transform: translate(2%, -1%); }
  50% { transform: translate(-3%, 3%); }
  60% { transform: translate(1%, -2%); }
  70% { transform: translate(-2%, 1%); }
  80% { transform: translate(3%, -3%); }
  90% { transform: translate(-1%, 2%); }
}

.nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.earthLight};
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
  padding: 4px 0;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  height: 1px; width: 0;
  background: ${theme.saffron};
  transition: width 0.3s ease;
}
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.nav-link:hover, .nav-link.active { color: ${theme.saffron}; }

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${theme.saffron};
  color: white;
  padding: 14px 32px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: ${theme.terracotta};
  transition: left 0.3s ease;
  z-index: 0;
}
.btn-primary:hover::before { left: 0; }
.btn-primary span { position: relative; z-index: 1; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: ${theme.saffron};
  padding: 13px 31px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid ${theme.saffron};
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-outline:hover { background: ${theme.saffron}; color: white; }

.section-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${theme.saffron};
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-label::before {
  content: '';
  display: block;
  width: 30px; height: 1px;
  background: ${theme.saffron};
}

.card-hover {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(61,43,31,0.15);
}

input, textarea, select {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: ${theme.earth};
  background: white;
  border: 1px solid #E0D5C8;
  padding: 14px 18px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease;
  border-radius: 0;
  -webkit-appearance: none;
}
input:focus, textarea:focus { border-color: ${theme.saffron}; }
input::placeholder, textarea::placeholder { color: #B0A090; }
`;

// ─── ICONS ────────────────────────────────────────────────
const Icon = {
  Menu: () => (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M0 6H14M14 6L9 1M14 6L9 11" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Location: () => (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M9 1C5.13 1 2 4.13 2 8C2 13.25 9 21 9 21C9 21 16 13.25 16 8C16 4.13 12.87 1 9 1ZM9 10.5C7.62 10.5 6.5 9.38 6.5 8C6.5 6.62 7.62 5.5 9 5.5C10.38 5.5 11.5 6.62 11.5 8C11.5 9.38 10.38 10.5 9 10.5Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.5 1H2C1.45 1 1 1.45 1 2C1 11.39 8.61 19 18 19C18.55 19 19 18.55 19 18V13.52C19 12.97 18.55 12.52 18 12.52C16.76 12.52 15.55 12.32 14.43 11.95C14.08 11.83 13.69 11.92 13.42 12.19L11.17 14.44C8.38 12.93 6.07 10.62 4.56 7.83L6.81 5.58C7.08 5.31 7.17 4.92 7.05 4.57C6.68 3.45 6.48 2.24 6.48 1C6.48 0.45 6.03 0 5.48 0L6.5 1Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <rect x="1" y="1" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 3L10 9L19 3" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Heart: () => (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M10 17C10 17 1 11.5 1 5.5C1 3.01 3.01 1 5.5 1C7.24 1 8.91 2 10 3.5C11.09 2 12.76 1 14.5 1C16.99 1 19 3.01 19 5.5C19 11.5 10 17 10 17Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Education: () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M11 1L1 6L11 11L21 6L11 1Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M4 8V15C4 15 7 19 11 19C15 19 18 15 18 15V8" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <line x1="21" y1="6" x2="21" y2="13" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Health: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1" y="1" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M11 7V15M7 11H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Rural: () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M1 19H21" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3 19V10L8 6L13 10V19" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M14 19V12H19V19" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M8 3C8 3 7 6 8 6C9 6 8 3 8 3Z" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Women: () => (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="9" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 12V18M6 15H12M9 18V23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Quote: () => (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <path d="M0 28V18C0 13.6 1.4 9.8 4.2 6.6C7.2 3.2 11 1 15.6 0L16.4 2.4C13.8 3.2 11.6 4.8 9.8 7.2C8.2 9.4 7.4 11.8 7.4 14.4H14V28H0ZM20 28V18C20 13.6 21.4 9.8 24.2 6.6C27.2 3.2 31 1 35.6 0L36 2.4C33.4 3.2 31.2 4.8 29.4 7.2C27.8 9.4 27 11.8 27 14.4H34V28H20Z" fill="currentColor"/>
    </svg>
  ),
};

// ─── DECORATIVE MANDALA SVG ────────────────────────────────
const MandalaSVG = ({ size = 300, opacity = 0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" style={{ opacity }}>
    <circle cx="150" cy="150" r="140" stroke={theme.saffron} strokeWidth="0.8"/>
    <circle cx="150" cy="150" r="120" stroke={theme.saffron} strokeWidth="0.5"/>
    <circle cx="150" cy="150" r="100" stroke={theme.saffron} strokeWidth="0.8"/>
    <circle cx="150" cy="150" r="80" stroke={theme.saffron} strokeWidth="0.5"/>
    <circle cx="150" cy="150" r="60" stroke={theme.saffron} strokeWidth="0.8"/>
    <circle cx="150" cy="150" r="30" stroke={theme.saffron} strokeWidth="0.5"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
      <g key={i} transform={`rotate(${a} 150 150)`}>
        <line x1="150" y1="10" x2="150" y2="290" stroke={theme.saffron} strokeWidth="0.3"/>
        <ellipse cx="150" cy="55" rx="6" ry="15" stroke={theme.saffron} strokeWidth="0.5" fill="none"/>
        <circle cx="150" cy="90" r="4" stroke={theme.saffron} strokeWidth="0.5"/>
      </g>
    ))}
    {[0,45,90,135,180,225,270,315].map((a, i) => (
      <g key={i} transform={`rotate(${a} 150 150)`}>
        <path d="M 150 110 Q 165 130 150 150 Q 135 130 150 110" stroke={theme.saffron} strokeWidth="0.6" fill="none"/>
      </g>
    ))}
    <circle cx="150" cy="150" r="10" fill={theme.saffron} opacity="0.3"/>
    <circle cx="150" cy="150" r="5" fill={theme.saffron} opacity="0.5"/>
  </svg>
);

// ─── LOTUS DECORATION ─────────────────────────────────────
const LotusSVG = ({ color = theme.saffron }) => (
  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
    <path d="M30 38 C30 38 10 30 10 15 C10 8 18 4 24 8 C26 9 28 11 30 14 C32 11 34 9 36 8 C42 4 50 8 50 15 C50 30 30 38 30 38Z" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M30 38 C30 38 20 28 18 18 C16 10 20 5 24 7 C27 8 29 12 30 16 C31 12 33 8 36 7 C40 5 44 10 42 18 C40 28 30 38 30 38Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"/>
    <line x1="30" y1="38" x2="30" y2="2" stroke={color} strokeWidth="1" opacity="0.4"/>
    <path d="M20 35 C20 35 15 25 15 20" stroke={color} strokeWidth="0.8" opacity="0.4"/>
    <path d="M40 35 C40 35 45 25 45 20" stroke={color} strokeWidth="0.8" opacity="0.4"/>
  </svg>
);

// ─── NAVBAR ───────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const pages = ["Home", "About", "Programs", "Impact", "Contact"];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: all 0.4s ease;
          padding: ${scrolled ? "14px 0" : "22px 0"};
          background: ${scrolled ? "rgba(250,246,240,0.97)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(12px)" : "none"};
          border-bottom: ${scrolled ? `1px solid rgba(200,81,10,0.1)` : "none"};
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo-mark {
          display: flex; align-items: center; gap: 14px; cursor: pointer;
        }
        .logo-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: ${theme.saffron};
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700;
          color: white; letter-spacing: -1px;
          flex-shrink: 0;
        }
        .logo-text { line-height: 1.2; }
        .logo-name {
          font-family: 'Cinzel', serif; font-size: 15px; font-weight: 600;
          color: ${theme.earth}; letter-spacing: 0.04em;
        }
        .logo-tagline {
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${theme.saffron}; font-weight: 400;
        }
        .nav-links {
          display: flex; align-items: center; gap: 36px;
        }
        .nav-cta {
          background: ${theme.saffron}; color: white;
          padding: 10px 22px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background 0.3s ease;
        }
        .nav-cta:hover { background: ${theme.terracotta}; }
        .hamburger {
          display: none; background: none; border: none;
          color: ${theme.earth}; cursor: pointer; padding: 4px;
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
        }
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: ${theme.cream}; z-index: 2000;
          display: flex; flex-direction: column;
          padding: 30px 40px;
        }
        .mobile-menu-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 60px;
        }
        .mobile-nav-links {
          display: flex; flex-direction: column; gap: 4px;
        }
        .mobile-nav-link {
          font-family: 'Cinzel', serif; font-size: 32px; font-weight: 400;
          color: ${theme.earth}; cursor: pointer;
          padding: 14px 0; border-bottom: 1px solid rgba(61,43,31,0.1);
          transition: color 0.2s; letter-spacing: 0.02em;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: ${theme.saffron}; }
      `}</style>
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo-mark" onClick={() => setPage("Home")}>
            <div className="logo-circle">MBP</div>
            <div className="logo-text">
              <div className="logo-name">MB Patil Foundation</div>
              <div className="logo-tagline">Health · Rural Dev · Education</div>
            </div>
          </div>
          <div className="nav-links">
            {pages.map(p => (
              <span key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{p}</span>
            ))}
            <button className="nav-cta" onClick={() => setPage("Contact")}>Donate</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(true)}><Icon.Menu /></button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div className="logo-mark">
              <div className="logo-circle">MBP</div>
              <div className="logo-text">
                <div className="logo-name">MB Patil Foundation</div>
              </div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: theme.earth }} onClick={() => setMenuOpen(false)}><Icon.Close /></button>
          </div>
          <div className="mobile-nav-links">
            {pages.map(p => (
              <div key={p} className={`mobile-nav-link ${page === p ? "active" : ""}`} onClick={() => { setPage(p); setMenuOpen(false); }}>{p}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${theme.earth} 0%, #5A3420 55%, ${theme.terracotta} 100%)`,
        position: "relative",
        display: "flex", alignItems: "center",
        overflow: "hidden",
        padding: "120px 40px 80px",
      }}>
        {/* grain overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
        {/* mandala bg */}
        <div style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.08 }}>
          <MandalaSVG size={600} opacity={1} />
        </div>
        <div style={{ position: "absolute", left: "-100px", bottom: "-100px", opacity: 0.05 }}>
          <MandalaSVG size={400} opacity={1} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680, animation: "fadeUp 0.9s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
              <div style={{ width: 40, height: 1, background: theme.goldLight }} />
              <span style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight }}>
                Est. 2025 · Nilanga, Maharashtra
              </span>
            </div>
            <h1 className="display" style={{
              fontSize: "clamp(46px, 7vw, 84px)", fontWeight: 400,
              color: "white", lineHeight: 1.05,
              letterSpacing: "-0.01em", marginBottom: 28,
            }}>
              Illuminating<br/>
              <em style={{ color: theme.goldLight, fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontWeight: 300, fontSize: "1.1em" }}>lives</em><br/>
              through service
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond'", fontSize: "clamp(17px, 2.5vw, 22px)",
              color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 44,
              fontWeight: 300,
            }}>
              Founded by Muktabai Balaji Patil, the MB Patil Foundation works tirelessly to uplift marginalized communities across Maharashtra through education, health, and rural empowerment.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => setPage("About")}>
                <span>Discover Our Work</span><span><Icon.Arrow /></span>
              </button>
              <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => setPage("Programs")}>
                <span>Our Programs</span>
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            position: "absolute", bottom: -80, right: 0,
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1, background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            minWidth: 440,
          }}>
            {[
              { val: "2500+", label: "Beneficiaries" },
              { val: "₹50 Cr", label: "Project Budget" },
              { val: "5 Yrs", label: "Vision Span" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "28px 32px", borderLeft: i ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div className="display" style={{ fontSize: 28, fontWeight: 600, color: theme.goldLight, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom wave */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0 80 L0 40 Q360 0 720 40 Q1080 80 1440 20 L1440 80 Z" fill={theme.cream}/>
        </svg>
      </section>

      {/* What We Do */}
      <section style={{ padding: "160px 40px 100px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 120 }}>
            <div className="section-label" style={{ marginBottom: 20 }}>What we do</div>
            <h2 className="serif" style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 300, lineHeight: 1.15, color: theme.earth, marginBottom: 24 }}>
              Three pillars of<br/><em style={{ fontStyle: "italic" }}>lasting change</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: theme.earthLight, marginBottom: 32 }}>
              Our work spans education, healthcare, and rural development — creating interconnected systems of support that uplift entire communities.
            </p>
            <button className="btn-outline" onClick={() => setPage("Programs")}>
              <span>All Programs</span><Icon.Arrow />
            </button>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            {[
              { icon: <Icon.Education />, title: "Education & Literacy", desc: "From arts and performing education to digital literacy, we unlock the unique potential in every child from marginalized backgrounds. Over 2,500 children benefit from our structured programs.", accent: theme.saffron },
              { icon: <Icon.Health />, title: "Health & Wellness", desc: "We provide access to medical care, wellness programs, and preventive healthcare for economically deprived communities — from cardiac care to HIV/AIDS support.", accent: theme.sage },
              { icon: <Icon.Rural />, title: "Rural Development", desc: "Building infrastructure, enabling livelihoods, and strengthening communities in Latur district and across Maharashtra through sustainable development initiatives.", accent: theme.gold },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{
                background: "white", padding: "40px",
                borderLeft: `4px solid ${item.accent}`,
                animation: `fadeUp 0.7s ${i * 0.15}s ease both`,
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start",
              }}>
                <div style={{
                  width: 56, height: 56, background: `${item.accent}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.accent, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="display" style={{ fontSize: 17, fontWeight: 600, color: theme.earth, marginBottom: 12, letterSpacing: "0.02em" }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.earthLight }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Women's Empowerment Feature Card */}
      <section style={{
        background: `linear-gradient(135deg, ${theme.earth} 0%, #2A1A0F 100%)`,
        padding: "100px 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, top: -80, opacity: 0.05 }}>
          <MandalaSVG size={500} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 30, height: 1, background: theme.goldLight }} />
                <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight }}>Empowerment Initiative</span>
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 24 }}>
                Standing beside<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>every woman</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>
                At MB Patil Foundation, women's empowerment is not a program — it is a founding philosophy. Led by Director Muktabai Balaji Patil, we champion women's access to education, healthcare, economic independence, and dignity.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {["Scholarships for girl students from rural areas", "Maternal health & family welfare programs", "Skill development & vocational training centers", "Awareness on women's sanitation and hygiene"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.goldLight, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setPage("Programs")} style={{ background: theme.gold }}>
                <span>Learn More</span><Icon.Arrow />
              </button>
            </div>
            {/* Feature card grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: <Icon.Women />, title: "Gender Equality", body: "Promoting equal access to education and opportunity for all girls and women." },
                { icon: <Icon.Heart />, title: "Healthcare Access", body: "Maternal wellness, nutrition support, and family health programs." },
                { icon: <Icon.Education />, title: "Girls' Education", body: "First-generation learner support and dropout prevention programs." },
                { icon: <Icon.Rural />, title: "Economic Freedom", body: "Vocational training and entrepreneurship support for rural women." },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "28px 24px",
                  backdropFilter: "blur(10px)",
                  transition: "background 0.3s, border-color 0.3s",
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,81,10,0.15)"; e.currentTarget.style.borderColor = `${theme.saffron}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <div style={{ color: theme.goldLight, marginBottom: 16 }}>{card.icon}</div>
                  <div className="display" style={{ fontSize: 13, fontWeight: 600, color: "white", letterSpacing: "0.04em", marginBottom: 10 }}>{card.title}</div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: "100px 40px", background: theme.saffronPale, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04 }}>
          <MandalaSVG size={500} opacity={1} />
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ color: theme.saffron, opacity: 0.3, marginBottom: 32, display: "flex", justifyContent: "center" }}>
            <Icon.Quote />
          </div>
          <p className="serif" style={{
            fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 300, fontStyle: "italic",
            color: theme.earth, lineHeight: 1.5, marginBottom: 32,
          }}>
            We believe every child deserves to dream, every woman deserves dignity, and every community deserves the resources to flourish.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.saffron, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cinzel'", fontSize: 14, color: "white", fontWeight: 600 }}>M</span>
            </div>
            <div>
              <div className="display" style={{ fontSize: 13, fontWeight: 600, color: theme.earth, letterSpacing: "0.08em" }}>Muktabai Balaji Patil</div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: theme.saffron }}>Founder & Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: theme.saffron, padding: "80px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 32,
      }}>
        <div style={{ maxWidth: 600 }}>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "white", lineHeight: 1.2, marginBottom: 12 }}>
            Join us in building a more equitable Maharashtra
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>Your support can transform lives in Latur and beyond.</p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button style={{ background: "white", color: theme.saffron, padding: "16px 36px", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.3s" }}
            onClick={() => setPage("Contact")}>
            Partner With Us
          </button>
          <button style={{ background: "transparent", color: "white", padding: "15px 35px", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}
            onClick={() => setPage("Contact")}>
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────
function AboutPage() {
  const certs = [
    "Certificate of Incorporation (Companies Act)",
    "Section 12A Income Tax Exemption",
    "Section 80G Donation Deduction",
    "CSR-1 Registration (MCA)",
    "Udyam / MSME Registration",
    "NGO Darpan / NITI Aayog",
    "DPIIT Startup India Recognition",
    "FCRA Certification",
    "LEI Certificate",
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(170deg, ${theme.saffronPale} 0%, white 100%)`,
        padding: "100px 40px 80px",
        borderBottom: `1px solid rgba(200,81,10,0.1)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -100, top: -100, opacity: 0.08 }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>Our Story</div>
          <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 300, color: theme.earth, lineHeight: 1.1, maxWidth: 700 }}>
            About MB Patil<br/><em style={{ fontStyle: "italic" }}>Foundation</em>
          </h1>
        </div>
      </div>

      {/* Director Profile */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{
                width: 340, height: 420,
                background: `linear-gradient(145deg, ${theme.saffronPale}, ${theme.offWhite})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 20,
                border: `1px solid rgba(200,81,10,0.15)`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
                  <MandalaSVG size={340} opacity={1} />
                </div>
                <div style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.saffron}, ${theme.terracotta})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", zIndex: 1,
                }}>
                  <span className="display" style={{ fontSize: 40, color: "white", fontWeight: 600 }}>M</span>
                </div>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 24px" }}>
                  <div className="display" style={{ fontSize: 18, fontWeight: 600, color: theme.earth, marginBottom: 6, letterSpacing: "0.04em" }}>Muktabai Balaji Patil</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 16 }}>Founder & Director</div>
                  <div style={{ display: "flex", justifyContent: "center" }}><LotusSVG /></div>
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                width: 80, height: 80,
                background: theme.saffron,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon.Heart />
              </div>
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: 24 }}>Leadership</div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: theme.earth, lineHeight: 1.2, marginBottom: 28 }}>
              A vision rooted in<br/><em style={{ fontStyle: "italic" }}>compassion</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: theme.earthLight, marginBottom: 20 }}>
              Mrs. Muktabai Balaji Patil, born in 1990 in the village of Hallali Devi, Nilanga, Latur, founded MB Patil Foundation out of a deep personal conviction that no child should be denied education due to circumstance, and no family should face health crises without support.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: theme.earthLight, marginBottom: 32 }}>
              Co-directed with Mr. Balaji Sharadrao Patil, the foundation was incorporated on August 4, 2025 under the Companies Act as a Section 8 non-profit company — a new organization with an ancient sense of duty to community.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { label: "CIN", value: "U85500MH2025NPL453631" },
                { label: "PAN", value: "AATCM6790M" },
                { label: "Incorporated", value: "4 August 2025" },
                { label: "State", value: "Maharashtra, India" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "18px 20px", background: theme.offWhite, borderLeft: `3px solid ${theme.saffron}` }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: theme.earth, fontWeight: 500, fontFamily: "'DM Sans'" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ background: theme.earth, padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04 }}>
          <MandalaSVG size={700} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16, color: theme.goldLight }}>
              <span style={{ background: theme.goldLight }} />
              Our Beliefs
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "white", lineHeight: 1.2 }}>
              Vision &amp; <em style={{ fontStyle: "italic", color: theme.goldLight }}>Mission</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              { num: "01", title: "Inspiring Lifelong Learning", body: "To be a center of excellence that nurtures innovation, critical thinking, and holistic development — empowering learners to become responsible global citizens." },
              { num: "02", title: "Empowerment & Equity", body: "To create an inclusive environment where every student, regardless of background, has the opportunity to realize their full potential and contribute to society." },
              { num: "03", title: "Transforming Through Service", body: "To build a generation of skilled, ethical, and compassionate individuals who lead with integrity and serve their communities with dedication." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                padding: "48px 40px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "background 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(200,81,10,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              >
                <div style={{ fontFamily: "'Cinzel'", fontSize: 48, fontWeight: 700, color: "rgba(255,255,255,0.06)", marginBottom: 20, lineHeight: 1 }}>{item.num}</div>
                <h3 className="display" style={{ fontSize: 16, fontWeight: 600, color: "white", letterSpacing: "0.04em", marginBottom: 16 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: 20 }}>Trust & Transparency</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, color: theme.earth, marginBottom: 50, lineHeight: 1.2 }}>
          Certified &amp; <em style={{ fontStyle: "italic" }}>compliant</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {certs.map((cert, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "20px 24px", background: theme.offWhite,
              border: "1px solid transparent",
              transition: "border-color 0.3s, background 0.3s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.saffron; e.currentTarget.style.background = theme.saffronPale; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = theme.offWhite; }}
            >
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: theme.saffron, flexShrink: 0,
              }} />
              <span style={{ fontSize: 14, color: theme.earthLight, lineHeight: 1.4 }}>{cert}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PROGRAMS PAGE ────────────────────────────────────────
function ProgramsPage() {
  const programs = [
    {
      icon: <Icon.Education />,
      tag: "Education",
      title: "Children & Elder Education Programme",
      desc: "Through kathak, vocal music, theatre, arts, crafts and pottery — our education program explores the uniqueness within each child from marginalized backgrounds. Professionals trained in performing arts guide children at our centers.",
      reach: "2,500+ children",
      budget: "₹20 Cr Infrastructure",
      color: theme.saffron,
    },
    {
      icon: <Icon.Health />,
      tag: "Health",
      title: "Community Health & Wellness",
      desc: "Providing medical relief to economically deprived and tribal communities through hospitals, dispensaries, health clinics, and specialized programs for cardiac diseases, HIV/AIDS patients, and maternal health.",
      reach: "Rural communities",
      budget: "Ongoing operations",
      color: theme.sage,
    },
    {
      icon: <Icon.Rural />,
      tag: "Rural Dev",
      title: "Project Deepak",
      desc: "An innovative framework bringing together educational institutes, corporations, and global consultancies to create high-quality, industry-oriented skilling solutions for students at near-free costs. 100% digital for pan-India reach.",
      reach: "1,000+ trained",
      budget: "₹5 Cr Training",
      color: theme.gold,
    },
    {
      icon: <Icon.Women />,
      tag: "Empowerment",
      title: "Women's Empowerment Initiative",
      desc: "Targeted programs for girl education, first-generation learners, vocational training, maternal wellness, and economic independence for women in rural Maharashtra — led by our woman founder.",
      reach: "Girls & women",
      budget: "₹8 Cr Scholarships",
      color: theme.terracotta,
    },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{
        background: `linear-gradient(170deg, ${theme.earth} 0%, #3D2B1F 100%)`,
        padding: "100px 40px 140px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, bottom: -80, opacity: 0.06 }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 30, height: 1, background: theme.goldLight }} />
            <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight }}>What we offer</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 300, color: "white", lineHeight: 1.1, maxWidth: 600 }}>
            Programs that<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>transform</em>
          </h1>
        </div>
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0 80 L0 30 Q720 90 1440 20 L1440 80 Z" fill={theme.cream}/>
        </svg>
      </div>

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 40 }}>
          {programs.map((prog, i) => (
            <div key={i} className="card-hover" style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: 48, alignItems: "center",
              background: "white",
              padding: "48px 56px",
              borderBottom: `3px solid ${prog.color}`,
              animation: `fadeUp 0.6s ${i * 0.12}s ease both`,
            }}>
              <div style={{
                width: 80, height: 80,
                background: `${prog.color}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: prog.color, flexShrink: 0,
              }}>
                <div style={{ transform: "scale(1.5)" }}>{prog.icon}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: prog.color, marginBottom: 10 }}>{prog.tag}</div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 600, color: theme.earth, marginBottom: 16, letterSpacing: "0.02em" }}>{prog.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: theme.earthLight, maxWidth: 560 }}>{prog.desc}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ padding: "14px 24px", background: `${prog.color}10`, borderLeft: `3px solid ${prog.color}`, marginBottom: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: prog.color, marginBottom: 4 }}>Reach</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: theme.earth, fontFamily: "'DM Sans'" }}>{prog.reach}</div>
                </div>
                <div style={{ fontSize: 12, color: theme.earthLight }}>{prog.budget}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget breakdown */}
      <section style={{ background: theme.offWhite, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Financial Transparency</div>
            <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 300, color: theme.earth }}>
              ₹50 Crore. <em style={{ fontStyle: "italic" }}>Every rupee counts.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2 }}>
            {[
              { label: "Infrastructure", pct: 40, amt: "₹20 Cr", color: theme.saffron },
              { label: "Digital Learning", pct: 20, amt: "₹10 Cr", color: theme.gold },
              { label: "Teacher Training", pct: 10, amt: "₹5 Cr", color: theme.sage },
              { label: "Scholarships", pct: 16, amt: "₹8 Cr", color: theme.terracotta },
              { label: "Community Work", pct: 4, amt: "₹2 Cr", color: theme.earthLight },
              { label: "Monitoring", pct: 4, amt: "₹2 Cr", color: theme.earth },
              { label: "Admin", pct: 6, amt: "₹3 Cr", color: "#8B7355" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "32px 28px", background: "white", borderTop: `4px solid ${item.color}` }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, fontFamily: "'Cinzel'", color: item.color, marginBottom: 8, lineHeight: 1 }}>{item.pct}%</div>
                <div style={{ fontSize: 13, color: theme.earth, fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: theme.earthLight }}>{item.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── IMPACT PAGE ──────────────────────────────────────────
function ImpactPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{
        background: `linear-gradient(150deg, ${theme.saffronPale} 0%, white 100%)`,
        padding: "100px 40px 80px",
        borderBottom: `1px solid rgba(200,81,10,0.1)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.07 }}>
          <MandalaSVG size={400} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>Making a difference</div>
          <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 300, color: theme.earth, lineHeight: 1.1, maxWidth: 600 }}>
            Measuring our<br/><em style={{ fontStyle: "italic" }}>impact</em>
          </h1>
        </div>
      </div>

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24, marginBottom: 80 }}>
          {[
            { val: "1 Lakh+", label: "Students to benefit", desc: "Improved learning environments across rural Maharashtra" },
            { val: "5,000", label: "Teachers trained", desc: "Digital pedagogy and skill development workshops" },
            { val: "2,000", label: "Scholarships", desc: "For secondary and higher education students" },
            { val: "100", label: "Schools renovated", desc: "Infrastructure development across government schools" },
            { val: "50,000", label: "Digital learners", desc: "Smart classrooms and e-learning content deployment" },
            { val: "5 Years", label: "Project duration", desc: "From baseline survey to sustainability planning" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "40px 32px",
              background: i % 2 === 0 ? theme.offWhite : "white",
              border: `1px solid rgba(200,81,10,0.08)`,
              position: "relative", overflow: "hidden",
              animation: `fadeUp 0.6s ${i * 0.1}s ease both`,
            }}>
              <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.04 }}>
                <MandalaSVG size={100} opacity={1} />
              </div>
              <div className="display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: theme.saffron, lineHeight: 1, marginBottom: 10 }}>{stat.val}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.earth, marginBottom: 8 }}>{stat.label}</div>
              <div style={{ fontSize: 13, color: theme.earthLight, lineHeight: 1.6 }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <div className="section-label" style={{ marginBottom: 20 }}>Implementation Roadmap</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: theme.earth, marginBottom: 60, lineHeight: 1.2 }}>
            Five-year <em style={{ fontStyle: "italic" }}>journey</em>
          </h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${theme.saffron}, transparent)` }} />
            {[
              { year: "Year 1", title: "Foundation & Survey", body: "Baseline survey across Latur district, infrastructure planning, pilot education centers, and initial community engagement programs." },
              { year: "Years 2–4", title: "Full-Scale Implementation", body: "Renovation of 100 schools, smart classroom deployment, teacher training at scale, scholarship disbursement, and Project Deepak launch." },
              { year: "Year 5", title: "Evaluation & Sustainability", body: "Impact assessment, knowledge dissemination, community leadership handover, digital platform launch, and long-term government partnership formalization." },
            ].map((step, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 40, marginBottom: 48, position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: i === 0 ? theme.saffron : "white",
                  border: `2px solid ${theme.saffron}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, position: "relative", zIndex: 1,
                }}>
                  <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Cinzel'", color: i === 0 ? "white" : theme.saffron }}>{i + 1}</span>
                </div>
                <div style={{ paddingTop: 10 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 8 }}>{step.year}</div>
                  <h3 className="display" style={{ fontSize: 20, fontWeight: 600, color: theme.earth, marginBottom: 12, letterSpacing: "0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: theme.earthLight, maxWidth: 600 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG alignment */}
      <section style={{ background: theme.earth, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight, marginBottom: 20 }}>Aligned with</p>
          <h3 className="serif" style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, color: "white", marginBottom: 16 }}>
            UN Sustainable Development Goal 4 — <em style={{ fontStyle: "italic", color: theme.goldLight }}>Quality Education</em>
          </h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto" }}>
            All activities conform to Schedule VII of the Companies Act, 2013 and CSR Rules (Amended 2021).
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{
        background: `linear-gradient(170deg, ${theme.earth} 0%, #3D2B1F 100%)`,
        padding: "100px 40px 140px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.06 }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 30, height: 1, background: theme.goldLight }} />
            <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight }}>Reach out</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 300, color: "white", lineHeight: 1.1, maxWidth: 600 }}>
            Let's build something<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>meaningful together</em>
          </h1>
        </div>
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0 80 L0 50 Q360 10 720 50 Q1080 90 1440 30 L1440 80 Z" fill={theme.cream}/>
        </svg>
      </div>

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          {/* Info side */}
          <div>
            <div className="section-label" style={{ marginBottom: 24 }}>Find us</div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, color: theme.earth, marginBottom: 40, lineHeight: 1.2 }}>
              MB Patil<br/><em style={{ fontStyle: "italic" }}>Foundation</em>
            </h2>

            {[
              {
                icon: <Icon.Location />,
                label: "Address",
                content: "A.P. Hallali Devi, Nilanga,\nLatur – 413521, Maharashtra, India",
              },
              {
                icon: <Icon.Mail />,
                label: "Email",
                content: "balajipatil1080@gmail.com",
              },
              {
                icon: <Icon.Phone />,
                label: "Phone",
                content: "93**16**42",
              },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", gap: 20, marginBottom: 32, alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, background: theme.saffronPale,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: theme.saffron, flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 6 }}>{info.label}</div>
                  <div style={{ fontSize: 15, color: theme.earth, lineHeight: 1.6, whiteSpace: "pre-line" }}>{info.content}</div>
                </div>
              </div>
            ))}

            {/* Map embed area */}
            <div style={{
              width: "100%", height: 260,
              background: theme.offWhite,
              border: `1px solid rgba(200,81,10,0.15)`,
              position: "relative", overflow: "hidden",
              marginTop: 16,
            }}>
              <iframe
                title="MB Patil Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30296.0!2d76.8347!3d17.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc832e1d3e47f59%3A0x5d2e4ce152e34c58!2sNilanga%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704000000000!5m2!1sen!2sin"
                width="100%" height="260" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "12px 16px",
                background: "rgba(61,43,31,0.85)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Icon.Location />
                <span style={{ fontSize: 13, color: "white", fontFamily: "'DM Sans'" }}>Devi Hallali, Nilanga, Latur — Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div style={{ background: "white", padding: "56px 48px", boxShadow: "0 24px 80px rgba(61,43,31,0.08)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: theme.saffronPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: theme.saffron }}>
                  <Icon.Heart />
                </div>
                <h3 className="serif" style={{ fontSize: 32, fontWeight: 300, color: theme.earth, marginBottom: 16, lineHeight: 1.2 }}>
                  Thank you, <em style={{ fontStyle: "italic" }}>{form.name}!</em>
                </h3>
                <p style={{ fontSize: 15, color: theme.earthLight, lineHeight: 1.7 }}>
                  Your message has been received. Our team at MB Patil Foundation will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="section-label" style={{ marginBottom: 24 }}>Send a message</div>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 300, color: theme.earth, marginBottom: 36, lineHeight: 1.2 }}>
                  Start a <em style={{ fontStyle: "italic" }}>conversation</em>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Full Name *</label>
                    <input placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Email *</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Phone</label>
                    <input placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Subject</label>
                    <input placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                  </div>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Message *</label>
                  <textarea placeholder="Tell us about your interest in partnering, donating, or volunteering..." rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: "vertical" }} />
                </div>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSubmit}>
                  <span>Send Message</span><span><Icon.Arrow /></span>
                </button>
                <p style={{ fontSize: 12, color: theme.earthLight, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                  For CSR partnerships, please also mention your company name and CSR budget.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section style={{ background: theme.offWhite, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Ways to contribute</div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 300, color: theme.earth, lineHeight: 1.2 }}>
              Join our <em style={{ fontStyle: "italic" }}>circle of impact</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
            {[
              { title: "CSR Partner", body: "Corporates can channel their CSR funds through our verified and compliant platform. We're CSR-1 registered under MCA.", accent: theme.saffron },
              { title: "Individual Donor", body: "Donations qualify for 80G tax deductions. Help a child learn, a woman grow, a community heal.", accent: theme.sage },
              { title: "Volunteer", body: "Contribute your time and skills — teaching, health camps, community outreach or digital training.", accent: theme.gold },
              { title: "Institutional Partner", body: "NGOs, hospitals, universities, and government bodies can collaborate under our established compliance framework.", accent: theme.terracotta },
            ].map((way, i) => (
              <div key={i} style={{
                padding: "40px 32px", background: "white",
                borderTop: `4px solid ${way.accent}`,
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(61,43,31,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <h3 className="display" style={{ fontSize: 16, fontWeight: 600, color: theme.earth, marginBottom: 14, letterSpacing: "0.04em" }}>{way.title}</h3>
                <p style={{ fontSize: 14, color: theme.earthLight, lineHeight: 1.7 }}>{way.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#1A0F08", padding: "80px 40px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -80, bottom: -80, opacity: 0.04 }}>
        <MandalaSVG size={400} opacity={1} />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.saffron, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Cinzel'", fontSize: 15, fontWeight: 700, color: "white" }}>MBP</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Cinzel'", fontSize: 14, color: "white", letterSpacing: "0.04em" }}>MB Patil Foundation</div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: theme.saffron }}>Health · Rural Dev · Education</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              A Section 8 non-profit company dedicated to health, rural development, and education across Maharashtra.
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "rgba(255,255,255,0.4)" }}>
              <Icon.Location />
              <span style={{ fontSize: 13, lineHeight: 1.6 }}>A.P. Hallali Devi, Nilanga,<br/>Latur – 413521, Maharashtra</span>
            </div>
          </div>
          {[
            { title: "Navigate", links: ["Home", "About", "Programs", "Impact", "Contact"] },
            { title: "Legal", links: ["CIN: U85500MH2025NPL453631", "PAN: AATCM6790M", "CSR Reg: CSR00098107", "DARPAN: MH/2025/0766093"] },
            { title: "Programs", links: ["Children's Education", "Health & Wellness", "Project Deepak", "Women's Empowerment"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.saffron, marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link, j) => (
                  <span key={j} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "white"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                    onClick={() => { if(["Home","About","Programs","Impact","Contact"].includes(link)) setPage(link); }}
                  >{link}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 MB Patil Foundation. CIN: U85500MH2025NPL453631. All rights reserved.</span>
          <div style={{ display: "flex" }}><LotusSVG color="rgba(200,81,10,0.4)" /></div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const topRef = useRef(null);

  const changePage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const renderPage = () => {
    switch(page) {
      case "Home": return <HomePage setPage={changePage} />;
      case "About": return <AboutPage />;
      case "Programs": return <ProgramsPage />;
      case "Impact": return <ImpactPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setPage={changePage} />;
    }
  };

  return (
    <>
      <style>{fonts + globalStyles}</style>
      <div ref={topRef} />
      <Navbar page={page} setPage={changePage} />
      <main>{renderPage()}</main>
      <Footer setPage={changePage} />
    </>
  );
}
