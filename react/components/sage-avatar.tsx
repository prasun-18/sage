"use client"

import { motion } from "framer-motion"

interface SageAvatarProps {
  size?: "sm" | "md" | "lg"
  isThinking?: boolean
}

export function SageAvatar({ size = "md", isThinking = false }: SageAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={isThinking ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.5, repeat: isThinking ? Number.POSITIVE_INFINITY : 0 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Halo / Aura */}
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
          opacity="0.5"
          animate={isThinking ? { opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        <circle cx="50" cy="50" r="45" fill="#4A4A4A" />
        <circle cx="50" cy="50" r="42" fill="#3D3D3D" />

        <ellipse cx="50" cy="25" rx="32" ry="20" fill="#6B6B6B" />
        <ellipse cx="25" cy="35" rx="12" ry="18" fill="#7A7A7A" />
        <ellipse cx="75" cy="35" rx="12" ry="18" fill="#7A7A7A" />
        <path d="M 20 30 Q 15 45 18 55" stroke="#8A8A8A" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 80 30 Q 85 45 82 55" stroke="#8A8A8A" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Hair strands for detail - silver/gray mix */}
        <path d="M 30 15 Q 35 5 50 8 Q 65 5 70 15" stroke="#9A9A9A" strokeWidth="3" fill="none" />
        <path d="M 25 20 Q 30 12 40 15" stroke="#A8A8A8" strokeWidth="2" fill="none" />
        <path d="M 75 20 Q 70 12 60 15" stroke="#A8A8A8" strokeWidth="2" fill="none" />
        {/* Additional hair volume on top */}
        <ellipse cx="50" cy="18" rx="25" ry="12" fill="#5A5A5A" />
        <path d="M 35 10 Q 50 2 65 10" stroke="#7A7A7A" strokeWidth="4" fill="none" />

        {/* Face */}
        <circle cx="50" cy="52" r="30" fill="#FFE4B5" />

        {/* White beard */}
        <ellipse cx="50" cy="78" rx="25" ry="20" fill="#FFFFFF" />
        <ellipse cx="50" cy="82" rx="20" ry="18" fill="#F5F5F5" />
        <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FFFFFF" />
        {/* Beard side extensions */}
        <ellipse cx="28" cy="65" rx="8" ry="15" fill="#F8F8F8" />
        <ellipse cx="72" cy="65" rx="8" ry="15" fill="#F8F8F8" />

        <ellipse cx="38" cy="55" rx="12" ry="5" fill="#E8E8E8" />
        <ellipse cx="62" cy="55" rx="12" ry="5" fill="#E8E8E8" />
        <path d="M 26 53 Q 38 60 50 53 Q 62 60 74 53" fill="#F0F0F0" stroke="#D8D8D8" strokeWidth="1" />
        {/* Mustache curls */}
        <path d="M 26 54 Q 22 52 20 55" stroke="#D8D8D8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 74 54 Q 78 52 80 55" stroke="#D8D8D8" strokeWidth="3" fill="none" strokeLinecap="round" />

        <path d="M 44 62 Q 50 66 56 62" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <ellipse cx="50" cy="48" rx="4" ry="5" fill="#DEB887" />

        {/* Eyes */}
        <motion.g
          animate={isThinking ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <circle cx="38" cy="42" r="6" fill="#FFFFFF" />
          <circle cx="62" cy="42" r="6" fill="#FFFFFF" />
          <motion.circle
            cx="38"
            cy="42"
            r="4"
            fill="#4A3728"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          />
          <motion.circle
            cx="62"
            cy="42"
            r="4"
            fill="#4A3728"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          />
          <circle cx="39" cy="41" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="41" r="1.5" fill="#FFFFFF" />
        </motion.g>

        <path d="M 28 35 Q 38 30 46 36" stroke="#7A7A7A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 72 35 Q 62 30 54 36" stroke="#7A7A7A" strokeWidth="4" fill="none" strokeLinecap="round" />

        <circle cx="50" cy="32" r="2" fill="#CD853F" />
      </svg>

      {/* Thinking indicator */}
      {isThinking && (
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-[8px] text-primary-foreground">✨</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
