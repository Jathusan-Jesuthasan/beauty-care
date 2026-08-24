'use client'

import React, { useEffect, useState } from 'react'
import { motion, Variants, useReducedMotion } from 'framer-motion'

const defaultEase = [0.22, 1, 0.36, 1] as const

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isMobile
}

export type RevealVariant = 'fade-up' | 'scale' | 'left' | 'right'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  distance?: number
  className?: string
  amount?: number
  style?: React.CSSProperties
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.65,
  distance = 28,
  className = '',
  amount = 0.18,
  style,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const revealDistance = isMobile ? Math.min(distance, 16) : distance
  const revealDuration = isMobile ? Math.min(duration, 0.52) : duration

  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: revealDuration, delay },
        },
      }
    }
    
    switch (variant) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.96 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: revealDuration, delay, ease: defaultEase },
          },
        }
      case 'left':
        return {
          hidden: { opacity: 0, x: -revealDistance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: revealDuration, delay, ease: defaultEase },
          },
        }
      case 'right':
        return {
          hidden: { opacity: 0, x: revealDistance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: revealDuration, delay, ease: defaultEase },
          },
        }
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: revealDistance, scale: 0.985 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: revealDuration, delay, ease: defaultEase },
          },
        }
    }
  }

  return (
    <motion.div
      suppressHydrationWarning
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={getVariants()}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

interface StaggerGroupProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
  className?: string
  amount?: number
  style?: React.CSSProperties
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delay = 0.1,
  className = '',
  amount = 0.15,
  style,
}: StaggerGroupProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      suppressHydrationWarning
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  variant?: RevealVariant
  distance?: number
  duration?: number
  className?: string
}

export function StaggerItem({
  children,
  variant = 'fade-up',
  distance = 24,
  duration = 0.6,
  className = '',
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const revealDistance = isMobile ? Math.min(distance, 16) : distance
  const revealDuration = isMobile ? Math.min(duration, 0.52) : duration

  const itemVariants: Variants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: revealDuration } }
  } : {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? revealDistance : 0,
      x: variant === 'left' ? -revealDistance : variant === 'right' ? revealDistance : 0,
      scale: variant === 'scale' ? 0.96 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: revealDuration, ease: defaultEase },
    },
  }

  return (
    <motion.div suppressHydrationWarning variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

interface MaskedHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span'
  className?: string
  delay?: number
  duration?: number
}

export function MaskedHeading({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  duration = 0.75,
}: MaskedHeadingProps) {
  const Component = motion[as] as any
  const shouldReduceMotion = useReducedMotion()

  return (
    <Component suppressHydrationWarning className={`masked-heading-wrapper ${className}`}>
      <span className="masked-heading-line">
        <motion.span
          suppressHydrationWarning
          className="masked-heading-inner"
          initial={{ y: shouldReduceMotion ? 0 : '105%', opacity: shouldReduceMotion ? 0 : 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration, delay, ease: defaultEase }}
        >
          {children}
        </motion.span>
      </span>
    </Component>
  )
}

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  withOverlay?: boolean
  delay?: number
}

export function ImageReveal({
  children,
  className = '',
  withOverlay = false,
  delay = 0,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`image-reveal-wrapper ${className}`}>
      <motion.div
        suppressHydrationWarning
        className="image-reveal-inner"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay, ease: defaultEase }}
      >
        {children}
      </motion.div>
      {withOverlay && !shouldReduceMotion && (
        <motion.div
            className="image-reveal-overlay"
            suppressHydrationWarning
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay, ease: [0.77, 0, 0.175, 1] }}
        />
      )}
    </div>
  )
}
