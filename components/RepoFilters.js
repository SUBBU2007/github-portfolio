"use client"

export default function RepoFilters({
  sortBy,
  setSortBy,
  language,
  setLanguage,
  showForks,
  setShowForks,
  languages,
  totalCount,
  filteredCount,
}) {
  const selectStyle = {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "8px",
    color: "#e6edf3",
    fontSize: "13px",
    padding: "8px 12px",
    fontFamily: "var(--font-inter)",
    cursor: "pointer",
    outline: "none",
  }

  const labelStyle = {
    fontSize: "12px",
    color: "#8b949e",
    marginBottom: "6px",
    display: "block",
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "flex-end",
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "12px",
      }}
    >
      {/* Sort */}
      <div>
        <label style={labelStyle}>Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={selectStyle}
        >
          <option value="updated">Recently updated</option>
          <option value="stars">Most stars</option>
          <option value="forks">Most forks</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label style={labelStyle}>Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Fork toggle */}
      <div>
        <label style={labelStyle}>Forks</label>
        <button
          onClick={() => setShowForks(!showForks)}
          style={{
            ...selectStyle,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              border: "1px solid #58a6ff",
              backgroundColor: showForks ? "#58a6ff" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#0d1117",
            }}
          >
            {showForks && "✓"}
          </span>
          Show forks
        </button>
      </div>

      {/* Count */}
      <div style={{ marginLeft: "auto", alignSelf: "center" }}>
        <span style={{ fontSize: "13px", color: "#8b949e" }}>
          Showing {filteredCount} of {totalCount}
        </span>
      </div>
    </div>
  )
}