import { Suspense } from "react"
import PortfolioContent from "@/components/PortfolioContent"
import LoadingPortfolio from "@/components/LoadingPortfolio"

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

  return (
    <main
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        padding: "60px 24px",
        position: "relative",
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
        <Suspense fallback={<LoadingPortfolio />}>
          <PortfolioContent username={username} />
        </Suspense>
      </div>
    </main>
  )
}