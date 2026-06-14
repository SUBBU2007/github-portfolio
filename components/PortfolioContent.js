import ProfileCard from "@/components/ProfileCard"
import RepoGrid from "@/components/RepoGrid"
import ShareButton from "@/components/ShareButton"
import ContributionGraph from "@/components/ContributionGraph"

export default async function PortfolioContent({ username }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?username=${username}`,
    { cache: "no-store" }
  )

  const data = await res.json()

  if (data.error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          minHeight: "60vh",
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
      </div>
    )
  }

  return (
    <>
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
          }}
        >
          ← Back
        </a>
        <ShareButton username={data.profile.username} />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <ProfileCard profile={data.profile} languages={data.languages} />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <ContributionGraph contributions={data.contributions} />
      </div>

      <div>
        <RepoGrid repos={data.topRepos} />

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href={`/${data.profile.username}/repos`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#58a6ff",
              fontSize: "14px",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid #30363d",
              borderRadius: "8px",
              backgroundColor: "#161b22",
            }}
          >
            View all {data.profile.publicRepos} repositories →
          </a>
        </div>
      </div>
    </>
  );
}