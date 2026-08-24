/**
 * @file beautiful-transformations.tsx
 *
 * @status UNUSED — Not currently imported by any page or component.
 * @classification Potential legacy / intended feature (Class B).
 *
 * @description
 * A sophisticated GSAP + ScrollTrigger animation that presents two floating
 * photo cards in a pinned section as the user scrolls. The cards animate in
 * from the centre, separate with 3D rotation, reach a depth climax, then
 * exit. Fully responsive with separate mobile and desktop timelines.
 *
 * Provides an alternative visual treatment for a transformations section —
 * more cinematic than the current `BeforeAfterSlider` approach.
 *
 * This component renders a `<section id="transformations">` element.
 * The active transformation section (`TransformationSection`) also uses
 * `id="transformations"`. Both cannot be rendered simultaneously without
 * an ID conflict. Decide which to use before activating.
 *
 * Includes a graceful `prefers-reduced-motion` fallback that renders a
 * static two-card grid without any animation.
 *
 * @howToActivate
 * 1. Replace `<TransformationSection />` in `app/page.tsx` with
 *    `<BeautifulTransformations />` (import from this file).
 * 2. Supply the salon's own before/after image URLs via the
 *    `imageOne` and `imageTwo` props.
 * 3. Verify that `.transformation-container` CSS exists in globals.css.
 *    If not, add the required styles from this component's expected CSS.
 *
 * @see components/cinematic-scroll.tsx for the related hero/gallery GSAP animations.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BeautifulTransformationsProps {
  imageOne?: string
  imageTwo?: string
}

export function BeautifulTransformations({
  imageOne = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
  imageTwo = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
}: BeautifulTransformationsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardOneRef = useRef<HTMLDivElement>(null)
  const cardTwoRef = useRef<HTMLDivElement>(null)
  const imgOneRef = useRef<HTMLImageElement>(null)
  const imgTwoRef = useRef<HTMLImageElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !stageRef.current) return

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Mobile & Small Tablet (<= 768px): CENTER-ANCHORED SYSTEM
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=230%',
            scrub: 0.8,
            pin: stageRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Initial Center-Anchored Setup
        // Both cards are centered at (50%, 45%) and offset by relative pixels
        gsap.set(cardOneRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: -45,
          y: -55,
          opacity: 0,
          scale: 0.88,
          rotationZ: -3,
          rotationY: 6,
          rotationX: 0,
          transformPerspective: 1000,
          transformOrigin: 'center center',
        })

        gsap.set(cardTwoRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: 45,
          y: 55,
          opacity: 0,
          scale: 0.88,
          rotationZ: 3,
          rotationY: -6,
          rotationX: 0,
          transformPerspective: 1000,
          transformOrigin: 'center center',
        })

        gsap.set([imgOneRef.current, imgTwoRef.current], {
          scale: 1.08,
        })

        // STAGE 1: 0% -> 20% (Appear in Center)
        tl.to(
          cardOneRef.current,
          {
            opacity: 1,
            scale: 0.9,
            x: -45,
            y: -55,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        )
        .to(
          cardTwoRef.current,
          {
            opacity: 1,
            scale: 0.9,
            x: 45,
            y: 55,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.04
        )
        .to(
          [imgOneRef.current, imgTwoRef.current],
          {
            scale: 1.05,
            duration: 0.2,
            ease: 'none',
          },
          0
        )

        // STAGE 2: 20% -> 70% (Move Apart within Safe Mobile Bounds)
        tl.to(
          cardOneRef.current,
          {
            x: -72,
            y: -35,
            rotationY: 12,
            rotationZ: -5,
            scale: 0.92,
            duration: 0.5,
            ease: 'none',
          },
          0.2
        )
        .to(
          cardTwoRef.current,
          {
            x: 72,
            y: 35,
            rotationY: -12,
            rotationZ: 5,
            scale: 0.95,
            duration: 0.5,
            ease: 'none',
          },
          0.2
        )

        // STAGE 3: 70% -> 90% (3D Depth Climax & Composition Hold)
        tl.to(
          cardOneRef.current,
          {
            x: -75,
            y: -32,
            scale: 0.95,
            rotationY: 14,
            rotationX: 2,
            rotationZ: -4,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )
        .to(
          cardTwoRef.current,
          {
            x: 75,
            y: 38,
            scale: 1,
            rotationY: -14,
            rotationX: -2,
            rotationZ: 4,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )
        .to(
          [imgOneRef.current, imgTwoRef.current],
          {
            scale: 1,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )

        // STAGE 4: 90% -> 100% (Exit Transition)
        tl.to(
          cardOneRef.current,
          {
            y: -60,
            opacity: 0,
            scale: 0.88,
            duration: 0.1,
            ease: 'power1.in',
          },
          0.9
        )
        .to(
          cardTwoRef.current,
          {
            y: -40,
            opacity: 0,
            scale: 0.92,
            duration: 0.1,
            ease: 'power1.in',
          },
          0.9
        )

        // Subtle background lines parallax
        if (linesRef.current) {
          tl.to(
            linesRef.current,
            {
              yPercent: -14,
              opacity: 0.2,
              duration: 1,
              ease: 'none',
            },
            0
          )
        }
      })

      // Desktop & Large Screens (> 768px)
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 0.8,
            pin: stageRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Initial State
        gsap.set(cardOneRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: -80,
          y: -80,
          opacity: 0,
          scale: 0.88,
          rotationZ: -3,
          rotationY: 6,
          rotationX: 0,
          transformPerspective: 1200,
          transformOrigin: 'center center',
        })

        gsap.set(cardTwoRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: 80,
          y: 80,
          opacity: 0,
          scale: 0.88,
          rotationZ: 3,
          rotationY: -6,
          rotationX: 0,
          transformPerspective: 1200,
          transformOrigin: 'center center',
        })

        gsap.set([imgOneRef.current, imgTwoRef.current], {
          scale: 1.08,
        })

        // STAGE 1: 0% -> 20% (Appear)
        tl.to(
          cardOneRef.current,
          {
            opacity: 1,
            scale: 0.92,
            x: -80,
            y: -80,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        )
        .to(
          cardTwoRef.current,
          {
            opacity: 1,
            scale: 0.92,
            x: 80,
            y: 80,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.04
        )
        .to(
          [imgOneRef.current, imgTwoRef.current],
          {
            scale: 1.04,
            duration: 0.2,
            ease: 'none',
          },
          0
        )

        // STAGE 2: 20% -> 70% (Move Apart)
        tl.to(
          cardOneRef.current,
          {
            x: -125,
            y: -45,
            rotationZ: -4,
            rotationY: 10,
            scale: 0.96,
            duration: 0.5,
            ease: 'none',
          },
          0.2
        )
        .to(
          cardTwoRef.current,
          {
            x: 125,
            y: 45,
            rotationZ: 4,
            rotationY: -10,
            scale: 0.98,
            duration: 0.5,
            ease: 'none',
          },
          0.2
        )

        // STAGE 3: 70% -> 90% (3D Depth)
        tl.to(
          cardOneRef.current,
          {
            x: -135,
            y: -40,
            scale: 1,
            rotationY: 12,
            rotationX: 2,
            rotationZ: -3,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )
        .to(
          cardTwoRef.current,
          {
            x: 135,
            y: 50,
            scale: 1.04,
            rotationY: -12,
            rotationX: -2,
            rotationZ: 3,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )
        .to(
          [imgOneRef.current, imgTwoRef.current],
          {
            scale: 1,
            duration: 0.2,
            ease: 'none',
          },
          0.7
        )

        // STAGE 4: 90% -> 100% (Exit)
        tl.to(
          cardOneRef.current,
          {
            y: -80,
            opacity: 0,
            scale: 0.92,
            duration: 0.1,
            ease: 'power1.in',
          },
          0.9
        )
        .to(
          cardTwoRef.current,
          {
            y: -50,
            opacity: 0,
            scale: 0.95,
            duration: 0.1,
            ease: 'power1.in',
          },
          0.9
        )

        if (linesRef.current) {
          tl.to(
            linesRef.current,
            {
              yPercent: -10,
              opacity: 0.2,
              duration: 1,
              ease: 'none',
            },
            0
          )
        }
      })
    }, sectionRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section id="transformations" className="transformations-container static-mode">
        <div className="transformations-intro">
          <span className="eyebrow">The Dee&apos;s touch</span>
          <h2>Beautiful transformations</h2>
          <p>Every look is created to complement your natural beauty — never hide it.</p>
        </div>
        <div className="transformations-static-grid">
          <div className="floating-card">
            <div className="floating-card-inner">
              <img src={imageOne} alt="Dee's Hair, Beauty & Bridal Salon natural look" />
            </div>
            <span className="floating-card-badge">Natural</span>
          </div>
          <div className="floating-card">
            <div className="floating-card-inner">
              <img src={imageTwo} alt="Dee's Hair, Beauty & Bridal Salon radiant finish" />
            </div>
            <span className="floating-card-badge">Radiant</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="transformations-container"
      aria-label="Beautiful Transformations"
    >
      <div className="transformations-intro">
        <span className="eyebrow">The Dee&apos;s touch</span>
        <h2>Beautiful transformations</h2>
        <p>Every look is created to complement your natural beauty — never hide it.</p>
      </div>

      <div ref={stageRef} className="transformation-stage">
        {/* Subtle dark ambient glow */}
        <div className="transformations-glow" />

        {/* Subtle horizontal guide lines */}
        <div ref={linesRef} className="transformations-bg-lines" aria-hidden="true">
          <div className="transformations-line" />
          <div className="transformations-line" />
          <div className="transformations-line" />
        </div>

        {/* Center-Anchored Stage Container */}
        <div className="transformation-center">
          {/* Card 1: Centered / Upper-Left floating card */}
          <div
            ref={cardOneRef}
            className="image-card image-card-one"
          >
            <div className="floating-card">
              <div className="floating-card-inner">
                <img
                  ref={imgOneRef}
                  src={imageOne}
                  alt="Dee's Hair, Beauty & Bridal Salon natural transformation"
                  loading="lazy"
                />
              </div>
              <span className="floating-card-badge">Natural</span>
            </div>
          </div>

          {/* Card 2: Centered / Lower-Right floating card */}
          <div
            ref={cardTwoRef}
            className="image-card image-card-two"
          >
            <div className="floating-card">
              <div className="floating-card-inner">
                <img
                  ref={imgTwoRef}
                  src={imageTwo}
                  alt="Dee's Hair, Beauty & Bridal Salon radiant transformation"
                  loading="lazy"
                />
              </div>
              <span className="floating-card-badge">Radiant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
