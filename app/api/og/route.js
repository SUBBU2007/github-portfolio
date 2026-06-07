import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return new Response("Missing username", { status: 400 })
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?username=${username}`
    )
    const data = await res.json()

    if (data.error) {
      return new Response(data.error, { status: 404 })
    }

    const { profile, languages } = data
    const topLang = languages[0] || null

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
      HTML: "#e34c26",
      CSS: "#563d7c",
      Shell: "#89e051",
      Vue: "#41b883",
      Svelte: "#ff3e00",
      OpenSCAD: "#e5cd31",
    }

    const langColor = topLang
      ? languageColors[topLang.language] || "#8b949e"
      : "#8b949e"

    const totalRepos = languages.reduce((s, l) => s + l.count, 0)

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            backgroundColor: "#0d1117",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top — avatar + name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <img
              src={profile.avatar}
              width={100}
              height={100}
              style={{
                borderRadius: "50%",
                border: "2px solid #30363d",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#e6edf3",
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                }}
              >
                {profile.name || profile.username}
              </div>
              <div style={{ fontSize: "22px", color: "#8b949e", display: "flex" }}>
                @{profile.username}
              </div>
              {profile.location && (
                <div style={{ fontSize: "18px", color: "#8b949e", display: "flex" }}>
                  {profile.location}
                </div>
              )}
            </div>
          </div>

          {/* Middle — stats */}
          <div
            style={{
              display: "flex",
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
                  flex: 1,
                  padding: "28px 0",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid #30363d" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#e6edf3",
                    display: "flex",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#8b949e",
                    display: "flex",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom — language + branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {topLang ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "999px",
                  padding: "12px 24px",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: langColor,
                    display: "flex",
                  }}
                />
                <div
                  style={{
                    fontSize: "18px",
                    color: "#e6edf3",
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  {topLang.language}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#8b949e",
                    display: "flex",
                  }}
                >
                  {Math.round((topLang.count / totalRepos) * 100)}%
                </div>
              </div>
            ) : (
              <div style={{ display: "flex" }} />
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#58a6ff",
                  display: "flex",
                }}
              >
                GitFolio
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#484f58",
                  display: "flex",
                }}
              >
                github portfolio generator
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (err) {
    console.error(err)
    return new Response("Failed to generate image", { status: 500 })
  }
}