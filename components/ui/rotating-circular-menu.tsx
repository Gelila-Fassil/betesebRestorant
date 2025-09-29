"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  image: string
  rating: number
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Signature chicken stew simmered in berbere spice blend with hard-boiled eggs",
    price: "$18",
    image: "/ethiopian-doro-wat-chicken-stew-with-hard-boiled-e.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Vegetarian Combo",
    description: "Colorful array of lentil stews, vegetables, and salads showcasing Ethiopian cuisine",
    price: "$16",
    image: "/ethiopian-vegetarian-combination-platter-with-colo.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Kitfo",
    description: "Ethiopian-style steak tartare seasoned with mitmita spice and clarified butter",
    price: "$22",
    image: "/ethiopian-kitfo-raw-beef-dish-with-spices-and-side.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Injera Bread",
    description: "Traditional sourdough flatbread with a unique spongy texture, perfect for sharing",
    price: "$8",
    image: "/traditional-ethiopian-injera-bread-with-colorful-s.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Coffee Ceremony",
    description: "Traditional Ethiopian coffee ceremony with freshly roasted beans and incense",
    price: "$12",
    image: "/ethiopian-coffee-ceremony-with-traditional-cups.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Tibs",
    description: "Sautéed beef or lamb with onions, peppers, and aromatic Ethiopian spices",
    price: "$20",
    image: "/ethiopian-tibs-sauteed-meat-with-vegetables.jpg",
    rating: 5,
  },
]

export function RotatingCircularMenu() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % menuItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoRotating])

  const currentItem = menuItems[currentIndex]
  const radius = 350
  const centerX = 500
  const centerY = 500

  return (
    <div className="relative w-full max-w-7xl mx-auto py-20">
      {/* Central Image Display */}
      <div className="relative flex items-center justify-center">
        {/* Rotating Menu Items Circle */}
        <div className="relative w-[1000px] h-[1000px]">
          {menuItems.map((item, index) => {
            const angle = (index * 360) / menuItems.length - 90 // Start from top
            const x = centerX + radius * Math.cos((angle * Math.PI) / 180)
            const y = centerY + radius * Math.sin((angle * Math.PI) / 180)
            const isActive = index === currentIndex

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer"
                style={{
                  left: x - 80,
                  top: y - 40,
                }}
                animate={{
                  rotate: -angle + 90, // Keep text horizontal
                  scale: isActive ? 1.6 : 1.3,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoRotating(false)
                  setTimeout(() => setIsAutoRotating(true), 8000) // Resume auto-rotation after 8 seconds
                }}
                whileHover={{
                  scale: isActive ? 1.7 : 1.4,
                  y: -8,
                }}
              >
                <motion.div
                  className={`
                    rounded-full text-center min-w-[180px] backdrop-blur-md border-2 transition-all duration-500 shadow-lg
                    ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-2xl shadow-primary/50"
                        : "bg-white/90 text-gray-800 border-white/50 hover:bg-white/95 hover:shadow-xl"
                    }
                  `}
                  style={{ padding: "8px 16px" }}
                  animate={{
                    boxShadow: isActive
                      ? "0 0 40px rgba(79, 98, 56, 0.8), 0 0 80px rgba(79, 98, 56, 0.4)"
                      : "0 8px 32px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="font-bold text-xl whitespace-nowrap">{item.name}</div>
                  <div className="text-base opacity-90 font-semibold mt-1">{item.price}</div>
                </motion.div>

                {/* Connecting Line to Center */}
                {isActive && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-primary to-transparent origin-left"
                    style={{
                      height: "3px",
                      width: `${radius - 90}px`,
                      transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                )}
              </motion.div>
            )
          })}

          {/* Central Image Container */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative w-[450px] h-[450px] rounded-full overflow-hidden shadow-2xl border-4 border-primary/30"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.02, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentItem.id}
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.2, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Particles Around Image */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-primary/40 rounded-full"
                  style={{
                    left: `${50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                    top: `${50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Central Info Card */}
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-primary/20 min-w-[320px]"
              key={currentItem.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2 font-serif">{currentItem.name}</h3>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(currentItem.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{currentItem.description}</p>

                <div className="flex items-center justify-between">
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {currentItem.price}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                      <Heart className="w-4 h-4 mr-2" />
                      Order Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-24 space-x-3">
        {menuItems.map((_, index) => (
          <motion.button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary scale-125" : "bg-primary/30"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoRotating(false)
              setTimeout(() => setIsAutoRotating(true), 8000)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Auto-rotation Control */}
      <div className="text-center mt-8">
        <motion.button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isAutoRotating
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-muted text-muted-foreground border border-muted-foreground/30"
          }`}
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoRotating ? "⏸️ Pause Rotation" : "▶️ Resume Rotation"}
        </motion.button>
      </div>
    </div>
  )
}
