import ProfileCard from "@/components/ProfileCard"
import RepoGrid from "@/components/RepoGrid"
import ShareButton from "@/components/ShareButton"

export async function generateMetadata({ params }) {
  const { username } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?username=${username}`,
    { cache: "no-store" }
  )
  const data = await res.json()

  if (data.error) {
    return { title: "User not found — GitFolio" }
  }

  const { profile } = data

  return {
    title: `${profile.name || profile.username} — GitFolio`,
    description: `${profile.followers.toLocaleString()} followers · ${profile.publicRepos} repos · ${profile.bio || "GitHub developer portfolio"}`,
    openGraph: {
      title: `${profile.name || profile.username} — GitFolio`,
      description: `${profile.followers.toLocaleString()} followers · ${profile.publicRepos} repos`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?username=${username}`,
          width: 1200,
          height: 630,
          alt: `${profile.username} GitHub Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name || profile.username} — GitFolio`,
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?username=${username}`],
    },
  }
}

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
        position: "relative",
      }}
    >
      {/* Background glow */}
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

      {/* Main content wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {/* Header with back button and share button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
            gap: "16px",
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
              hover: { color: "#58a6ff" },
              transition: "color 0.2s",
            }}
          >
            ← Back
          </a>
          <ShareButton username={data.profile.username} />
        </div>

        {/* Profile Card */}
        <div style={{ marginBottom: "40px" }}>
          <ProfileCard profile={data.profile} languages={data.languages} />
        </div>

        {/* Repos Grid */}
        <div>
          <RepoGrid repos={data.topRepos} />
        </div>
      </div>
    </main>
  )
}