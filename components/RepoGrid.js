import RepoCard from "@/components/RepoCard"

export default function RepoGrid({ repos }) {
  if (!repos || repos.length === 0) {
    return <p>No public repositories found.</p>
  }

  return (
    <div>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}