"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { FloatingDock } from "@/components/ui/floating-dock"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Lens } from "@/components/ui/lens"
import { ExpandableCardDemo } from "@/components/ui/expandable-card"
import { RotatingCircularMenu } from "@/components/ui/rotating-circular-menu"
import { RotatingHero } from "@/components/ui/rotating-hero"
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ChefHat,
  Utensils,
  Heart,
  Home,
  User,
  Menu,
  Mail,
  Coffee,
  Award,
  Users,
  Sparkles,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const AdvancedFloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      opacity: number
      speed: number
    }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 2 + 0.5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            x: [particle.x, particle.x + Math.random() * 200 - 100],
            y: [particle.y, particle.y + Math.random() * 200 - 100],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.5 }}
      animate={{ scale: isInView ? 1 : 0.5 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {count}
      {suffix}
    </motion.span>
  )
}

const Advanced3DMenuCard = ({
  image,
  title,
  description,
  price,
  delay,
  rating = 5,
}: {
  image: string
  title: string
  description: string
  price: string
  delay: number
  rating?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) / 10
    const rotateYValue = (centerX - e.clientX) / 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative"
    >
      <CardSpotlight className="group cursor-pointer relative overflow-hidden bg-background border-border">
        <motion.div
          className="aspect-[4/3] overflow-hidden relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Lens zoomFactor={2} lensSize={150}>
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </Lens>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 right-4 text-white"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-sm font-semibold"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Chef's Special
            </motion.p>
          </motion.div>
        </motion.div>
        <CardContent className="p-6">
          <motion.h3 className="text-2xl font-bold mb-3 text-primary font-serif" whileHover={{ scale: 1.05 }}>
            {title}
          </motion.h3>
          <p className="text-muted-foreground leading-relaxed text-pretty mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold text-primary" whileHover={{ scale: 1.1 }}>
              {price}
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                <Heart className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </CardSpotlight>
    </motion.div>
  )
}

const AdvancedHeroSection = () => {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / innerWidth
      const y = (clientY - innerHeight / 2) / innerHeight
      mouseX.set(x * 50)
      mouseY.set(y * 50)
      setMousePosition({ x: clientX, y: clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={heroRef}
    >
      <BackgroundBeams className="absolute inset-0" />

      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
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

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: heroY,
          scale: heroScale,
          x: springX,
          rotateY: useTransform(springX, [-50, 50], [-5, 5]),
        }}
      >
        <img
          src="/traditional-ethiopian-injera-bread-with-colorful-s.jpg"
          alt="Traditional Ethiopian cuisine"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"
          style={{ opacity: heroOpacity }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,98,56,0.3)_0%,transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed w-12 h-12 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference border-2 border-primary/40"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-6 h-6 bg-primary/60 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, delay: 0.05 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, delay: 0.1 }}
      />

      <motion.div
        className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 mb-16"
        style={{
          opacity: heroOpacity,
          y: springY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold mb-8 hero-text font-serif text-balance leading-none"
            style={{
              background: "linear-gradient(45deg, #ffffff, #EFE3D7, #4F6238, #ffffff)",
              backgroundSize: "300% 300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(79, 98, 56, 0.8)",
            }}
          >
            BETESEB
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.p
            className="text-2xl md:text-3xl mb-12 font-light text-balance tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            AUTHENTIC ETHIOPIAN CUISINE
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      >
        <RotatingCircularMenu />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-8 justify-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          whileHover={{
            scale: 1.15,
            boxShadow: "0 25px 50px rgba(79, 98, 56, 0.6)",
            y: -8,
          }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            size="lg"
            className="text-xl px-12 py-6 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            />
            <Sparkles className="w-6 h-6 mr-3" />
            Order Now
          </Button>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.15,
            boxShadow: "0 25px 50px rgba(255, 255, 255, 0.4)",
            y: -8,
          }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-xl px-12 py-6 bg-white/10 border-white/40 text-white hover:bg-white/20 rounded-full backdrop-blur-md relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4, delay: 1 }}
            />
            <Coffee className="w-6 h-6 mr-3" />
            Book a Table
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="text-sm mb-4 font-light tracking-wider"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Discover Our Story
          </motion.span>
          <motion.div
            className="w-10 h-16 border-2 border-white/60 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm"
            whileHover={{ scale: 1.2, borderColor: "rgba(79, 98, 56, 0.8)" }}
          >
            <motion.div
              className="w-2 h-6 bg-gradient-to-b from-white to-primary rounded-full mt-3"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function HomePage() {
  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full" />, href: "#home" },
    { title: "About", icon: <User className="h-full w-full" />, href: "#about" },
    { title: "Menu", icon: <Menu className="h-full w-full" />, href: "#menu" },
    { title: "Contact", icon: <Mail className="h-full w-full" />, href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AdvancedFloatingParticles />

      <motion.nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-16">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <motion.h1
              className="text-3xl font-bold text-white font-serif drop-shadow-lg"
              whileHover={{
                textShadow: "0 0 20px rgba(79, 98, 56, 0.8)",
              }}
            >
              Beteseb
            </motion.h1>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Menu", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-primary-foreground transition-colors relative font-medium text-lg drop-shadow-md"
                whileHover={{ scale: 1.1, y: -3 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>


      <RotatingHero />

      <motion.section
        className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 15, label: "Years of Tradition", icon: ChefHat, suffix: "+" },
              { number: 50, label: "Authentic Dishes", icon: Utensils, suffix: "+" },
              { number: 1000, label: "Happy Customers", icon: Heart, suffix: "+" },
              { number: 25, label: "Awards Won", icon: Award, suffix: "" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="text-center relative"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="inline-block mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-5xl font-bold mb-3">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm opacity-90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="about" className="py-24 bg-gradient-to-br from-secondary/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-8 text-primary font-serif text-balance"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              {[
                'Beteseb Restaurant was born from a passion to share the authentic flavors of Ethiopia with our community. Our name, meaning "family" in Amharic, reflects our commitment to treating every guest as part of our extended family.',
                "We source the finest spices directly from Ethiopian markets and prepare each dish using traditional methods passed down through generations. From our signature injera bread to our aromatic coffee ceremony, every element tells the story of Ethiopian culture.",
                "Join us for an unforgettable culinary journey that celebrates the warmth, community, and incredible flavors of Ethiopia.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className={`text-lg leading-relaxed mb-8 ${index === 2 ? "text-muted-foreground font-medium" : ""} text-pretty`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                  <Users className="w-5 h-5 mr-2" />
                  Meet Our Team
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Lens zoomFactor={1.8} lensSize={200}>
                <motion.img
                  src="/ethiopian-chef-preparing-traditional-injera-bread-.jpg"
                  alt="Ethiopian cooking tradition"
                  className="w-full h-[700px] object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
              </Lens>
              <motion.div
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-3xl font-bold mb-2">Traditional</div>
                <div className="text-sm opacity-90">Since 2009</div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-primary font-serif text-balance">
              More Delicious Options
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              Explore our extensive collection of traditional Ethiopian dishes, each prepared with authentic spices and
              time-honored techniques.
            </p>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <ExpandableCardDemo />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-4 bg-transparent rounded-full border-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Menu className="w-5 h-5 mr-2" />
                View Full Menu
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-secondary/20 to-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-primary font-serif text-balance">Visit Us</h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              We're located in the heart of the city, ready to welcome you with authentic Ethiopian hospitality and
              unforgettable flavors.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  content: "123 Cultural Avenue\nDowntown District\nCity, State 12345",
                },
                { icon: Phone, title: "Phone", content: "(555) 123-4567" },
                {
                  icon: Clock,
                  title: "Hours",
                  content:
                    "Monday - Thursday: 11:00 AM - 10:00 PM\nFriday - Saturday: 11:00 AM - 11:00 PM\nSunday: 12:00 PM - 9:00 PM",
                },
              ].map((item, index) => (
                <CardSpotlight key={item.title} className="p-8">
                  <motion.div
                    className="flex items-start space-x-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="p-3 rounded-full bg-primary/10"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        backgroundColor: "rgba(79, 98, 56, 0.2)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{item.content}</p>
                    </div>
                  </motion.div>
                </CardSpotlight>
              ))}

              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex space-x-6">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 text-lg py-4"
                    >
                      <Coffee className="w-5 h-5 mr-2" />
                      Make Reservation
                    </Button>
                  </motion.div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full bg-transparent rounded-full border-2 text-lg py-4"
                    >
                      <Utensils className="w-5 h-5 mr-2" />
                      Order Takeout
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Lens zoomFactor={1.5} lensSize={180}>
                <motion.img
                  src="/warm-ethiopian-restaurant-interior-with-traditiona.jpg"
                  alt="Restaurant interior"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
              </Lens>
              <motion.div
                className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1, type: "spring" }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full mr-2"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Now Open!
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.footer
        className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3 className="text-3xl font-bold mb-6 font-serif" whileHover={{ scale: 1.05 }}>
                Beteseb Restaurant
              </motion.h3>
              <p className="leading-relaxed opacity-90 text-pretty text-lg">
                Authentic Ethiopian cuisine served with traditional hospitality. Experience the flavors of Ethiopia in
                every bite.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {["Home", "About Us", "Menu", "Contact"].map((link, index) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="block opacity-90 hover:opacity-100 transition-opacity text-lg"
                    whileHover={{ x: 10, scale: 1.05 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.9, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
              <div className="flex space-x-6 mb-6">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="opacity-90 hover:opacity-100 transition-opacity p-3 rounded-full bg-white/10 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.3,
                      rotate: 360,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.9, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-sm opacity-90">📧 info@betesebrestaurant.com</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-primary-foreground/20 mt-12 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="opacity-90 text-lg">© 2025 Beteseb Restaurant. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
