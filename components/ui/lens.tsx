"use client"
import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

export const Lens = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
}: {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  isStatic?: boolean
  position?: { x: number; y: number }
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {(isHovering || isStatic) && (
        <motion.div
          className="absolute pointer-events-none border-4 border-gray-200 rounded-full z-50 overflow-hidden"
          style={{
            width: lensSize,
            height: lensSize,
            left: isStatic ? position.x : mousePosition.x - lensSize / 2,
            top: isStatic ? position.y : mousePosition.y - lensSize / 2,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${
                ((isStatic ? position.x : mousePosition.x) / lensSize) * 100
              }% ${((isStatic ? position.y : mousePosition.y) / lensSize) * 100}%`,
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </div>
  )
}
