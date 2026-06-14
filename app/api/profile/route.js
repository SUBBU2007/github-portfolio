import { getUserProfile, getUserRepos, getUserEvents } from "@/lib/github";

function computeLanguages(repos) {
  const langCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([language, count]) => ({ language, count }));
}

function computeAllRepos(repos) {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    homepage: repo.homepage,
    updated_at: repo.pushed_at,
    isFork: repo.fork,
    isArchived: repo.archived,
  }))
}

function computeTopRepos(repos) {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map((repo) => {
      const recency = new Date(repo.pushed_at).getTime();
      const score =
        repo.stargazers_count * 5 + repo.forks_count * 3 + recency / 1e12;
      return { ...repo, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
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
    }));
}

function computeContributions(events) {
  // Count events per day
  const countsByDate = {};

  events.forEach((event) => {
    const date = event.created_at.split("T")[0];
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  // Build last 365 days array
  const days = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      count: countsByDate[dateStr] || 0,
    });
  }

  // Total contributions
  const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

  // Current streak — count backwards from today
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  days.forEach((day) => {
    if (day.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  // Most active day of week
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  days.forEach((day) => {
    const dow = new Date(day.date).getDay();
    dayCounts[dow] += day.count;
  });
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mostActiveDay = dayNames[dayCounts.indexOf(Math.max(...dayCounts))];

  return {
    totalContributions,
    currentStreak,
    longestStreak,
    mostActiveDay,
    days,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const [profile, repos, events] = await Promise.all([
      getUserProfile(username),
      getUserRepos(username),
      getUserEvents(username),
    ]);

    const languages = computeLanguages(repos);
    const topRepos = computeTopRepos(repos);
    const contributions = computeContributions(events);
    const allRepos = computeAllRepos(repos)

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
      allRepos,
      contributions,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}