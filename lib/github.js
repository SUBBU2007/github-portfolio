const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = GITHUB_TOKEN
   ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
   : {}

export async function getUserProfile(username) {
    const res = await fetch(`https://api.github.com/users/${username}`, { headers })

    if(res.status === 404){
        throw new Error("User not found")
    }

    if(res.status === 403){
        throw new Error("Rate limit exceeded")
    }

    const data  = await res.json();
    return data;
}

export async function getUserRepos(username) {
    const allRepos = []
    let page = 1

    while(true){
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
            { headers }
        )

        const repos = await res.json();

        if(!Array.isArray(repos) || repos.length === 0) break

        allRepos.push(...repos)

        if(repos.length < 100)break
        page++
    }

    return allRepos;
}

export async function getUserEvents(username) {
  const allEvents = []
  let page = 1

  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
      { headers }
    )
    if (!res.ok) break

    const events = await res.json()

    if (!Array.isArray(events) || events.length === 0) break

    allEvents.push(...events)

    if (allEvents.length >= 300 || events.length < 100) break

    page++
  }
  return allEvents
}