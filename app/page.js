"use client"

import { motion } from "framer-motion"
import SearchBar from "@/components/SearchBar"
import FlipText from "@/components/FlipText"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Home() {
  return (
    <main
      style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6"
    >
      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(88, 166, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 166, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "720px",
        }}
        className="flex flex-col items-center gap-12"
      >
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              border: "1px solid #30363d",
              borderRadius: "999px",
              backgroundColor: "#161b22",
              fontSize: "12px",
              color: "#8b949e",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#3fb950",
                display: "inline-block",
              }}
            />
            GitHub Portfolio Generator
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          {...fadeUp(0.15)}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* <h1
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#e6edf3",
            }}
          >
            Your GitHub,{" "}
            <span className="gradient-text">beautifully</span>
            <br />
            presented.
          </h1> */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#e6edf3",
            }}
          >
            Your GitHub,{" "}
            <FlipText
              words={["beautifully", "instantly", "effortlessly"]}
              className="gradient-text"
            />
            <br />
            presented.
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#8b949e",
              maxWidth: "480px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Enter any GitHub username and get a clean, shareable developer
            portfolio, instantly generated from public data.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div {...fadeUp(0.3)} style={{ width: "100%" }}>
          <SearchBar />
        </motion.div>

        {/* Footer hint */}
        <motion.p
          {...fadeUp(0.45)}
          style={{ fontSize: "13px", color: "#484f58" }}
        >
          Try{" "}
          <span style={{ color: "#58a6ff", cursor: "pointer" }}>torvalds</span>
          {" · "}
          <span style={{ color: "#58a6ff", cursor: "pointer" }}>gaearon</span>
          {" · "}
          <span style={{ color: "#58a6ff", cursor: "pointer" }}>
            sindresorhus
          </span>
        </motion.p>
      </div>
    </main>
  );
}