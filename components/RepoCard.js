"use client"

import { motion } from "framer-motion"

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  OpenSCAD: "#e5cd31",
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 1) return "today"
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function RepoCard({ repo, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="card-glow"
      style={{
        backgroundColor: "#161b22",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      whileHover={{ y: -4 }}
      onClick={() => window.open(repo.url, "_blank")}
    >
      {/* Repo name */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" style={{ flexShrink: 0 }}>
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
          </svg>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#58a6ff",
              fontFamily: "var(--font-mono)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {repo.name}
          </span>
        </div>

        {/* Arrow */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Description */}
      {repo.description && (
        <p
          style={{
            fontSize: "13px",
            color: "#8b949e",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {repo.description}
        </p>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "auto",
          flexWrap: "wrap",
        }}
      >
        {repo.language && (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: languageColors[repo.language] || "#8b949e",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "12px", color: "#8b949e" }}>{repo.language}</span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{ fontSize: "12px", color: "#8b949e" }}>{repo.stars.toLocaleString()}</span>
        </div>

        {repo.forks > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
              <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
              <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" /><line x1="12" y1="12" x2="12" y2="15" />
            </svg>
            <span style={{ fontSize: "12px", color: "#8b949e" }}>{repo.forks.toLocaleString()}</span>
          </div>
        )}

        <span style={{ fontSize: "12px", color: "#484f58", marginLeft: "auto" }}>
          {timeAgo(repo.updated_at)}
        </span>
      </div>

      {/* Live demo link */}
      {repo.homepage && (
        <a
          href={repo.homepage}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "#3fb950",
            textDecoration: "none",
            marginTop: "-4px",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Live Demo
        </a>
      )}
    </motion.div>
  )
}