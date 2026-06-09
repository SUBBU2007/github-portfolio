"use client"

import { useState } from "react"
import { motion } from "framer-motion"

function getColor(count) {
  if (count === 0) return "#161b22"
  if (count <= 3) return "#0e4429"
  if (count <= 6) return "#006d32"
  if (count <= 9) return "#26a641"
  return "#39d353"
}

function chunkIntoWeeks(days) {
  const weeks = []
  let week = []

  const firstDayOfWeek = new Date(days[0].date).getDay()

  for (let i = 0; i < firstDayOfWeek; i++) {
    week.push(null)
  }

  days.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })

  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }

  return weeks
}

function getMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1

  weeks.forEach((week, i) => {
    const firstValidDay = week.find((d) => d !== null)
    if (!firstValidDay) return

    const month = new Date(firstValidDay.date).getMonth()
    if (month !== lastMonth) {
      labels.push({
        index: i,
        label: new Date(firstValidDay.date).toLocaleString("en-US", { month: "short" })
      })
      lastMonth = month
    }
  })

  return labels
}

export default function ContributionGraph({ contributions }) {
  const [tooltip, setTooltip] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  if (!contributions || !contributions.days) {
    return null
  }

  const { totalContributions, currentStreak, longestStreak, mostActiveDay, days } = contributions
  const weeks = chunkIntoWeeks(days)
  const monthLabels = getMonthLabels(weeks)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        backgroundColor: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "32px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header with info button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#8b949e",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          Contribution Activity
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
          style={{
            background: "none",
            border: "1px solid #30363d",
            borderRadius: "6px",
            color: "#8b949e",
            cursor: "pointer",
            padding: "4px 8px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#58a6ff"
            e.currentTarget.style.color = "#58a6ff"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#30363d"
            e.currentTarget.style.color = "#8b949e"
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          How it works
        </motion.button>
      </div>

      {/* Info section - collapsible */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "#0d1117",
            border: "1px solid #30363d",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
            fontSize: "12px",
            lineHeight: "1.6",
            color: "#8b949e",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div style={{ color: "#e6edf3", fontWeight: 600, marginBottom: "6px" }}>
              📊 How we calculate contributions:
            </div>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                <span style={{ color: "#58a6ff" }}>Public events only</span> — We count push events, pull requests, and issues from your public GitHub activity
              </li>
              <li>
                <span style={{ color: "#58a6ff" }}>Recent data</span> — Shows your last ~300 public events (typically last 2-4 weeks for active developers)
              </li>
              <li>
                <span style={{ color: "#58a6ff" }}>Not private activity</span> — Private repos and commits to private branches are not included
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div style={{ color: "#e6edf3", fontWeight: 600, marginBottom: "6px" }}>
              ⚠️ Differences from GitHub's graph:
            </div>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                <span style={{ color: "#f85149" }}>Different time range</span> — GitHub shows full year, we show recent activity
              </li>
              <li>
                <span style={{ color: "#f85149" }}>Event-based</span> — We count events, not individual commits
              </li>
              <li>
                <span style={{ color: "#f85149" }}>Public data only</span> — GitHub includes private contributions
              </li>
            </ul>
          </div>

          <div style={{ paddingTop: "12px", borderTop: "1px solid #30363d" }}>
            <div style={{ color: "#e6edf3", fontWeight: 600, marginBottom: "6px" }}>
              ✅ What it shows:
            </div>
            <p style={{ margin: "8px 0" }}>
              This graph is <strong>great for showing recent activity and consistency</strong>. It's perfect for demonstrating that you're actively coding right now, not a year-old metric.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats row — responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: "1px",
          border: "1px solid #30363d",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#0d1117",
          marginBottom: "24px",
        }}
      >
        {[
          { label: "Total", value: totalContributions.toLocaleString("en-US") },
          { label: "Longest Streak", value: `${longestStreak} days` },
          { label: "Current Streak", value: `${currentStreak} days` },
          { label: "Most Active", value: mostActiveDay || "N/A" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "16px 8px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #30363d" : "none",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#e6edf3",
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#8b949e",
                marginTop: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap — scrollable without overlays */}
      <div
        style={{
          position: "relative",
          marginBottom: "12px",
          border: "1px solid #30363d",
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#0d1117",
        }}
      >
        {/* Scrollable container */}
        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: "4px",
            width: "100%",
            maxWidth: "100%",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "#30363d #161b22",
          }}
        >
          <div style={{ minWidth: "min-content" }}>
            {/* Month labels */}
            <div
              style={{
                display: "flex",
                marginBottom: "8px",
                marginLeft: "28px",
                position: "relative",
                height: "16px",
                paddingRight: "4px",
                minWidth: "min-content",
              }}
            >
              {monthLabels.map((m, idx) => (
                <div
                  key={`${m.label}-${m.index}`}
                  style={{
                    position: "absolute",
                    left: `${m.index * 13}px`,
                    fontSize: "11px",
                    color: "#8b949e",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: "flex", gap: "3px", alignItems: "flex-start" }}>
              {/* Day labels */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  marginRight: "4px",
                  minWidth: "28px",
                }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                  <div
                    key={day}
                    style={{
                      height: "10px",
                      fontSize: "10px",
                      color: i % 2 === 0 ? "transparent" : "#8b949e",
                      lineHeight: "10px",
                      width: "28px",
                      textAlign: "right",
                      paddingRight: "4px",
                      flexShrink: 0,
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Weeks */}
              <div style={{ display: "flex", gap: "3px", flexWrap: "nowrap", minWidth: "min-content" }}>
                {weeks.map((week, wi) => (
                  <div
                    key={wi}
                    style={{ display: "flex", flexDirection: "column", gap: "3px" }}
                  >
                    {week.map((day, di) => (
                      <motion.div
                        key={`${wi}-${di}`}
                        whileHover={day ? { scale: 1.4 } : {}}
                        onMouseEnter={(e) => {
                          if (day) {
                            setTooltip({
                              day,
                              wi,
                              di,
                              clientX: e.clientX,
                              clientY: e.clientY,
                            })
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px",
                          backgroundColor: day ? getColor(day.count) : "#161b22",
                          cursor: day ? "pointer" : "default",
                          transition: "all 0.2s ease",
                          border: day
                            ? tooltip?.day?.date === day?.date
                              ? "1px solid #58a6ff"
                              : "1px solid transparent"
                            : "1px solid #30363d",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint text at bottom */}
        <div
          style={{
            fontSize: "10px",
            color: "#8b949e",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          ← Scroll to see all weeks →
        </div>
      </div>

      {/* Tooltip — floating, no layout shift */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{
            position: "fixed",
            padding: "8px 12px",
            backgroundColor: "#0d1117",
            border: "1px solid #30363d",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#e6edf3",
            pointerEvents: "none",
            zIndex: 1000,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            top: `${Math.max(20, tooltip.clientY - 40)}px`,
            left: `${Math.max(20, tooltip.clientX - 60)}px`,
          }}
        >
          <span style={{ color: "#3fb950", fontWeight: 600 }}>
            {tooltip.day.count} contribution{tooltip.day.count !== 1 ? "s" : ""}
          </span>
          {" on "}
          {new Date(tooltip.day.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </motion.div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "16px",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", color: "#8b949e" }}>Less</span>
        {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((color) => (
          <div
            key={color}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor: color,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        ))}
        <span style={{ fontSize: "11px", color: "#8b949e" }}>More</span>
      </div>
    </motion.div>
  )
}