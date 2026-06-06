"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  function handleSubmit() {
    const cleaned = username.trim()

    if (!cleaned) {
      setError("Please enter a username")
      return
    }

    const valid = /^[a-zA-Z0-9-]+$/.test(cleaned)
    if (!valid) {
      setError("Invalid GitHub username")
      return
    }

    setError("")
    router.push(`/${cleaned}`)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Generate</button>
      {error && <p>{error}</p>}
    </div>
  )
}