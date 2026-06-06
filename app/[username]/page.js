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
      <main>
        <h1>Error: {data.error}</h1>
      </main>
    )
  }

  return (
    <main>
      <ProfileCard profile={data.profile} languages={data.languages} />
      <RepoGrid repos={data.topRepos} />
    </main>
  )
}