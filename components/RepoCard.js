export default function RepoCard({ repo }) {
  return (
    <div>
      <a href={repo.url} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </a>
      {repo.description && <p>{repo.description}</p>}
      <div>
        {repo.language && <span>{repo.language}</span>}
        <span>⭐ {repo.stars}</span>
        <span>🍴 {repo.forks}</span>
      </div>
      {repo.homepage && (
        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
      )}
    </div>
  )
}