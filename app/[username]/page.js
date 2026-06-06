import ProfileCard from "@/components/ProfileCard"
import RepoGrid from "@/components/RepoGrid"

export default async function PortfolioPage({ params }) {
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
        <a
          href="/"
          style={{ color: "#58a6ff", fontSize: "14px", textDecoration: "none" }}
        >
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
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#8b949e",
            fontSize: "14px",
            textDecoration: "none",
            marginBottom: "40px",
          }}
        >
          Back
        </a>

        <ProfileCard profile={data.profile} languages={data.languages} />
        <RepoGrid repos={data.topRepos} />
      </div>
    </main>
  )
}