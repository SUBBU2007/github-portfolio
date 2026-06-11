"use client"

import { motion } from "framer-motion"

function DotGrid() {
  const dots = Array.from({ length: 25 })

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "6px",
      }}
    >
      {dots.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: (i % 5) * 0.1 + Math.floor(i / 5) * 0.1,
            ease: "easeInOut",
          }}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#58a6ff",
          }}
        />
      ))}
    </div>
  )
}

function SkeletonLine({ width = "100%", height = "14px", delay = 0 }) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        width,
        height,
        backgroundColor: "#21262d",
        borderRadius: "6px",
      }}
    />
  )
}

export default function LoadingPortfolio() {
  return (
    <main
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        padding: "60px 24px",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(88,166,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Back button skeleton */}
        <div style={{ marginBottom: "40px" }}>
          <SkeletonLine width="60px" height="14px" />
        </div>

        {/* Profile skeleton */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {/* Avatar skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              backgroundColor: "#21262d",
              border: "2px solid #30363d",
            }}
          />

          {/* Name skeleton */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <SkeletonLine width="180px" height="28px" delay={0.1} />
            <SkeletonLine width="120px" height="16px" delay={0.15} />
            <SkeletonLine width="140px" height="14px" delay={0.2} />
          </div>

          {/* Stats skeleton */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
            style={{
              display: "flex",
              border: "1px solid #30363d",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#161b22",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  borderRight: i < 2 ? "1px solid #30363d" : "none",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "20px",
                    backgroundColor: "#21262d",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    width: "60px",
                    height: "12px",
                    backgroundColor: "#21262d",
                    borderRadius: "4px",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Languages skeleton */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
          style={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <SkeletonLine width="120px" height="12px" delay={0.3} />
          <div style={{ marginTop: "16px" }}>
            <SkeletonLine width="100%" height="8px" delay={0.35} />
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
            {[80, 60, 40].map((w, i) => (
              <SkeletonLine key={i} width={`${w}px`} height="12px" delay={0.4 + i * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Contribution graph skeleton */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
          style={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <SkeletonLine width="160px" height="12px" delay={0.4} />

          {/* Stats row skeleton */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              border: "1px solid #30363d",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#30363d",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: "16px 8px",
                  backgroundColor: "#0d1117",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div style={{ width: "50px", height: "18px", backgroundColor: "#21262d", borderRadius: "4px" }} />
                <div style={{ width: "70px", height: "11px", backgroundColor: "#21262d", borderRadius: "4px" }} />
              </div>
            ))}
          </div>

          {/* Dot grid loader — center piece */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "24px 0",
            }}
          >
            <DotGrid />
            <p style={{ fontSize: "13px", color: "#8b949e", margin: 0 }}>
              Fetching GitHub activity...
            </p>
          </div>
        </motion.div>

        {/* Repos skeleton */}
        <div>
          <SkeletonLine width="140px" height="12px" delay={0.5} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5 + i * 0.05,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <SkeletonLine width="60%" height="15px" delay={0.5 + i * 0.05} />
                <SkeletonLine width="90%" height="13px" delay={0.55 + i * 0.05} />
                <SkeletonLine width="75%" height="13px" delay={0.6 + i * 0.05} />
                <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                  <SkeletonLine width="50px" height="12px" delay={0.65 + i * 0.05} />
                  <SkeletonLine width="40px" height="12px" delay={0.7 + i * 0.05} />
                  <SkeletonLine width="40px" height="12px" delay={0.75 + i * 0.05} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}