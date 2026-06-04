import { getUserProfile, getUserRepos } from "@/lib/github"

function computeLanguages(repos) {
    const langCount = {}

    repos.forEach(repo => {
        if(repo.language){
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
        }
    });

    return Object.entries(langCount)
      .sort((a,b) => b[1] - a[1])
      .slice(0,6)
      .map(([language,count]) => ({ language , count}))
}

function computeTopRepos(repos){
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => {
        const recency = new Date(repo.pushed_at).getTime()
        const score = repo.stargazers_count * 5 + repo.forks_count * 3 + recency / 1e12
        return { ...repo, score }
      })
      .sort((a,b) => b.score - a.score)
      .slice(0,6)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        homepage: repo.homepage,
        updated_at: repo.pushed_at,
      }))
}

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if(!username){
        return Response.json({error : "Username is required"} , {status: 400})
    }

    try{
        const [profile, repos] = await Promise.all([
            getUserProfile(username),
            getUserRepos(username),
        ])

        const languages = computeLanguages(repos)
        const topRepos = computeTopRepos(repos)

        return Response.json({
            profile: {
             username: profile.login,
             name: profile.name,
             avatar: profile.avatar_url,
             bio: profile.bio,
             location: profile.location,
             followers: profile.followers,
             following: profile.following,
             publicRepos: profile.public_repos,
             githubUrl: profile.html_url,
             website: profile.blog,
            },
            languages,
            topRepos,
        })
    }catch (err){
        return Response.json({error: err.message}, {status: 500})
    }
}