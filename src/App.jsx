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
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
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
  padding: 14px 28px;
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
  -webkit-tap-highlight-color: transparent;
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
  padding: 13px 27px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid ${theme.saffron};
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
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
  flex-shrink: 0;
}

.card-hover {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
@media (hover: hover) {
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(61,43,31,0.15);
  }
}

input, textarea, select {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
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

/* ── RESPONSIVE UTILITIES ── */
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}
.grid-halves {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.grid-contact {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 80px;
  align-items: start;
}
.grid-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.grid-4col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.grid-program-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 48px;
  align-items: center;
}
.grid-footer { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; }
.stats-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  min-width: 440px;
  position: absolute;
  bottom: -80px; right: 0;
}
.women-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.budget-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 2px; }
.impact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
.partner-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2px; }
.cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.about-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
.contact-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.cta-banner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 32px; }
.cta-btns { display: flex; gap: 16px; flex-wrap: wrap; }
.bank-detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }

@media (max-width: 960px) {
  .grid-2col { grid-template-columns: 1fr; gap: 48px; }
  .grid-2col > *:first-child { position: static !important; }
  .grid-halves { grid-template-columns: 1fr; gap: 48px; }
  .grid-contact { grid-template-columns: 1fr; gap: 48px; }
  .grid-3col { grid-template-columns: 1fr; gap: 0; }
  .grid-footer { grid-template-columns: 1fr 1fr; gap: 40px; }
  .stats-bar { position: static; min-width: unset; width: 100%; margin-top: 48px; grid-template-columns: repeat(3, 1fr); }
  .women-card-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-program-row { grid-template-columns: auto 1fr; gap: 24px; }
  .grid-program-row > *:last-child { grid-column: 1 / -1; }
  .partner-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
  .impact-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
}

@media (max-width: 640px) {
  .grid-footer { grid-template-columns: 1fr; gap: 32px; }
  .women-card-grid { grid-template-columns: 1fr; gap: 12px; }
  .stats-bar { grid-template-columns: 1fr; }
  .stats-bar > * { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.1); }
  .stats-bar > *:first-child { border-top: none; }
  .about-detail-grid { grid-template-columns: 1fr; gap: 12px; }
  .hero-btns { flex-direction: column; align-items: flex-start; }
  .contact-form-grid { grid-template-columns: 1fr; }
  .cta-banner { flex-direction: column; align-items: flex-start; }
  .cta-btns { flex-direction: column; width: 100%; }
  .cta-btns button { width: 100%; justify-content: center; }
  .btn-primary, .btn-outline { width: 100%; justify-content: center; }
  .hero-btns .btn-primary, .hero-btns .btn-outline { width: auto; }
  .grid-program-row { grid-template-columns: 1fr; gap: 20px; }
  .grid-program-row > *:first-child { display: none; }
  .partner-grid { grid-template-columns: 1fr; }
  .budget-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-grid { grid-template-columns: 1fr; gap: 12px; }
  .bank-detail-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .budget-grid { grid-template-columns: 1fr 1fr; }
  .bank-detail-grid { grid-template-columns: 1fr; }
}
`;

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
  Bank: () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M11 1L1 6.5H21L11 1Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      <line x1="3" y1="9" x2="3" y2="17" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="8" y1="9" x2="8" y2="17" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="19" y1="9" x2="19" y2="17" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="1" y1="19" x2="21" y2="19" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M11 5V2H2V11H5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Cow: () => (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
      <path d="M5 6C5 6 3.5 4 4 2.5C4.5 1 6 2 6.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M19 6C19 6 20.5 4 20 2.5C19.5 1 18 2 17.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M5 8C5 5.5 7.5 4 12 4C16.5 4 19 5.5 19 8C19 9.5 18.3 10.3 17 10.8V13C17 15 15.5 16.5 13.5 16.5H10.5C8.5 16.5 7 15 7 13V10.8C5.7 10.3 5 9.5 5 8Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="9.5" cy="7.5" r="0.8" fill="currentColor"/>
      <circle cx="14.5" cy="7.5" r="0.8" fill="currentColor"/>
      <path d="M10 9.5C10.5 10 13.5 10 14 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 16.5L8 19M15 16.5L16 19M11 16.5L10.5 19M13 16.5L13.5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

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

const LotusSVG = ({ color = theme.saffron }) => (
  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
    <path d="M30 38 C30 38 10 30 10 15 C10 8 18 4 24 8 C26 9 28 11 30 14 C32 11 34 9 36 8 C42 4 50 8 50 15 C50 30 30 38 30 38Z" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M30 38 C30 38 20 28 18 18 C16 10 20 5 24 7 C27 8 29 12 30 16 C31 12 33 8 36 7 C40 5 44 10 42 18 C40 28 30 38 30 38Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"/>
    <line x1="30" y1="38" x2="30" y2="2" stroke={color} strokeWidth="1" opacity="0.4"/>
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
          padding: ${scrolled ? "12px 0" : "18px 0"};
          background: ${scrolled ? "rgba(250,246,240,0.97)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(12px)" : "none"};
          border-bottom: ${scrolled ? `1px solid rgba(200,81,10,0.1)` : "none"};
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (min-width: 641px) { .nav-inner { padding: 0 40px; } }
        .logo-mark {
          display: flex; align-items: center; gap: 12px; cursor: pointer;
        }
        .logo-circle {
          width: 40px; height: 40px; border-radius: 50%;
          background: ${theme.saffron};
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700;
          color: white; letter-spacing: -1px;
          flex-shrink: 0;
        }
        .logo-text { line-height: 1.2; }
        .logo-name {
          font-family: 'Cinzel', serif; font-size: 13px; font-weight: 600;
          color: ${theme.earth}; letter-spacing: 0.04em;
        }
        .logo-tagline {
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          color: ${theme.saffron}; font-weight: 400;
        }
        .nav-links {
          display: flex; align-items: center; gap: 32px;
        }
        .nav-cta {
          background: ${theme.saffron}; color: white;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background 0.3s ease;
        }
        .nav-cta:hover { background: ${theme.terracotta}; }
        .hamburger {
          display: none; background: none; border: none;
          color: ${theme.earth}; cursor: pointer; padding: 8px;
          -webkit-tap-highlight-color: transparent;
          min-width: 44px; min-height: 44px;
          align-items: center; justify-content: center;
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: ${theme.cream}; z-index: 2000;
          display: flex; flex-direction: column;
          padding: 24px;
          overflow-y: auto;
        }
        .mobile-menu-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 48px;
        }
        .mobile-close-btn {
          background: none; border: none; cursor: pointer;
          color: ${theme.earth}; padding: 8px;
          min-width: 44px; min-height: 44px;
          display: flex; align-items: center; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }
        .mobile-nav-links {
          display: flex; flex-direction: column; gap: 0;
        }
        .mobile-nav-link {
          font-family: 'Cinzel', serif; font-size: clamp(24px, 8vw, 36px); font-weight: 400;
          color: ${theme.earth}; cursor: pointer;
          padding: 16px 0; border-bottom: 1px solid rgba(61,43,31,0.1);
          transition: color 0.2s; letter-spacing: 0.02em;
          -webkit-tap-highlight-color: transparent;
          min-height: 56px; display: flex; align-items: center;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: ${theme.saffron}; }
        .mobile-donate {
          margin-top: 32px;
          background: ${theme.saffron}; color: white;
          padding: 16px; text-align: center;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          border: none; cursor: pointer; width: 100%;
          -webkit-tap-highlight-color: transparent;
        }
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
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon.Menu /></button>
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
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon.Close /></button>
          </div>
          <div className="mobile-nav-links">
            {pages.map(p => (
              <div key={p} className={`mobile-nav-link ${page === p ? "active" : ""}`}
                onClick={() => { setPage(p); setMenuOpen(false); }}>{p}</div>
            ))}
          </div>
          <button className="mobile-donate" onClick={() => { setPage("Contact"); setMenuOpen(false); }}>Donate Now</button>
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
        minHeight: "100svh",
        background: `linear-gradient(160deg, ${theme.earth} 0%, #5A3420 55%, ${theme.terracotta} 100%)`,
        position: "relative",
        display: "flex", alignItems: "center",
        overflow: "hidden",
        padding: "100px 24px 80px",
      }}>
        <style>{`@media (min-width: 641px) { .hero-section { padding: 120px 40px 80px !important; } }`}</style>
        <div style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.08, pointerEvents: "none" }}>
          <MandalaSVG size={600} opacity={1} />
        </div>
        <div style={{ position: "absolute", left: "-100px", bottom: "-100px", opacity: 0.05, pointerEvents: "none" }}>
          <MandalaSVG size={400} opacity={1} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680, animation: "fadeUp 0.9s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ width: 40, height: 1, background: theme.goldLight }} />
              <span style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.goldLight }}>
                Est. 2025 · Nilanga, Maharashtra
              </span>
            </div>
            <h1 className="display" style={{
              fontSize: "clamp(40px, 9vw, 84px)", fontWeight: 400,
              color: "white", lineHeight: 1.05,
              letterSpacing: "-0.01em", marginBottom: 24,
            }}>
              Illuminating<br/>
              <em style={{ color: theme.goldLight, fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontWeight: 300, fontSize: "1.1em" }}>lives</em><br/>
              through service
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond'", fontSize: "clamp(16px, 3vw, 22px)",
              color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 40,
              fontWeight: 300,
            }}>
              Founded by Muktabai Balaji Patil, the MB Patil Foundation works tirelessly to uplift marginalized communities across Maharashtra through education, health, and rural empowerment.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ width: "auto" }} onClick={() => setPage("About")}>
                <span>Discover Our Work</span><span><Icon.Arrow /></span>
              </button>
              <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)", width: "auto" }} onClick={() => setPage("Programs")}>
                <span>Our Programs</span>
              </button>
            </div>
          </div>

          {/* Stats bar — stacks on mobile */}
          <div className="stats-bar">
            {[
              { val: "2500+", label: "Beneficiaries" },
              { val: "₹50 Cr", label: "Project Budget" },
              { val: "5 Yrs", label: "Vision Span" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "24px 28px", borderLeft: i ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div className="display" style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 600, color: theme.goldLight, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
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
      <section style={{ padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 40px) clamp(60px, 8vw, 100px)", maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid-2col">
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>What we do</div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, lineHeight: 1.15, color: theme.earth, marginBottom: 20 }}>
              Three pillars of<br/><em style={{ fontStyle: "italic" }}>lasting change</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: theme.earthLight, marginBottom: 28 }}>
              Our work spans education, healthcare, and rural development — creating interconnected systems of support that uplift entire communities.
            </p>
            <button className="btn-outline" style={{ width: "auto" }} onClick={() => setPage("Programs")}>
              <span>All Programs</span><Icon.Arrow />
            </button>
          </div>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              { icon: <Icon.Education />, title: "Education & Literacy", desc: "From kathak and vocal music to digital literacy, we unlock the unique potential in every child from marginalized backgrounds. Over 2,500 children benefit from our programs.", accent: theme.saffron },
              { icon: <Icon.Health />, title: "Health & Wellness", desc: "We provide access to medical care, wellness programs, and preventive healthcare — from cardiac care to maternal health support.", accent: theme.sage },
              { icon: <Icon.Rural />, title: "Rural Development", desc: "Building infrastructure, enabling livelihoods, and strengthening communities in Latur district and across Maharashtra.", accent: theme.gold },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{
                background: "white", padding: "clamp(24px, 4vw, 40px)",
                borderLeft: `4px solid ${item.accent}`,
                animation: `fadeUp 0.7s ${i * 0.15}s ease both`,
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start",
              }}>
                <div style={{
                  width: 48, height: 48, background: `${item.accent}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.accent, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="display" style={{ fontSize: 15, fontWeight: 600, color: theme.earth, marginBottom: 10, letterSpacing: "0.02em" }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.earthLight }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Women's Empowerment */}
      <section style={{
        background: `linear-gradient(135deg, ${theme.earth} 0%, #2A1A0F 100%)`,
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, top: -80, opacity: 0.05, pointerEvents: "none" }}>
          <MandalaSVG size={500} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="grid-halves">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 30, height: 1, background: theme.goldLight }} />
                <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.goldLight }}>Empowerment Initiative</span>
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 5vw, 54px)", fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
                Standing beside<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>every woman</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
                At MB Patil Foundation, women's empowerment is not a program — it is a founding philosophy. Led by Director Muktabai Balaji Patil, we champion women's access to education, healthcare, economic independence, and dignity.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {["Scholarships for girl students from rural areas", "Maternal health & family welfare programs", "Skill development & vocational training centers", "Awareness on women's sanitation and hygiene"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.goldLight, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ background: theme.gold, width: "auto" }} onClick={() => setPage("Programs")}>
                <span>Learn More</span><Icon.Arrow />
              </button>
            </div>
            <div className="women-card-grid">
              {[
                { icon: <Icon.Women />, title: "Gender Equality", body: "Promoting equal access to education and opportunity for all girls and women." },
                { icon: <Icon.Heart />, title: "Healthcare Access", body: "Maternal wellness, nutrition support, and family health programs." },
                { icon: <Icon.Education />, title: "Girls' Education", body: "First-generation learner support and dropout prevention programs." },
                { icon: <Icon.Rural />, title: "Economic Freedom", body: "Vocational training and entrepreneurship support for rural women." },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "24px 20px",
                  transition: "background 0.3s, border-color 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,81,10,0.15)"; e.currentTarget.style.borderColor = `${theme.saffron}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <div style={{ color: theme.goldLight, marginBottom: 14 }}>{card.icon}</div>
                  <div className="display" style={{ fontSize: 12, fontWeight: 600, color: "white", letterSpacing: "0.04em", marginBottom: 8 }}>{card.title}</div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", background: theme.saffronPale, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <MandalaSVG size={500} opacity={1} />
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ color: theme.saffron, opacity: 0.3, marginBottom: 28, display: "flex", justifyContent: "center" }}>
            <Icon.Quote />
          </div>
          <p className="serif" style={{
            fontSize: "clamp(19px, 4vw, 36px)", fontWeight: 300, fontStyle: "italic",
            color: theme.earth, lineHeight: 1.5, marginBottom: 28,
          }}>
            We believe every child deserves to dream, every woman deserves dignity, and every community deserves the resources to flourish.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.saffron, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cinzel'", fontSize: 14, color: "white", fontWeight: 600 }}>M</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <div className="display" style={{ fontSize: 12, fontWeight: 600, color: theme.earth, letterSpacing: "0.08em" }}>Muktabai Balaji Patil</div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: theme.saffron }}>Founder & Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: theme.saffron, padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)",
      }}>
        <div className="cta-banner">
          <div style={{ maxWidth: 600 }}>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 5vw, 44px)", fontWeight: 300, color: "white", lineHeight: 1.2, marginBottom: 10 }}>
              Join us in building a more equitable Maharashtra
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>Your support can transform lives in Latur and beyond.</p>
          </div>
          <div className="cta-btns">
            <button style={{ background: "white", color: theme.saffron, padding: "16px 32px", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.3s", minHeight: 52 }}
              onClick={() => setPage("Contact")}>
              Partner With Us
            </button>
            <button style={{ background: "transparent", color: "white", padding: "15px 31px", border: "1px solid rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", minHeight: 52 }}
              onClick={() => setPage("Contact")}>
              Get In Touch
            </button>
          </div>
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
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px) clamp(48px, 7vw, 80px)",
        borderBottom: `1px solid rgba(200,81,10,0.1)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -100, top: -100, opacity: 0.08, pointerEvents: "none" }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>Our Story</div>
          <h1 className="serif" style={{ fontSize: "clamp(34px, 7vw, 68px)", fontWeight: 300, color: theme.earth, lineHeight: 1.1, maxWidth: 700 }}>
            About MB Patil<br/><em style={{ fontStyle: "italic" }}>Foundation</em>
          </h1>
        </div>
      </div>

      {/* Director Profile */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid-halves">
          {/* Portrait card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "min(300px, 85vw)", height: 380,
                background: `linear-gradient(145deg, ${theme.saffronPale}, ${theme.offWhite})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 20,
                border: `1px solid rgba(200,81,10,0.15)`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
                  <MandalaSVG size={300} opacity={1} />
                </div>
                <div style={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.saffron}, ${theme.terracotta})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", zIndex: 1,
                }}>
                  <span className="display" style={{ fontSize: 36, color: "white", fontWeight: 600 }}>M</span>
                </div>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 24px" }}>
                  <div className="display" style={{ fontSize: 16, fontWeight: 600, color: theme.earth, marginBottom: 6, letterSpacing: "0.04em" }}>Muktabai Balaji Patil</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 16 }}>Founder & Director</div>
                  <div style={{ display: "flex", justifyContent: "center" }}><LotusSVG /></div>
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: -16, right: -16,
                width: 64, height: 64,
                background: theme.saffron,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon.Heart />
              </div>
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: 24 }}>Leadership</div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 300, color: theme.earth, lineHeight: 1.2, marginBottom: 24 }}>
              A vision rooted in<br/><em style={{ fontStyle: "italic" }}>compassion</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: theme.earthLight, marginBottom: 18 }}>
              Mrs. Muktabai Balaji Patil, born in 1990 in the village of Hallali Devi, Nilanga, Latur, founded MB Patil Foundation out of a deep personal conviction that no child should be denied education due to circumstance, and no family should face health crises without support.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: theme.earthLight, marginBottom: 28 }}>
              Co-directed with Mr. Balaji Sharadrao Patil, the foundation was incorporated on August 4, 2025 under the Companies Act as a Section 8 non-profit company.
            </p>
            <div className="about-detail-grid">
              {[
                { label: "CIN", value: "U85500MH2025NPL453631" },
                { label: "PAN", value: "AATCM6790M" },
                { label: "Incorporated", value: "4 August 2025" },
                { label: "State", value: "Maharashtra, India" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px 18px", background: theme.offWhite, borderLeft: `3px solid ${theme.saffron}` }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: theme.earth, fontWeight: 500, fontFamily: "'DM Sans'", wordBreak: "break-all" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ background: theme.earth, padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <MandalaSVG size={700} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16, color: theme.goldLight }}>
              <span style={{ background: theme.goldLight }} />
              Our Beliefs
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, color: "white", lineHeight: 1.2 }}>
              Vision &amp; <em style={{ fontStyle: "italic", color: theme.goldLight }}>Mission</em>
            </h2>
          </div>
          <div className="grid-3col">
            {[
              { num: "01", title: "Inspiring Lifelong Learning", body: "To be a center of excellence that nurtures innovation, critical thinking, and holistic development — empowering learners to become responsible global citizens." },
              { num: "02", title: "Empowerment & Equity", body: "To create an inclusive environment where every student, regardless of background, has the opportunity to realize their full potential and contribute to society." },
              { num: "03", title: "Transforming Through Service", body: "To build a generation of skilled, ethical, and compassionate individuals who lead with integrity and serve their communities with dedication." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                padding: "40px 32px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(200,81,10,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              >
                <div style={{ fontFamily: "'Cinzel'", fontSize: 42, fontWeight: 700, color: "rgba(255,255,255,0.06)", marginBottom: 16, lineHeight: 1 }}>{item.num}</div>
                <h3 className="display" style={{ fontSize: 15, fontWeight: 600, color: "white", letterSpacing: "0.04em", marginBottom: 14 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", maxWidth: 1280, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: 20 }}>Trust & Transparency</div>
        <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 300, color: theme.earth, marginBottom: 40, lineHeight: 1.2 }}>
          Certified &amp; <em style={{ fontStyle: "italic" }}>compliant</em>
        </h2>
        <div className="cert-grid">
          {certs.map((cert, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 20px", background: theme.offWhite,
              border: "1px solid transparent",
              transition: "border-color 0.3s, background 0.3s",
              minHeight: 52,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.saffron; e.currentTarget.style.background = theme.saffronPale; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = theme.offWhite; }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.saffron, flexShrink: 0 }} />
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
    {
      icon: <Icon.Cow />,
      tag: "Animal Welfare",
      title: "Gausala — Stray Cow Shelters",
      desc: "Building and maintaining Gausalas (cow shelters) across Latur district to rescue, feed, and care for stray and abandoned cows. Each shelter provides clean fodder, water, veterinary care, and a safe sanctuary — reflecting our commitment to compassion for all living beings.",
      reach: "Stray cattle, Latur",
      budget: "Community-funded",
      color: theme.earthLight,
    },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{
        background: `linear-gradient(170deg, ${theme.earth} 0%, #3D2B1F 100%)`,
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px) clamp(80px, 12vw, 140px)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, bottom: -80, opacity: 0.06, pointerEvents: "none" }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 30, height: 1, background: theme.goldLight }} />
            <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.goldLight }}>What we offer</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(34px, 7vw, 68px)", fontWeight: 300, color: "white", lineHeight: 1.1, maxWidth: 600 }}>
            Programs that<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>transform</em>
          </h1>
        </div>
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0 80 L0 30 Q720 90 1440 20 L1440 80 Z" fill={theme.cream}/>
        </svg>
      </div>

      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 32 }}>
          {programs.map((prog, i) => (
            <div key={i} className="card-hover" style={{
              background: "white",
              padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 48px)",
              borderBottom: `3px solid ${prog.color}`,
              animation: `fadeUp 0.6s ${i * 0.12}s ease both`,
            }}>
              <div className="grid-program-row">
                <div style={{
                  width: 72, height: 72,
                  background: `${prog.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: prog.color, flexShrink: 0,
                }}>
                  <div style={{ transform: "scale(1.4)" }}>{prog.icon}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: prog.color, marginBottom: 8 }}>{prog.tag}</div>
                  <h3 className="display" style={{ fontSize: "clamp(16px, 3vw, 22px)", fontWeight: 600, color: theme.earth, marginBottom: 12, letterSpacing: "0.02em" }}>{prog.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.earthLight }}>{prog.desc}</p>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ padding: "12px 20px", background: `${prog.color}10`, borderLeft: `3px solid ${prog.color}`, marginBottom: 10, minWidth: 140 }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: prog.color, marginBottom: 3 }}>Reach</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: theme.earth, fontFamily: "'DM Sans'" }}>{prog.reach}</div>
                  </div>
                  <div style={{ fontSize: 12, color: theme.earthLight }}>{prog.budget}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Budget breakdown */}
      <section style={{ background: theme.offWhite, padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Financial Transparency</div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 300, color: theme.earth }}>
              ₹50 Crore. <em style={{ fontStyle: "italic" }}>Every rupee counts.</em>
            </h2>
          </div>
          <div className="budget-grid">
            {[
              { label: "Infrastructure", pct: 40, amt: "₹20 Cr", color: theme.saffron },
              { label: "Digital Learning", pct: 20, amt: "₹10 Cr", color: theme.gold },
              { label: "Teacher Training", pct: 10, amt: "₹5 Cr", color: theme.sage },
              { label: "Scholarships", pct: 16, amt: "₹8 Cr", color: theme.terracotta },
              { label: "Community Work", pct: 4, amt: "₹2 Cr", color: theme.earthLight },
              { label: "Monitoring", pct: 4, amt: "₹2 Cr", color: theme.earth },
              { label: "Admin", pct: 6, amt: "₹3 Cr", color: "#8B7355" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "28px 24px", background: "white", borderTop: `4px solid ${item.color}` }}>
                <div style={{ fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 700, fontFamily: "'Cinzel'", color: item.color, marginBottom: 6, lineHeight: 1 }}>{item.pct}%</div>
                <div style={{ fontSize: 13, color: theme.earth, fontWeight: 500, marginBottom: 3 }}>{item.label}</div>
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
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px) clamp(48px, 7vw, 80px)",
        borderBottom: `1px solid rgba(200,81,10,0.1)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.07, pointerEvents: "none" }}>
          <MandalaSVG size={400} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>Making a difference</div>
          <h1 className="serif" style={{ fontSize: "clamp(34px, 7vw, 68px)", fontWeight: 300, color: theme.earth, lineHeight: 1.1, maxWidth: 600 }}>
            Measuring our<br/><em style={{ fontStyle: "italic" }}>impact</em>
          </h1>
        </div>
      </div>

      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", maxWidth: 1280, margin: "0 auto" }}>
        <div className="impact-grid" style={{ marginBottom: 72 }}>
          {[
            { val: "1 Lakh+", label: "Students to benefit", desc: "Improved learning environments across rural Maharashtra" },
            { val: "5,000", label: "Teachers trained", desc: "Digital pedagogy and skill development workshops" },
            { val: "2,000", label: "Scholarships", desc: "For secondary and higher education students" },
            { val: "100", label: "Schools renovated", desc: "Infrastructure development across government schools" },
            { val: "50,000", label: "Digital learners", desc: "Smart classrooms and e-learning content deployment" },
            { val: "5 Years", label: "Project duration", desc: "From baseline survey to sustainability planning" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              background: i % 2 === 0 ? theme.offWhite : "white",
              border: `1px solid rgba(200,81,10,0.08)`,
              position: "relative", overflow: "hidden",
              animation: `fadeUp 0.6s ${i * 0.1}s ease both`,
            }}>
              <div className="display" style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: theme.saffron, lineHeight: 1, marginBottom: 8 }}>{stat.val}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.earth, marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 13, color: theme.earthLight, lineHeight: 1.6 }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <div className="section-label" style={{ marginBottom: 20 }}>Implementation Roadmap</div>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 300, color: theme.earth, marginBottom: 52, lineHeight: 1.2 }}>
            Five-year <em style={{ fontStyle: "italic" }}>journey</em>
          </h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${theme.saffron}, transparent)` }} />
            {[
              { year: "Year 1", title: "Foundation & Survey", body: "Baseline survey across Latur district, infrastructure planning, pilot education centers, and initial community engagement programs." },
              { year: "Years 2–4", title: "Full-Scale Implementation", body: "Renovation of 100 schools, smart classroom deployment, teacher training at scale, scholarship disbursement, and Project Deepak launch." },
              { year: "Year 5", title: "Evaluation & Sustainability", body: "Impact assessment, knowledge dissemination, community leadership handover, digital platform launch, and long-term government partnership formalization." },
            ].map((step, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "clamp(20px, 4vw, 40px)", marginBottom: 44, position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: i === 0 ? theme.saffron : "white",
                  border: `2px solid ${theme.saffron}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, position: "relative", zIndex: 1,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Cinzel'", color: i === 0 ? "white" : theme.saffron }}>{i + 1}</span>
                </div>
                <div style={{ paddingTop: 10 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 6 }}>{step.year}</div>
                  <h3 className="display" style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 600, color: theme.earth, marginBottom: 10, letterSpacing: "0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.earthLight }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG alignment */}
      <section style={{ background: theme.earth, padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: theme.goldLight, marginBottom: 16 }}>Aligned with</p>
          <h3 className="serif" style={{ fontSize: "clamp(18px, 3vw, 36px)", fontWeight: 300, color: "white", marginBottom: 14, lineHeight: 1.4 }}>
            UN Sustainable Development Goal 4 — <em style={{ fontStyle: "italic", color: theme.goldLight }}>Quality Education</em>
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            All activities conform to Schedule VII of the Companies Act, 2013 and CSR Rules (Amended 2021).
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── DONATE / BANK DETAILS CARD ───────────────────────────
function BankDetailsCard() {
  const [copied, setCopied] = useState("");

  const details = [
    { label: "Account Name", value: "M B Patil Foundation" },
    { label: "Account Number", value: "403020111111" },
    { label: "IFSC Code", value: "RATN0000279" },
    { label: "Bank", value: "RBL Bank Ltd, Magarpatta, Pune" },
  ];

  const handleCopy = (value, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(label);
    setTimeout(() => setCopied(""), 1600);
  };

  return (
    <div style={{
      background: `linear-gradient(150deg, ${theme.earth} 0%, #2A1A0F 100%)`,
      padding: "clamp(32px, 5vw, 48px) clamp(24px, 5vw, 48px)",
      position: "relative", overflow: "hidden",
      marginBottom: 48,
    }}>
      <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.06, pointerEvents: "none" }}>
        <MandalaSVG size={320} opacity={1} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <div style={{
            width: 52, height: 52, background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(245,215,142,0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: theme.goldLight, flexShrink: 0,
          }}>
            <Icon.Bank />
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.goldLight, marginBottom: 6 }}>Direct Bank Transfer</div>
            <h3 className="serif" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 300, color: "white", lineHeight: 1.2 }}>
              Donate <em style={{ fontStyle: "italic", color: theme.goldLight }}>directly</em> to our account
            </h3>
          </div>
        </div>

        <div className="bank-detail-grid">
          {details.map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "18px 20px",
              position: "relative",
              transition: "border-color 0.3s, background 0.3s",
              cursor: "pointer",
            }}
              onClick={() => handleCopy(item.value, item.label)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${theme.saffron}80`; e.currentTarget.style.background = "rgba(200,81,10,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            >
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.goldLight, marginBottom: 8 }}>{item.label}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span className="display" style={{ fontSize: item.label === "Bank" ? 13 : 16, fontWeight: 600, color: "white", letterSpacing: item.label === "Account Number" || item.label === "IFSC Code" ? "0.08em" : "normal", wordBreak: "break-word", lineHeight: 1.4 }}>
                  {item.value}
                </span>
                <span style={{ color: copied === item.label ? "#7FBF7F" : "rgba(255,255,255,0.35)", flexShrink: 0, transition: "color 0.2s" }}>
                  {copied === item.label ? <Icon.Check /> : <Icon.Copy />}
                </span>
              </div>
              {copied === item.label && (
                <div style={{ position: "absolute", top: 8, right: 8, fontSize: 10, color: "#7FBF7F", letterSpacing: "0.15em", textTransform: "uppercase" }}>Copied</div>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 24, lineHeight: 1.7 }}>
          Tap any field to copy it. Please email your transaction reference and address to <span style={{ color: theme.goldLight }}>balajipatil1080@gmail.com</span> so we can issue your 80G donation receipt.
        </p>
      </div>
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
        padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px) clamp(80px, 12vw, 140px)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.06, pointerEvents: "none" }}>
          <MandalaSVG size={450} opacity={1} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 30, height: 1, background: theme.goldLight }} />
            <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.goldLight }}>Reach out</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(30px, 7vw, 68px)", fontWeight: 300, color: "white", lineHeight: 1.1, maxWidth: 600 }}>
            Let's build something<br/><em style={{ fontStyle: "italic", color: theme.goldLight }}>meaningful together</em>
          </h1>
        </div>
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0 80 L0 50 Q360 10 720 50 Q1080 90 1440 30 L1440 80 Z" fill={theme.cream}/>
        </svg>
      </div>

      <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px) 0", maxWidth: 1280, margin: "0 auto" }}>
        <BankDetailsCard />
      </section>

      <section style={{ padding: "0 clamp(20px, 5vw, 40px) clamp(60px, 10vw, 100px)", maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid-contact">
          {/* Info side */}
          <div>
            <div className="section-label" style={{ marginBottom: 24 }}>Find us</div>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 300, color: theme.earth, marginBottom: 36, lineHeight: 1.2 }}>
              MB Patil<br/><em style={{ fontStyle: "italic" }}>Foundation</em>
            </h2>

            {[
              { icon: <Icon.Location />, label: "Address", content: "A.P. Hallali Devi, Nilanga,\nLatur – 413521, Maharashtra, India" },
              { icon: <Icon.Mail />, label: "Email", content: "balajipatil1080@gmail.com" },
              { icon: <Icon.Phone />, label: "Phone", content: "93**16**42" },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", gap: 18, marginBottom: 28, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, background: theme.saffronPale,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: theme.saffron, flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.saffron, marginBottom: 5 }}>{info.label}</div>
                  <div style={{ fontSize: 14, color: theme.earth, lineHeight: 1.6, whiteSpace: "pre-line", wordBreak: "break-word" }}>{info.content}</div>
                </div>
              </div>
            ))}

            <div style={{
              width: "100%", height: 240,
              background: theme.offWhite,
              border: `1px solid rgba(200,81,10,0.15)`,
              position: "relative", overflow: "hidden",
              marginTop: 12,
            }}>
              <iframe
                title="MB Patil Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30296.0!2d76.8347!3d17.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc832e1d3e47f59%3A0x5d2e4ce152e34c58!2sNilanga%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704000000000!5m2!1sen!2sin"
                width="100%" height="240" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "10px 14px",
                background: "rgba(61,43,31,0.85)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Icon.Location />
                <span style={{ fontSize: 12, color: "white", fontFamily: "'DM Sans'" }}>Devi Hallali, Nilanga, Latur</span>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div style={{ background: "white", padding: "clamp(28px, 5vw, 56px) clamp(20px, 5vw, 48px)", boxShadow: "0 24px 80px rgba(61,43,31,0.08)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: theme.saffronPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: theme.saffron }}>
                  <Icon.Heart />
                </div>
                <h3 className="serif" style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 300, color: theme.earth, marginBottom: 16, lineHeight: 1.2 }}>
                  Thank you, <em style={{ fontStyle: "italic" }}>{form.name}!</em>
                </h3>
                <p style={{ fontSize: 15, color: theme.earthLight, lineHeight: 1.7 }}>
                  Your message has been received. Our team at MB Patil Foundation will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="section-label" style={{ marginBottom: 20 }}>Send a message</div>
                <h3 className="serif" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 300, color: theme.earth, marginBottom: 28, lineHeight: 1.2 }}>
                  Start a <em style={{ fontStyle: "italic" }}>conversation</em>
                </h3>
                <div className="contact-form-grid">
                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Full Name *</label>
                    <input placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Email *</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="contact-form-grid">
                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Phone</label>
                    <input placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Subject</label>
                    <input placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                  </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.earthLight, display: "block", marginBottom: 8 }}>Message *</label>
                  <textarea placeholder="Tell us about your interest in partnering, donating, or volunteering..." rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: "vertical" }} />
                </div>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center", minHeight: 52 }} onClick={handleSubmit}>
                  <span>Send Message</span><span><Icon.Arrow /></span>
                </button>
                <p style={{ fontSize: 12, color: theme.earthLight, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                  For CSR partnerships, please also mention your company name and CSR budget.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section style={{ background: theme.offWhite, padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Ways to contribute</div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 300, color: theme.earth, lineHeight: 1.2 }}>
              Join our <em style={{ fontStyle: "italic" }}>circle of impact</em>
            </h2>
          </div>
          <div className="partner-grid">
            {[
              { title: "CSR Partner", body: "Corporates can channel their CSR funds through our verified and compliant platform. We're CSR-1 registered under MCA.", accent: theme.saffron },
              { title: "Individual Donor", body: "Donations qualify for 80G tax deductions. Help a child learn, a woman grow, a community heal.", accent: theme.sage },
              { title: "Volunteer", body: "Contribute your time and skills — teaching, health camps, community outreach or digital training.", accent: theme.gold },
              { title: "Institutional Partner", body: "NGOs, hospitals, universities, and government bodies can collaborate under our established compliance framework.", accent: theme.terracotta },
            ].map((way, i) => (
              <div key={i} style={{
                padding: "36px 28px", background: "white",
                borderTop: `4px solid ${way.accent}`,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(61,43,31,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <h3 className="display" style={{ fontSize: 15, fontWeight: 600, color: theme.earth, marginBottom: 12, letterSpacing: "0.04em" }}>{way.title}</h3>
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
    <footer style={{ background: "#1A0F08", padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px) clamp(28px, 4vw, 40px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -80, bottom: -80, opacity: 0.04, pointerEvents: "none" }}>
        <MandalaSVG size={400} opacity={1} />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="grid-footer" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: theme.saffron, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Cinzel'", fontSize: 13, fontWeight: 700, color: "white" }}>MBP</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Cinzel'", fontSize: 13, color: "white", letterSpacing: "0.04em" }}>MB Patil Foundation</div>
                <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: theme.saffron }}>Health · Rural Dev · Education</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280, marginBottom: 20 }}>
              A Section 8 non-profit company dedicated to health, rural development, and education across Maharashtra.
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.4)" }}>
              <Icon.Location />
              <span style={{ fontSize: 12, lineHeight: 1.6 }}>A.P. Hallali Devi, Nilanga,<br/>Latur – 413521, Maharashtra</span>
            </div>
          </div>
          {[
            { title: "Navigate", links: ["Home", "About", "Programs", "Impact", "Contact"] },
            { title: "Legal", links: ["CIN: U85500MH2025NPL453631", "PAN: AATCM6790M", "CSR Reg: CSR00098107", "DARPAN: MH/2025/0766093"] },
            { title: "Programs", links: ["Children's Education", "Health & Wellness", "Project Deepak", "Women's Empowerment"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: theme.saffron, marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link, j) => (
                  <span key={j} style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s", lineHeight: 1.5, wordBreak: "break-word" }}
                    onMouseEnter={e => e.target.style.color = "white"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                    onClick={() => { if(["Home","About","Programs","Impact","Contact"].includes(link)) setPage(link); }}
                  >{link}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>© 2025 MB Patil Foundation. CIN: U85500MH2025NPL453631.</span>
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
