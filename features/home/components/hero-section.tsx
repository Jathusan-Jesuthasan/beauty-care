'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BookingLink } from '@/components/ui/booking-link'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  HERO_BRIDAL_IMAGE_URL,
  HERO_PRODUCTS_IMAGE_URL,
  HERO_SERVICE_IMAGE_URL,
} from '@/lib/constants/images'

const HERO_SLIDES = [
  {
    id: '01',
    src: HERO_BRIDAL_IMAGE_URL,
    alt: 'Bridal makeup and hair styling by Dee\'s Salon',
    label: 'Bridal Styling',
  },
  {
    id: '02',
    src: HERO_PRODUCTS_IMAGE_URL,
    alt: 'Professional hair care and skincare products',
    label: 'Products & Care',
  },
  {
    id: '03',
    src: HERO_SERVICE_IMAGE_URL,
    alt: 'Salon care and treatment experience',
    label: 'Salon Experience',
  },
] as const

interface HeroBurst {
  id: number
  x: number
  y: number
  particles: Array<{
    id: number
    x: number
    y: number
    size: number
  }>
}

export function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [heroBursts, setHeroBursts] = useState<HeroBurst[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroCopyY = useTransform(
    scrollYProgress,
    [0, 0.75],
    [0, shouldReduceMotion ? 0 : -20],
  )
  const heroCopyOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, shouldReduceMotion ? 1 : 0.9],
  )
  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, shouldReduceMotion ? 1 : isMobile ? 1.015 : 1.03],
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  // ── Seamless Auto-rotating Editorial Carousel (5.5s autoplay) ───────────
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5500)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentSlideIndex, isPaused])

  const activeSlide = HERO_SLIDES[currentSlideIndex]

  const handleHeroClick = (event: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const burstId = Date.now()
    const particles = Array.from({ length: 6 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 6 + (Math.random() - 0.5) * 0.35
      const distance = 34 + Math.random() * 30

      return {
        id: index,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 3 + Math.round(Math.random() * 3),
      }
    })

    setHeroBursts((bursts) => [...bursts.slice(-2), { id: burstId, x: event.clientX - bounds.left, y: event.clientY - bounds.top, particles }])
    window.setTimeout(() => {
      setHeroBursts((bursts) => bursts.filter((burst) => burst.id !== burstId))
    }, 720)
  }

  return (
    <motion.section ref={heroRef} id="home" className="hero" onClick={handleHeroClick}>
      <div className="hero-click-bursts" aria-hidden="true">
        {heroBursts.map((burst) => (
          <motion.span
            className="hero-click-burst"
            key={burst.id}
            style={{ left: burst.x, top: burst.y }}
            initial={{ opacity: 0.85, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-click-ring" />
            {burst.particles.map((particle) => (
              <motion.span
                className="hero-click-particle"
                key={particle.id}
                style={{ width: particle.size, height: particle.size }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, x: particle.x, y: particle.y, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </motion.span>
        ))}
      </div>
      {/* Left Copy Panel */}
      <motion.div className="hero-copy" style={{ y: heroCopyY, opacity: heroCopyOpacity }}>
        <ScrollReveal>
          <span className="eyebrow">Dee&apos;s · Hair · Beauty · Bridal</span>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1>
            Your beauty,
            <br />
            <em>your moment.</em>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p>
            Experience personalised hair, beauty and bridal services designed to
            make you feel effortlessly beautiful, confident and yourself.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <div className="hero-actions">
            <BookingLink href="#contact">Book appointment</BookingLink>
            <a className="text-link hero-text-link" href="#services">
              Explore services <ArrowUpRight size={15} />
            </a>
          </div>
        </ScrollReveal>
        <a
          className="scroll-note hero-scroll-note"
          href="#services"
          aria-label="Scroll down to discover services"
        >
          Scroll to discover <span>↓</span>
        </a>
      </motion.div>

      {/* Right Editorial Image Carousel Container with Seamless Crossfade */}
      <motion.div
        className="hero-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="hero-image-frame" style={{ scale: heroImageScale }}>
          {/* Pre-render all 3 slides stacked to guarantee ZERO blank gap during transitions */}
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex
            return (
              <motion.div
                key={slide.id}
                className="hero-slide-wrapper"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.03 : 1,
                  zIndex: isActive ? 2 : 1,
                }}
                transition={{
                  opacity: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: isActive ? 5.5 : 0, ease: 'linear' },
                }}
                style={{
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority
                  className="hero-carousel-img"
                  sizes="(max-width: 760px) 100vw, 55vw"
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Minimal Editorial Carousel Controls */}
        <div
          className="hero-carousel-controls"
          role="tablist"
          aria-label="Hero photography slides"
        >
          <span className="hero-carousel-label">{activeSlide.label}</span>
          <div className="hero-carousel-indicators">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlideIndex
              return (
                <button
                  key={slide.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${slide.id}: ${slide.label}`}
                  className={`hero-carousel-tab ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSlideIndex(index)
                    setIsPaused(true)
                  }}
                >
                  <span className="hero-carousel-num">{slide.id}</span>
                  <span className="hero-carousel-bar" />
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
