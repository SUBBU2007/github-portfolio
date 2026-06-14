import AllReposView from "@/components/AllReposView"

export default async function AllReposPage({ params }) {
  const { username } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?username=${username}`,
    { cache: "no-store" }
  )

  const data = await res.json()

  if (data.error) {
    return (
      <main
        style={{
          backgroundColor: "#0d1117",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p style={{ fontSize: "48px" }}>⚠️</p>
        <p style={{ color: "#f85149", fontSize: "18px" }}>{data.error}</p>
        <a href="/" style={{ color: "#58a6ff", fontSize: "14px", textDecoration: "none" }}>
          Go back
        </a>
      </main>
    )
  }

  return (
    <main
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <a
            href={`/${username}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#8b949e",
              fontSize: "14px",
              textDecoration: "none",
              marginBottom: "16px",
            }}
          >
            ← Back to portfolio
          </a>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: "#e6edf3",
              letterSpacing: "-0.02em",
            }}
          >
            All Repositories
          </h1>
          <p style={{ color: "#8b949e", fontSize: "14px", marginTop: "6px" }}>
            @{username}
          </p>
        </div>

        <AllReposView repos={data.allRepos} />
      </div>
    </main>
  )
}