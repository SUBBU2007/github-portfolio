<div align="center">

<h1>GitFolio</h1>

<p>Generate a clean, shareable developer portfolio from any GitHub username — instantly.</p>

<p>
  <a href="https://github-portfolio-tau-eight.vercel.app">Live Demo</a>
  &nbsp;·&nbsp;
  <a href="https://github-portfolio-tau-eight.vercel.app/SUBBU2007">My Portfolio</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/SUBBU2007/github-portfolio/issues">Report a Bug</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/SUBBU2007/github-portfolio/issues">Suggest a Feature</a>
</p>

![GitFolio Preview](https://github-portfolio-tau-eight.vercel.app/api/og?username=SUBBU2007)

</div>

---

## What is GitFolio?

A GitHub profile is cluttered — contributions, pinned repos, followers, all mixed together. GitFolio strips it down to a focused, readable snapshot that anyone can understand in 30 seconds — whether they know GitHub or not.

Enter a username → get a clean portfolio page → share it anywhere.

---

## Features

- **Instant portfolio generation** — enter any GitHub username, get a live portfolio page at `gitfolio.app/{username}`
- **Smart repo scoring** — surfaces the most relevant repos based on stars, forks, and recent activity — not just the latest push
- **Language breakdown** — visual bar showing top languages across all public repos
- **Dynamic OG images** — when you share the link on LinkedIn, Twitter, or Slack, a clean preview card is auto-generated with your avatar, stats, and top language
- **Full pagination** — fetches all public repos, not just the first page
- **One-click sharing** — copy your portfolio link instantly from the page
- **No login required** — works entirely from public GitHub data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Data | GitHub REST API v3 |
| OG Images | @vercel/og |
| Deployment | Vercel |

---

## Running Locally

**Prerequisites:** Node.js 18+, a GitHub personal access token

```bash
# Clone the repo
git clone https://github.com/SUBBU2007/github-portfolio.git
cd github-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GITHUB_TOKEN and NEXT_PUBLIC_BASE_URL

# Start the dev server
npm run dev
```

Open `http://localhost:3000` and enter any GitHub username.

---

## Environment Variables

Create a `.env.local` file in the root:

```env
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

To get a GitHub token: `github.com/settings/tokens` → Generate new token (classic) → check `public_repo` scope only.

---

## Project Structure

```
app/
  page.js                  → Landing page
  [username]/page.js       → Dynamic portfolio page
  api/
    profile/route.js       → GitHub data API
    og/route.js            → OG image generation
components/
  SearchBar.js             → Username input
  ProfileCard.js           → Avatar, bio, stats, languages
  RepoCard.js              → Individual repo display
  RepoGrid.js              → Bento grid layout
  ShareButton.js           → Copy portfolio link
lib/
  github.js                → GitHub API fetch functions
```

---

## Feedback & Contributions

This project is actively being developed. If you find a bug, have a feature suggestion, or want to contribute — open an issue or a pull request. All feedback is welcome.

If you find it useful, a star on the repo goes a long way. ⭐

---

## Author

**G.V. Subba Rao** — 3rd year Integrated M.Tech CSE @ VIT-AP University

- GitHub: [@SUBBU2007](https://github.com/SUBBU2007)
- Portfolio: [github-portfolio-tau-eight.vercel.app/SUBBU2007](https://github-portfolio-tau-eight.vercel.app/SUBBU2007)

---

<div align="center">
  <sub>Built from scratch · Deployed on Vercel · Open for feedback</sub>
</div>
