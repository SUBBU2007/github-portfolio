"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function FlipText({ words, className }) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [words])

  if (!mounted) {
    return (
      <span className={className}>
        {words[0]}
      </span>
    )
  }

  const currentWord = words[index]

  return (
    <span
      style={{
        display: "inline-block",
        perspective: "800px",
        verticalAlign: "bottom",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          style={{
            display: "inline-block",
          }}
        >
          {currentWord.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.04,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={className}
              style={{
                display: "inline-block",
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}