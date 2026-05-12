import { useState, useEffect } from "react";

// ─── STYLE CONSTANTS ──────────────────────────────────────────────────────────

const FONTS = {
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
};

const COLORS = {
  bg: "#fcfcfc",
  charcoal: "#1a1a1a",
  mid: "#4a4a4a",
  muted: "#888",
  border: "#ccc",
  accent: "#c8a96e",
  accentLight: "#f5efe3",
  white: "#ffffff",
  cardBg: "#ffffff",
  softGray: "#f4f4f2",
};

const S = {
  // Layout
  pageWrap: {
    background: COLORS.bg,
    minHeight: "100vh",
    fontFamily: FONTS.sans,
    color: COLORS.charcoal,
    overflowX: "hidden",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    width: "100%",
    boxSizing: "border-box",
  },

  // Nav
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "rgba(252,252,252,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    boxSizing: "border-box",
  },
  navLogo: {
    fontFamily: FONTS.serif,
    fontSize: "clamp(14px, 3vw, 18px)",
    fontWeight: "700",
    color: COLORS.charcoal,
    letterSpacing: "-0.3px",
    cursor: "pointer",
    lineHeight: "1.2",
  },
  navLogoSub: {
    fontFamily: FONTS.sans,
    fontSize: "10px",
    fontWeight: "400",
    color: COLORS.muted,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
  },
  navLinks: {
    display: "flex",
    gap: "clamp(12px, 3vw, 32px)",
    alignItems: "center",
    flexWrap: "wrap",
  },
  navLink: {
    fontFamily: FONTS.sans,
    fontSize: "13px",
    fontWeight: "500",
    color: COLORS.mid,
    cursor: "pointer",
    letterSpacing: "0.5px",
    padding: "4px 0",
    transition: "color 0.2s",
    border: "none",
    background: "none",
    textDecoration: "none",
  },
  navLinkActive: {
    color: COLORS.charcoal,
    borderBottom: `1.5px solid ${COLORS.charcoal}`,
  },

  // Buttons
  btnPrimary: {
    background: COLORS.charcoal,
    color: COLORS.white,
    border: "none",
    borderRadius: "8px",
    padding: "14px 28px",
    fontFamily: FONTS.sans,
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
    display: "inline-block",
  },
  btnOutline: {
    background: "transparent",
    color: COLORS.charcoal,
    border: `1px solid ${COLORS.charcoal}`,
    borderRadius: "8px",
    padding: "13px 28px",
    fontFamily: FONTS.sans,
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    cursor: "pointer",
    display: "inline-block",
  },
  btnAccent: {
    background: COLORS.accent,
    color: COLORS.white,
    border: "none",
    borderRadius: "8px",
    padding: "14px 28px",
    fontFamily: FONTS.sans,
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-block",
  },

  // Cards
  card: {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
    background: COLORS.cardBg,
    boxSizing: "border-box",
  },
  cardDark: {
    border: "none",
    borderRadius: "12px",
    padding: "28px",
    background: COLORS.charcoal,
    color: COLORS.white,
    boxSizing: "border-box",
  },
  cardAccent: {
    border: `1px solid ${COLORS.accent}`,
    borderRadius: "12px",
    padding: "28px",
    background: COLORS.accentLight,
    boxSizing: "border-box",
  },

  // Typography
  displayHeading: {
    fontFamily: FONTS.serif,
    fontSize: "clamp(36px, 7vw, 80px)",
    fontWeight: "700",
    lineHeight: "1.05",
    letterSpacing: "-2px",
    color: COLORS.charcoal,
    margin: "0 0 24px 0",
  },
  h2: {
    fontFamily: FONTS.serif,
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "700",
    lineHeight: "1.1",
    letterSpacing: "-1px",
    color: COLORS.charcoal,
    margin: "0 0 16px 0",
  },
  h3: {
    fontFamily: FONTS.serif,
    fontSize: "clamp(18px, 3vw, 24px)",
    fontWeight: "700",
    lineHeight: "1.2",
    color: COLORS.charcoal,
    margin: "0 0 8px 0",
  },
  h3White: {
    fontFamily: FONTS.serif,
    fontSize: "clamp(18px, 3vw, 24px)",
    fontWeight: "700",
    lineHeight: "1.2",
    color: COLORS.white,
    margin: "0 0 8px 0",
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: "16px",
    lineHeight: "1.7",
    color: COLORS.mid,
    margin: "0 0 16px 0",
  },
  bodySmall: {
    fontFamily: FONTS.sans,
    fontSize: "14px",
    lineHeight: "1.6",
    color: COLORS.muted,
  },
  label: {
    fontFamily: FONTS.sans,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: COLORS.accent,
    display: "block",
    marginBottom: "12px",
  },

  // Form
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    fontFamily: FONTS.sans,
    fontSize: "13px",
    fontWeight: "600",
    color: COLORS.charcoal,
    marginBottom: "8px",
    letterSpacing: "0.2px",
  },
  formInput: {
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    fontFamily: FONTS.sans,
    fontSize: "15px",
    color: COLORS.charcoal,
    background: COLORS.white,
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  },
  formTextarea: {
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    fontFamily: FONTS.sans,
    fontSize: "15px",
    color: COLORS.charcoal,
    background: COLORS.white,
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
  },

  // Divider
  divider: {
    border: "none",
    borderTop: `1px solid ${COLORS.border}`,
    margin: "0",
  },

  // Footer
  footer: {
    borderTop: `1px solid ${COLORS.border}`,
    padding: "40px 24px",
    marginTop: "80px",
    background: COLORS.bg,
  },
};

// ─── GOOGLE FONTS LOADER ──────────────────────────────────────────────────────

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }) {
  const pages = ["Home", "Services", "About", "Contact"];
  return (
    <nav style={S.nav}>
      <div style={S.navInner}>
        <div style={{ cursor: "pointer" }} onClick={() => setPage("Home")}>
          <span style={S.navLogo}>
            Braces & Dental Works
            <span style={S.navLogoSub}>Prabhadevi, Mumbai</span>
          </span>
        </div>
        <div style={S.navLinks}>
          {pages.map((p) => (
            <button
              key={p}
              style={{
                ...S.navLink,
                ...(page === p ? S.navLinkActive : {}),
              }}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={S.container}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              alignItems: "flex-end",
            }}
          >
            {/* Left: text */}
            <div style={{ flex: "1 1 300px", minWidth: "260px" }}>
              <span style={S.label}>Est. Prabhadevi · Mumbai</span>
              <h1 style={S.displayHeading}>
                Modern
                <br />
                Orthodontics
                <br />
                in Prabhadevi.
              </h1>
              <p style={{ ...S.body, maxWidth: "420px" }}>
                Expert dental care in the heart of Mumbai — led by Dr. Sumit,
                where clinical precision meets a genuinely relaxed, friendly
                environment.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button style={S.btnPrimary} onClick={() => setPage("Contact")}>
                  Book an Appointment
                </button>
                <button style={S.btnOutline} onClick={() => setPage("Services")}>
                  Our Services
                </button>
              </div>
            </div>

            {/* Right: image placeholder */}
            <div style={{ flex: "1 1 300px", minWidth: "260px" }}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${COLORS.border}`,
                  position: "relative",
                  aspectRatio: "4/3",
                  background: "#e8e0d5",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80&auto=format&fit=crop"
                  alt="Modern dental clinic interior"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Tag overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    background: "rgba(255,255,255,0.92)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "11px",
                      fontWeight: "600",
                      color: COLORS.accent,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Krypton Terrace
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "12px",
                      color: COLORS.charcoal,
                      marginTop: "2px",
                    }}
                  >
                    Sayani Road, Prabhadevi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section
        style={{
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.softGray,
        }}
      >
        <div style={S.container}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0",
            }}
          >
            {[
              { num: "10+", label: "Years of Experience" },
              { num: "5000+", label: "Happy Patients" },
              { num: "15+", label: "Services Offered" },
              { num: "4.9★", label: "Patient Rating" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 120px",
                  padding: "28px 24px",
                  borderRight: i < 3 ? `1px solid ${COLORS.border}` : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: "700",
                    color: COLORS.charcoal,
                    lineHeight: "1",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ ...S.bodySmall, marginTop: "6px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section style={{ padding: "80px 0" }}>
        <div style={S.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div>
              <span style={S.label}>What We Do</span>
              <h2 style={S.h2}>Comprehensive Care,<br />Zero Compromise.</h2>
            </div>
            <button style={S.btnOutline} onClick={() => setPage("Services")}>
              View All →
            </button>
          </div>

          {/* Mini bento */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                icon: "◎",
                title: "Invisalign & Clear Aligners",
                desc: "Discreet, comfortable straightening with cutting-edge aligner technology.",
                dark: true,
              },
              {
                icon: "◈",
                title: "Metal & Ceramic Braces",
                desc: "Tried-and-true orthodontics for reliable, lasting results.",
              },
              {
                icon: "✦",
                title: "Root Canal Treatment",
                desc: "Pain-free, precision endodontic therapy with modern techniques.",
              },
              {
                icon: "◉",
                title: "Dental Implants",
                desc: "Permanent, natural-looking tooth replacement that lasts a lifetime.",
              },
            ].map((svc, i) => (
              <div
                key={i}
                style={svc.dark ? S.cardDark : S.card}
              >
                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "16px",
                    color: svc.dark ? COLORS.accent : COLORS.charcoal,
                  }}
                >
                  {svc.icon}
                </div>
                <h3 style={svc.dark ? S.h3White : S.h3}>{svc.title}</h3>
                <p
                  style={{
                    ...S.bodySmall,
                    color: svc.dark ? "rgba(255,255,255,0.6)" : COLORS.muted,
                    margin: 0,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          background: COLORS.charcoal,
          padding: "64px 24px",
          margin: "0",
        }}
      >
        <div
          style={{
            ...S.container,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div>
            <h2
              style={{
                ...S.h2,
                color: COLORS.white,
                margin: "0 0 8px 0",
              }}
            >
              Ready for a confident smile?
            </h2>
            <p style={{ ...S.body, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Walk-ins welcome. Zero judgment, full expertise.
            </p>
          </div>
          <button style={S.btnAccent} onClick={() => setPage("Contact")}>
            Schedule a Visit →
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────

function ServicesPage({ setPage }) {
  const services = [
    {
      id: "invisalign",
      label: "Featured Service",
      title: "Invisalign & Clear Aligners",
      desc: "Our most sought-after treatment. Clear aligners are virtually invisible, removable, and custom-crafted for your smile. Perfect for professionals and anyone who wants results without the hardware.",
      detail: ["Custom 3D-mapped treatment plan", "Remove for eating & brushing", "Avg. treatment: 6–18 months", "Suitable for teens & adults"],
      icon: "◎",
      featured: true,
    },
    {
      id: "braces",
      label: "Classic",
      title: "Metal & Ceramic Braces",
      desc: "The gold standard in orthodontics. Reliable, precise, and now more comfortable than ever. Ceramic options blend with your natural tooth colour.",
      detail: ["Most cost-effective option", "Handles complex cases", "Ceramic: discreet & elegant"],
      icon: "◈",
    },
    {
      id: "rct",
      label: "Restorative",
      title: "Root Canal Treatment",
      desc: "Modern RCT is nothing to fear. With advanced anaesthesia and rotary instruments, we make the procedure quick, precise, and nearly painless.",
      detail: ["Single or multi-sitting", "Rotary endodontics", "Crown placement available"],
      icon: "✦",
    },
    {
      id: "implants",
      label: "Permanent Solution",
      title: "Dental Implants",
      desc: "The closest thing to a real tooth. Titanium implants fuse with your jawbone for a stable, permanent, and beautiful replacement that can last decades.",
      detail: ["Titanium grade-IV implants", "Single & full-arch options", "Looks & feels completely natural"],
      icon: "◉",
    },
    {
      id: "whitening",
      label: "Cosmetic",
      title: "Teeth Whitening",
      desc: "Professional-grade whitening treatments that deliver real results — up to 8 shades lighter in a single visit.",
      detail: ["In-chair & take-home kits", "Safe enamel-friendly formula", "Immediate visible results"],
      icon: "◌",
    },
    {
      id: "cleaning",
      label: "Preventive",
      title: "Scaling & Polishing",
      desc: "Regular professional cleaning removes plaque and tartar that brushing can't reach, keeping your gums healthy and your smile bright.",
      detail: ["Ultrasonic + hand scaling", "Every 6 months recommended", "Includes oral hygiene guidance"],
      icon: "◇",
    },
  ];

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "64px 0 48px" }}>
        <div style={S.container}>
          <span style={S.label}>Full Spectrum Care</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <h1 style={{ ...S.h2, margin: 0 }}>
              Every smile.<br />Every need.
            </h1>
            <p style={{ ...S.body, maxWidth: "340px", margin: 0 }}>
              From your first consultation to final results, we handle it all
              under one roof in Prabhadevi.
            </p>
          </div>

          {/* BENTO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "auto",
              gap: "16px",
            }}
          >
            {/* FEATURED — spans 8 cols */}
            <div
              style={{
                gridColumn: "span 8",
                gridRow: "span 1",
                ...S.cardDark,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "280px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${COLORS.accent}22 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      background: COLORS.accent,
                      color: COLORS.white,
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {services[0].label}
                  </span>
                  <span style={{ fontSize: "24px" }}>{services[0].icon}</span>
                </div>
                <h2
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: "clamp(22px, 4vw, 36px)",
                    fontWeight: "700",
                    color: COLORS.white,
                    margin: "0 0 12px 0",
                    lineHeight: "1.1",
                  }}
                >
                  {services[0].title}
                </h2>
                <p
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: "1.6",
                    maxWidth: "480px",
                    margin: "0 0 24px 0",
                  }}
                >
                  {services[0].desc}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {services[0].detail.map((d, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "20px",
                      padding: "5px 12px",
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* BRACES — spans 4 cols */}
            <div
              style={{
                gridColumn: "span 4",
                ...S.cardAccent,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "280px",
              }}
            >
              <div>
                <span
                  style={{
                    ...S.label,
                    color: COLORS.charcoal,
                    opacity: 0.5,
                    marginBottom: "8px",
                  }}
                >
                  {services[1].label}
                </span>
                <div style={{ fontSize: "28px", margin: "12px 0" }}>
                  {services[1].icon}
                </div>
                <h3 style={S.h3}>{services[1].title}</h3>
                <p style={{ ...S.bodySmall, margin: "8px 0 0" }}>
                  {services[1].desc}
                </p>
              </div>
              <div style={{ marginTop: "16px" }}>
                {services[1].detail.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "12px",
                      color: COLORS.charcoal,
                      padding: "5px 0",
                      borderBottom:
                        i < services[1].detail.length - 1
                          ? `1px solid ${COLORS.border}`
                          : "none",
                    }}
                  >
                    ✓ {d}
                  </div>
                ))}
              </div>
            </div>

            {/* RCT — spans 4 cols */}
            <div
              style={{
                gridColumn: "span 4",
                ...S.card,
                display: "flex",
                flexDirection: "column",
                minHeight: "220px",
              }}
            >
              <span style={{ ...S.label }}>{services[2].label}</span>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>
                {services[2].icon}
              </div>
              <h3 style={S.h3}>{services[2].title}</h3>
              <p style={{ ...S.bodySmall, flex: 1 }}>{services[2].desc}</p>
              <div style={{ marginTop: "16px" }}>
                {services[2].detail.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "12px",
                      color: COLORS.muted,
                      marginBottom: "4px",
                    }}
                  >
                    — {d}
                  </div>
                ))}
              </div>
            </div>

            {/* IMPLANTS — spans 4 cols */}
            <div
              style={{
                gridColumn: "span 4",
                background: COLORS.charcoal,
                border: "none",
                borderRadius: "12px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                minHeight: "220px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  ...S.label,
                  color: COLORS.accent,
                  marginBottom: "8px",
                }}
              >
                {services[3].label}
              </span>
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "12px",
                  color: COLORS.white,
                }}
              >
                {services[3].icon}
              </div>
              <h3 style={S.h3White}>{services[3].title}</h3>
              <p
                style={{
                  ...S.bodySmall,
                  color: "rgba(255,255,255,0.55)",
                  flex: 1,
                }}
              >
                {services[3].desc}
              </p>
            </div>

            {/* WHITENING + CLEANING — spans 4 cols each */}
            {[services[4], services[5]].map((svc, i) => (
              <div
                key={i}
                style={{
                  gridColumn: "span 6",
                  ...S.card,
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    lineHeight: "1",
                    flexShrink: 0,
                    paddingTop: "4px",
                  }}
                >
                  {svc.icon}
                </div>
                <div>
                  <span style={{ ...S.label, marginBottom: "6px" }}>
                    {svc.label}
                  </span>
                  <h3 style={{ ...S.h3, marginBottom: "6px" }}>{svc.title}</h3>
                  <p style={{ ...S.bodySmall, margin: 0 }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: "64px 24px",
          textAlign: "center",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={S.container}>
          <span style={S.label}>Next Step</span>
          <h2 style={{ ...S.h2, marginBottom: "12px" }}>
            Not sure what you need?
          </h2>
          <p style={{ ...S.body, textAlign: "center", maxWidth: "480px", margin: "0 auto 28px" }}>
            Book a free consultation. Dr. Sumit will assess your needs and
            guide you to the right treatment — no pressure, no jargon.
          </p>
          <button style={S.btnPrimary} onClick={() => setPage("Contact")}>
            Book a Free Consult
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "64px 0" }}>
        <div style={S.container}>
          <span style={S.label}>Our Story</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "48px",
              alignItems: "flex-start",
            }}
          >
            {/* Left col */}
            <div style={{ flex: "1 1 300px" }}>
              <h1 style={{ ...S.h2, marginBottom: "24px" }}>
                Chill vibes.<br />Clinical precision.
              </h1>
              <p style={S.body}>
                At <strong>Braces and Dental Works</strong>, we believe that
                great dentistry doesn't have to be intimidating. Our practice in
                Prabhadevi was built around one idea: make world-class dental
                care feel approachable, warm, and unhurried.
              </p>
              <p style={S.body}>
                Led by <strong>Dr. Sumit</strong>, our team combines rigorous
                clinical training with a genuinely laid-back chair-side manner.
                Patients consistently describe the experience as "surprisingly
                chill" — which is exactly how we like it.
              </p>
              <p style={S.body}>
                We're conveniently located near the{" "}
                <strong>Motilal Oswal Tower</strong>, making us easy to reach
                from Dadar, Worli, Mahim, and the Western suburbs.
              </p>
              <button style={S.btnPrimary} onClick={() => setPage("Contact")}>
                Meet Us in Person →
              </button>
            </div>

            {/* Right col: Doctor card */}
            <div style={{ flex: "1 1 280px" }}>
              {/* Doctor card */}
              <div style={{ ...S.card, marginBottom: "16px" }}>
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.accent} 0%, #a0835a 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    fontSize: "28px",
                    color: COLORS.white,
                    fontFamily: FONTS.serif,
                    fontWeight: "700",
                  }}
                >
                  S
                </div>
                <h3 style={{ ...S.h3, marginBottom: "4px" }}>Dr. Sumit</h3>
                <p style={{ ...S.bodySmall, marginBottom: "16px" }}>
                  Lead Dentist & Orthodontist
                </p>
                <hr style={S.divider} />
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "BDS, MDS — Orthodontics",
                    "Invisalign Certified Provider",
                    "10+ years clinical experience",
                    "Known for: patience & clear communication",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "13px",
                        color: COLORS.mid,
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: COLORS.accent, flexShrink: 0 }}>
                        ✦
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote card */}
              <div style={S.cardAccent}>
                <div
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: "32px",
                    color: COLORS.accent,
                    lineHeight: "1",
                    marginBottom: "8px",
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: "clamp(15px, 2.5vw, 18px)",
                    lineHeight: "1.5",
                    color: COLORS.charcoal,
                    margin: "0 0 12px 0",
                    fontStyle: "italic",
                  }}
                >
                  I want every patient to leave feeling better — not just about
                  their teeth, but about the whole experience.
                </p>
                <p style={{ ...S.bodySmall, margin: 0 }}>— Dr. Sumit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          padding: "64px 0",
          borderTop: `1px solid ${COLORS.border}`,
          background: COLORS.softGray,
        }}
      >
        <div style={S.container}>
          <span style={S.label}>Why Choose Us</span>
          <h2 style={{ ...S.h2, marginBottom: "40px" }}>
            The Braces & Dental<br />Difference
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                icon: "◎",
                title: "Unhurried Appointments",
                desc: "We never rush. Your consultation gets the time it deserves.",
              },
              {
                icon: "◈",
                title: "Transparent Pricing",
                desc: "No hidden costs. Full treatment plans with clear breakdowns.",
              },
              {
                icon: "✦",
                title: "Latest Technology",
                desc: "Digital X-rays, 3D scanning, rotary endodontics — the works.",
              },
              {
                icon: "◉",
                title: "Central Location",
                desc: "Near Motilal Oswal Tower on Sayani Road. Easy parking & metro access.",
              },
            ].map((val, i) => (
              <div key={i} style={{ ...S.card, background: COLORS.white }}>
                <div
                  style={{
                    fontSize: "22px",
                    marginBottom: "14px",
                    color: COLORS.accent,
                  }}
                >
                  {val.icon}
                </div>
                <h3 style={{ ...S.h3, marginBottom: "8px" }}>{val.title}</h3>
                <p style={{ ...S.bodySmall, margin: 0 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "64px 0" }}>
        <div style={S.container}>
          <span style={S.label}>Get in Touch</span>
          <h1 style={{ ...S.h2, marginBottom: "8px" }}>
            Come see us in<br />Prabhadevi.
          </h1>
          <p style={{ ...S.body, marginBottom: "48px", maxWidth: "480px" }}>
            Book an appointment, ask a question, or just drop by. We're easy to
            find and always happy to help.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            {/* Form */}
            <div style={{ flex: "1 1 300px" }}>
              {sent ? (
                <div
                  style={{
                    ...S.cardAccent,
                    textAlign: "center",
                    padding: "48px 32px",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "16px" }}>✦</div>
                  <h3 style={{ ...S.h3, marginBottom: "8px" }}>
                    Message Received!
                  </h3>
                  <p style={{ ...S.body, margin: 0 }}>
                    Thanks! We'll reach out to confirm your appointment shortly.
                  </p>
                </div>
              ) : (
                <div style={{ ...S.card }}>
                  <h3 style={{ ...S.h3, marginBottom: "24px" }}>
                    Book an Appointment
                  </h3>

                  <div style={S.formGroup}>
                    <label style={S.formLabel}>Full Name *</label>
                    <input
                      style={S.formInput}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ ...S.formGroup, flex: "1 1 120px" }}>
                      <label style={S.formLabel}>Phone *</label>
                      <input
                        style={S.formInput}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98XXX XXXXX"
                        required
                      />
                    </div>
                    <div style={{ ...S.formGroup, flex: "1 1 120px" }}>
                      <label style={S.formLabel}>Email</label>
                      <input
                        style={S.formInput}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div style={S.formGroup}>
                    <label style={S.formLabel}>Service of Interest</label>
                    <select
                      style={S.formInput}
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service...</option>
                      <option>Invisalign & Clear Aligners</option>
                      <option>Metal / Ceramic Braces</option>
                      <option>Root Canal Treatment</option>
                      <option>Dental Implants</option>
                      <option>Teeth Whitening</option>
                      <option>Scaling & Polishing</option>
                      <option>General Consultation</option>
                    </select>
                  </div>

                  <div style={S.formGroup}>
                    <label style={S.formLabel}>Additional Notes</label>
                    <textarea
                      style={S.formTextarea}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Anything you'd like us to know before your visit..."
                    />
                  </div>

                  <button
                    style={{ ...S.btnPrimary, width: "100%", textAlign: "center" }}
                    onClick={handleSubmit}
                  >
                    Submit Request
                  </button>
                </div>
              )}
            </div>

            {/* Info sidebar */}
            <div
              style={{
                flex: "0 1 300px",
                minWidth: "260px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Address */}
              <div style={S.cardDark}>
                <span
                  style={{ ...S.label, color: COLORS.accent, marginBottom: "16px" }}
                >
                  Address
                </span>
                <p
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: "18px",
                    color: COLORS.white,
                    lineHeight: "1.5",
                    margin: "0 0 12px 0",
                  }}
                >
                  C-Wing, Krypton Terrace,
                  <br />
                  19, Sayani Rd,
                  <br />
                  Prabhadevi,
                  <br />
                  Mumbai — 400 025
                </p>
                <p
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  Near Motilal Oswal Tower
                </p>
              </div>

              {/* Hours */}
              <div style={S.card}>
                <span style={{ ...S.label, marginBottom: "16px" }}>
                  Clinic Hours
                </span>
                {[
                  { day: "Mon – Fri", time: "10:00 AM – 8:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 6:00 PM" },
                  { day: "Sunday", time: "By Appointment" },
                ].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom:
                        i < 2 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "13px",
                        color: COLORS.mid,
                        fontWeight: "500",
                      }}
                    >
                      {h.day}
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "13px",
                        color: COLORS.charcoal,
                        fontWeight: "600",
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div style={S.card}>
                <span style={{ ...S.label, marginBottom: "16px" }}>
                  Contact
                </span>
                {[
                  { icon: "📞", val: "+91 98XXX XXXXX" },
                  { icon: "✉", val: "hello@bracesdentalworks.com" },
                  { icon: "📍", val: "Prabhadevi, Mumbai" },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{c.icon}</span>
                    <span
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "13px",
                        color: COLORS.mid,
                      }}
                    >
                      {c.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={S.footer}>
      <div style={S.container}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          <div style={{ flex: "1 1 200px" }}>
            <div style={{ ...S.navLogo, cursor: "default" }}>
              Braces & Dental Works
              <span style={S.navLogoSub}>Prabhadevi, Mumbai</span>
            </div>
            <p style={{ ...S.bodySmall, marginTop: "12px", maxWidth: "240px" }}>
              Modern orthodontics with a human touch. Serving Prabhadevi and
              all of South Mumbai.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div>
              <div
                style={{
                  ...S.label,
                  color: COLORS.charcoal,
                  marginBottom: "12px",
                }}
              >
                Navigate
              </div>
              {["Home", "Services", "About", "Contact"].map((p) => (
                <div key={p} style={{ marginBottom: "8px" }}>
                  <button
                    style={{
                      ...S.navLink,
                      fontSize: "14px",
                      padding: 0,
                      color: COLORS.muted,
                    }}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  ...S.label,
                  color: COLORS.charcoal,
                  marginBottom: "12px",
                }}
              >
                Location
              </div>
              <p
                style={{
                  ...S.bodySmall,
                  lineHeight: "1.8",
                  maxWidth: "200px",
                }}
              >
                C-Wing, Krypton Terrace
                <br />
                19, Sayani Rd
                <br />
                Prabhadevi, Mumbai 400025
                <br />
                <span style={{ color: COLORS.accent }}>
                  Near Motilal Oswal Tower
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr style={S.divider} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            gap: "8px",
          }}
        >
          <p style={{ ...S.bodySmall, margin: 0 }}>
            © 2025 Braces and Dental Works. All rights reserved.
          </p>
          <p style={{ ...S.bodySmall, margin: 0 }}>
            Prabhadevi, Mumbai · MH Dental Reg. No. XXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={S.pageWrap}>
      <FontLoader />
      <Nav page={page} setPage={setPage} />

      {page === "Home" && <HomePage setPage={setPage} />}
      {page === "Services" && <ServicesPage setPage={setPage} />}
      {page === "About" && <AboutPage setPage={setPage} />}
      {page === "Contact" && <ContactPage />}

      <Footer setPage={setPage} />
    </div>
  );
}