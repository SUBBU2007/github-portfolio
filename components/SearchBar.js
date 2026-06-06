"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleSubmit() {
    const cleaned = username.trim()
    if (!cleaned) {
      setError("Please enter a GitHub username")
      return
    }
    const valid = /^[a-zA-Z0-9-]+$/.test(cleaned)
    if (!valid) {
      setError("Invalid GitHub username")
      return
    }
    setError("")
    setLoading(true)
    router.push(`/${cleaned}`)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          borderRadius: "12px",
          padding: "6px 6px 6px 20px",
          transition: "border-color 0.2s ease",
        }}
        onFocus={() => {}}
      >
        {/* GitHub icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#8b949e"
          style={{ flexShrink: 0, marginRight: "12px" }}
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>

        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#e6edf3",
            fontSize: "16px",
            fontFamily: "var(--font-inter)",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#58a6ff",
            color: "#0d1117",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-inter)",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = "#79c0ff"
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = "#58a6ff"
          }}
        >
          {loading ? "Loading..." : "Generate →"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#f85149", fontSize: "13px", paddingLeft: "4px" }}>
          {error}
        </p>
      )}
    </div>
  )
}