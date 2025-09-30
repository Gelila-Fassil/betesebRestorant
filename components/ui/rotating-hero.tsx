"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, Heart, Sparkles, Coffee, ChefHat } from "lucide-react"

interface HeroDish {
  id: number
  name: string
  description: string
  price: string
  image: string
  rating: number
  isMainDish: boolean
}

const mainDishes: HeroDish[] = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Signature chicken stew simmered in berbere spice blend with hard-boiled eggs, served on traditional injera bread",
    price: "$18",
    image: "/ethiopian-doro-wat-chicken-stew-with-hard-boiled-e.jpg",
    rating: 5,
    isMainDish: true,
  },
  {
    id: 2,
    name: "Kitfo",
    description: "Ethiopian-style steak tartare seasoned with mitmita spice and clarified butter, served with traditional accompaniments",
    price: "$22",
    image: "/ethiopian-kitfo-raw-beef-dish-with-spices-and-side.jpg",
    rating: 5,
    isMainDish: true,
  },
  {
    id: 3,
    name: "Tibs",
    description: "Sautéed beef or lamb with onions, peppers, and aromatic Ethiopian spices, perfectly seasoned and tender",
    price: "$20",
    image: "/ethiopian-tibs-sauteed-meat-with-vegetables.jpg",
    rating: 5,
    isMainDish: true,
  },
  {
    id: 4,
    name: "Vegetarian Combo",
    description: "Colorful array of lentil stews, vegetables, and salads showcasing the diversity of Ethiopian vegetarian cuisine",
    price: "$16",
    image: "/ethiopian-vegetarian-combination-platter-with-colo.jpg",
    rating: 5,
    isMainDish: true,
  },
  {
    id: 5,
    name: "Injera Bread",
    description: "Traditional Ethiopian sourdough flatbread made from teff flour, the perfect accompaniment to all our dishes",
    price: "$8",
    image: "/traditional-ethiopian-injera-bread-with-colorful-s.jpg",
    rating: 5,
    isMainDish: true,
  },
  {
    id: 6,
    name: "Coffee Ceremony",
    description: "Authentic Ethiopian coffee ceremony with traditional roasting, grinding, and brewing methods",
    price: "$12",
    image: "/ethiopian-coffee-ceremony-with-traditional-cups.jpg",
    rating: 5,
    isMainDish: true,
  },
]

export function RotatingHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Motion values for 3D rotation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mainDishes.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered])

  const currentDish = mainDishes[currentIndex]

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background Images - Rotating */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentDish.id}
            src={currentDish.image}
            alt={currentDish.name}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(15px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {/* Dark Overlay - Lighter for better visibility */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Gradient Overlay - More subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Floating Particles */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main Content - Text Overlay */}
      <div className="relative z-20 text-center text-white max-w-7xl mx-auto px-4">
        {/* Food Name and Info Overlay */}
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Food Name Display */}
          <motion.div
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif text-center"
              whileHover={{ scale: 1.05 }}
            >
              {currentDish.name}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base lg:text-lg text-center max-w-4xl mx-auto mb-8 opacity-90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {currentDish.description}
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.span
                className="text-4xl md:text-5xl font-bold text-primary"
                whileHover={{ scale: 1.1 }}
              >
                {currentDish.price}
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-primary/90 hover:bg-primary text-xl px-10 py-4"
                >
                  <Heart className="w-6 h-6 mr-2" />
                  Order Now
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Rating Stars */}
          <motion.div
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[...Array(currentDish.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <Star className="w-8 h-8 md:w-10 md:h-10 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Food Thumbnails - Navigation Circles */}
        <div className="flex justify-center items-center space-x-6 md:space-x-8 mb-8">
          {mainDishes.map((dish, index) => {
            const isActive = index === currentIndex
            return (
              <motion.div
                key={dish.id}
                className="relative cursor-pointer"
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.15, y: -15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Thumbnail Image */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 shadow-lg"
                  animate={{
                    borderColor: isActive ? "rgba(79, 98, 56, 0.8)" : "rgba(255, 255, 255, 0.3)",
                    scale: isActive ? 1.3 : 1,
                    boxShadow: isActive 
                      ? "0 0 25px rgba(79, 98, 56, 0.8)" 
                      : "0 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Dish Name */}
                <motion.p
                  className="text-sm md:text-base text-center text-white mt-3 font-semibold"
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1.15 : 1,
                  }}
                >
                  {dish.name}
                </motion.p>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-primary/20 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-16 h-16 border-2 border-primary/20 rounded-full" />
        <div className="absolute top-1/2 -left-5 w-8 h-8 bg-primary/10 rounded-full" />
        <div className="absolute top-1/2 -right-5 w-8 h-8 bg-primary/10 rounded-full" />

      </div>

      {/* Navigation Dots - More Visible */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        {mainDishes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-6 h-6 rounded-full transition-all duration-300 border-2 ${
              index === currentIndex
                ? "bg-primary border-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-white/20 border-white/60 hover:bg-white/40 hover:border-white/80"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

    </section>
  )
}
