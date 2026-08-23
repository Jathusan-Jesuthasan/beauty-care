'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const DEFAULT_LOADER_DURATION = 1000

const STORAGE_KEY = 'hamsh-beauty-loader-seen'

interface FirstVisitLoaderProps {
  onComplete?: () => void
}

export function FirstVisitLoader({ onComplete }: FirstVisitLoaderProps) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      const hasSeen = localStorage.getItem(STORAGE_KEY)
      if (hasSeen) {
        setShouldShow(false)
        onComplete?.()
        return
      }
    } catch {
      // In case of restricted localStorage access
      setShouldShow(false)
      onComplete?.()
      return
    }

    // First visit: Show the loader
    setShouldShow(true)
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      setIsExiting(true)

      const exitTimer = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, 'true')
        } catch {}
        document.body.style.overflow = ''
        setShouldShow(false)
        onComplete?.()
      }, 350) // Curtain transition duration

      return () => clearTimeout(exitTimer)
    }, prefersReducedMotion ? 400 : DEFAULT_LOADER_DURATION)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  if (shouldShow === null || !shouldShow) {
    return null
  }

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="brand-loader"
          className="first-visit-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          aria-label="Hamsh Beauty Care is loading"
        >
          <div className="loader-content">
            {/* Monogram emblem */}
            <motion.div
              className="loader-monogram"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
              >
                H
              </motion.span>
            </motion.div>

            {/* Brand typography */}
            <motion.div
              className="loader-text"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="loader-brand-name">Hamsh</h2>
              <motion.small
                className="loader-brand-sub"
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.28em', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.44, ease: 'easeOut' }}
              >
                BEAUTY CARE
              </motion.small>
            </motion.div>

            {/* Subtle progress indicator */}
            <motion.div
              className="loader-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="brand-loader-curtain"
          className="first-visit-loader"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="loader-content" style={{ opacity: 0.6 }}>
            <div className="loader-monogram">
              <span>H</span>
            </div>
            <div className="loader-text">
              <h2 className="loader-brand-name">Hamsh</h2>
              <small className="loader-brand-sub">BEAUTY CARE</small>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
