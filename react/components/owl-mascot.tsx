"use client"

import { motion } from "framer-motion"

interface OwlMascotProps {
  isPasswordVisible: boolean
  isWaving?: boolean
}

export function OwlMascot({ isPasswordVisible, isWaving = false }: OwlMascotProps) {
  return (
    <motion.div
      className="relative w-40 h-40"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="60" ry="50" fill="#8B5A2B" />
        <ellipse cx="100" cy="125" rx="50" ry="40" fill="#D2691E" />

        {/* Belly Pattern */}
        <ellipse cx="100" cy="140" rx="30" ry="25" fill="#F5DEB3" />
        <ellipse cx="100" cy="145" rx="20" ry="18" fill="#FFE4C4" />

        {/* Wings */}
        <motion.ellipse
          cx="45"
          cy="120"
          rx="20"
          ry="35"
          fill="#8B5A2B"
          animate={isWaving ? { rotate: [0, 20, -20, 0] } : {}}
          transition={{ duration: 1, repeat: isWaving ? Number.POSITIVE_INFINITY : 0 }}
          style={{ originX: 0.7, originY: 0.3 }}
        />
        <motion.ellipse
          cx="155"
          cy="120"
          rx="20"
          ry="35"
          fill="#8B5A2B"
          animate={isWaving ? { rotate: [0, -20, 20, 0] } : {}}
          transition={{ duration: 1, repeat: isWaving ? Number.POSITIVE_INFINITY : 0 }}
          style={{ originX: 0.3, originY: 0.3 }}
        />

        {/* Head */}
        <circle cx="100" cy="70" r="45" fill="#D2691E" />

        {/* Ear Tufts */}
        <polygon points="60,35 70,60 55,55" fill="#8B5A2B" />
        <polygon points="140,35 130,60 145,55" fill="#8B5A2B" />

        {/* Face Disc */}
        <ellipse cx="100" cy="75" rx="35" ry="30" fill="#F5DEB3" />

        {/* Eye Sockets */}
        <circle cx="82" cy="70" r="18" fill="#FFF8DC" />
        <circle cx="118" cy="70" r="18" fill="#FFF8DC" />

        {/* Eyes or Hands covering eyes */}
        {isPasswordVisible ? (
          <>
            {/* Hands covering eyes */}
            <motion.g initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Left hand */}
              <ellipse cx="78" cy="70" rx="22" ry="18" fill="#D2691E" />
              <circle cx="68" cy="65" r="6" fill="#D2691E" />
              <circle cx="73" cy="58" r="5" fill="#D2691E" />
              <circle cx="80" cy="55" r="5" fill="#D2691E" />
              <circle cx="88" cy="58" r="5" fill="#D2691E" />

              {/* Right hand */}
              <ellipse cx="122" cy="70" rx="22" ry="18" fill="#D2691E" />
              <circle cx="132" cy="65" r="6" fill="#D2691E" />
              <circle cx="127" cy="58" r="5" fill="#D2691E" />
              <circle cx="120" cy="55" r="5" fill="#D2691E" />
              <circle cx="112" cy="58" r="5" fill="#D2691E" />
            </motion.g>
          </>
        ) : (
          <>
            {/* Normal eyes */}
            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
              {/* Eye whites and pupils */}
              <motion.circle
                cx="82"
                cy="70"
                r="12"
                fill="#2C1810"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />
              <circle cx="85" cy="67" r="4" fill="#FFFFFF" />

              <motion.circle
                cx="118"
                cy="70"
                r="12"
                fill="#2C1810"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />
              <circle cx="121" cy="67" r="4" fill="#FFFFFF" />
            </motion.g>
          </>
        )}

        {/* Beak */}
        <polygon points="100,82 93,95 107,95" fill="#FF8C00" />
        <polygon points="100,85 96,92 104,92" fill="#FFA500" />

        {/* Feet */}
        <ellipse cx="80" cy="175" rx="15" ry="8" fill="#FF8C00" />
        <ellipse cx="120" cy="175" rx="15" ry="8" fill="#FF8C00" />

        {/* Graduation Cap */}
        <rect x="60" y="25" width="80" height="8" fill="#2C1810" />
        <polygon points="100,10 60,30 140,30" fill="#2C1810" />
        <circle cx="100" cy="10" r="5" fill="#FFD700" />
        <line x1="100" y1="15" x2="130" y2="25" stroke="#FFD700" strokeWidth="2" />
        <polygon points="130,25 125,35 135,35" fill="#FFD700" />
      </svg>
    </motion.div>
  )
}
