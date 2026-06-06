"use client"

import { motion } from "framer-motion"
import RepoCard from "@/components/RepoCard"

export default function RepoGrid({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#484f58",
          fontSize: "15px",
        }}
      >
        No public repositories found.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#8b949e",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "16px",
        }}
      >
        Top Repositories
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </motion.div>
  )
}