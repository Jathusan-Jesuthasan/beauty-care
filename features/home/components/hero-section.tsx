'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BookingLink } from '@/components/ui/booking-link'
import { ScrollReveal } from '@/components/scroll-reveal'
import { HERO_IMAGE_URL } from '@/lib/constants/images'

export function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
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
            make you feel effortlessly beautiful.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <div className="hero-actions">
            <BookingLink href="#contact">Book appointment</BookingLink>
            <a className="text-link" href="#services">
              Explore services <ArrowUpRight size={15} />
            </a>
          </div>
        </ScrollReveal>
        <a className="scroll-note" href="#services">
          Scroll to discover <span>↓</span>
        </a>
      </div>

      {/*
       * Hero image: Framer Motion entrance animation (clip-path reveal).
       *
       * KNOWN QUIRK: globals.css also applies `@keyframes hero-image-reveal`
       * to `.hero-image` via a CSS animation. Both the CSS keyframe and
       * this Framer Motion animation run simultaneously on mount.
       * The visual result is correct — do not remove either without testing.
       *
       * Animation contract: do not rename `.hero-image` — it is targeted by
       * globals.css (hover parallax, keyframe) and documented in cinematic-scroll.tsx.
       */}
      <motion.div
        className="hero-image"
        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGE_URL}
          alt="Bridal makeup and styling"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 55vw"
        />
      </motion.div>
    </section>
  )
}
