"use client"

import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
})

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

function getLanguageColor(language) {
  return languageColors[language] || "#8b949e"
}

export default function ProfileCard({ profile, languages }) {
  const totalRepos = languages.reduce((sum, l) => sum + l.count, 0)

  return (
    <div style={{ width: "100%" }}>
      {/* Profile header */}
      <motion.div
        {...fadeUp(0)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
          }}
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            width={110}
            height={110}
            style={{
              borderRadius: "50%",
              border: "2px solid #30363d",
              display: "block",
            }}
          />
          {/* Online dot */}
          <div
            style={{
              position: "absolute",
              bottom: "6px",
              right: "6px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#3fb950",
              border: "2px solid #0d1117",
            }}
          />
        </motion.div>

        {/* Name and username */}
        <motion.div {...fadeUp(0.1)}>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: "#e6edf3",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {profile.name || profile.username}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#8b949e",
              marginTop: "4px",
              fontFamily: "var(--font-mono)",
            }}
          >
            @{profile.username}
          </p>
        </motion.div>

        {/* Bio */}
        {profile.bio && (
          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: "15px",
              color: "#8b949e",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            {profile.bio}
          </motion.p>
        )}

        {/* Location and website */}
        <motion.div
          {...fadeUp(0.25)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {profile.location && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                color: "#8b949e",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                color: "#58a6ff",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "#58a6ff",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#58a6ff">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub Profile
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            display: "flex",
            gap: "0",
            border: "1px solid #30363d",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#161b22",
          }}
        >
          {[
            { label: "Followers", value: profile.followers.toLocaleString() },
            { label: "Following", value: profile.following.toLocaleString() },
            { label: "Repositories", value: profile.publicRepos.toLocaleString() },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "16px 28px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid #30363d" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#e6edf3",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "#8b949e", marginTop: "2px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Languages */}
      {languages.length > 0 && (
        <motion.div
          {...fadeUp(0.35)}
          style={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#8b949e",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
            }}
          >
            Top Languages
          </h3>

          {/* Language bar */}
          <div
            style={{
              display: "flex",
              height: "8px",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "16px",
              gap: "2px",
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.language}
                style={{
                  height: "100%",
                  width: `${(lang.count / totalRepos) * 100}%`,
                  backgroundColor: getLanguageColor(lang.language),
                  borderRadius: "999px",
                }}
              />
            ))}
          </div>

          {/* Language labels */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {languages.map((lang) => (
              <div
                key={lang.language}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "#e6edf3",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: getLanguageColor(lang.language),
                    flexShrink: 0,
                  }}
                />
                {lang.language}
                <span style={{ color: "#8b949e" }}>
                  {Math.round((lang.count / totalRepos) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}