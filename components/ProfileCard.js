export default function ProfileCard({ profile, languages }) {
  return (
    <div>
      <img src={profile.avatar} alt={profile.username} width={100} height={100} />
      <h1>{profile.name || profile.username}</h1>
      <p>@{profile.username}</p>
      {profile.bio && <p>{profile.bio}</p>}
      {profile.location && <p>{profile.location}</p>}

      <div>
        <span>{profile.followers} followers</span>
        <span>{profile.following} following</span>
        <span>{profile.publicRepos} repos</span>
      </div>

      <div>
        <h3>Top Languages</h3>
        {languages.map((lang) => (
          <span key={lang.language}>
            {lang.language} ({lang.count})
          </span>
        ))}
      </div>
    </div>
  )
}