'use client'

import React from 'react'
import { motion, Variants, useReducedMotion } from 'framer-motion'

const defaultEase = [0.22, 1, 0.36, 1] as const

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

  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration, delay },
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
            transition: { duration, delay, ease: defaultEase },
          },
        }
      case 'left':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: defaultEase },
          },
        }
      case 'right':
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: defaultEase },
          },
        }
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: distance, scale: 0.985 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration, delay, ease: defaultEase },
          },
        }
    }
  }

  return (
    <motion.div
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

  const itemVariants: Variants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration } }
  } : {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? distance : 0,
      x: variant === 'left' ? -distance : variant === 'right' ? distance : 0,
      scale: variant === 'scale' ? 0.96 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration, ease: defaultEase },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
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
    <Component className={`masked-heading-wrapper ${className}`}>
      <span className="masked-heading-line">
        <motion.span
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
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay, ease: [0.77, 0, 0.175, 1] }}
        />
      )}
    </div>
  )
}
