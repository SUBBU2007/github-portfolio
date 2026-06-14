"use client"

import { useState, useMemo } from "react"
import RepoCard from "@/components/RepoCard"
import RepoFilters from "@/components/RepoFilters"

export default function AllReposView({ repos }) {
  const [sortBy, setSortBy] = useState("updated")
  const [language, setLanguage] = useState("all")
  const [showForks, setShowForks] = useState(false)

  const languages = useMemo(() => {
    const set = new Set()
    repos.forEach((r) => {
      if (r.language) set.add(r.language)
    })
    return Array.from(set).sort()
  }, [repos])

  const filtered = useMemo(() => {
    let result = repos.filter((r) => !r.isArchived)

    if (!showForks) {
      result = result.filter((r) => !r.isFork)
    }

    if (language !== "all") {
      result = result.filter((r) => r.language === language)
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars
      if (sortBy === "forks") return b.forks - a.forks
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    return result
  }, [repos, sortBy, language, showForks])

  return (
    <div>
      <RepoFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        language={language}
        setLanguage={setLanguage}
        showForks={showForks}
        setShowForks={setShowForks}
        languages={languages}
        totalCount={repos.length}
        filteredCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#484f58",
            fontSize: "15px",
          }}
        >
          No repositories match these filters.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {filtered.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}