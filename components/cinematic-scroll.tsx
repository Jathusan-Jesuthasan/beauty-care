'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CinematicScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      {
        const hero = document.querySelector('.hero')
        if (hero) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=115%', scrub: 0.8 } })
          tl.to('.hero-copy', { y: -90, opacity: 0.35, ease: 'none' }, 0)
            .to('.hero-actions', { y: -15, ease: 'none' }, 0)
            .to('.hero-visual', { y: -18, scale: 1.08, ease: 'none' }, 0)
            .to('.hero-visual img', { borderRadius: '12px', ease: 'none' }, 0.45)
        }

        document.querySelectorAll<HTMLElement>('.masked-title').forEach((title) => {
          const lines = title.querySelectorAll<HTMLElement>('.mask-line > span')
          gsap.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 86%', once: true } })
        })

        document.querySelectorAll<HTMLElement>('.cinematic-section').forEach((section) => {
          gsap.fromTo(section.querySelectorAll('.cinematic-image'), { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
        })

        const bridal = document.querySelector('.bridal')
        if (bridal) gsap.timeline({ scrollTrigger: { trigger: bridal, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
          .to('.bridal-image', { scale: 1.04, ease: 'none' }, 0)
          .to('.bridal-copy', { y: -35, ease: 'none' }, 0)

        document.querySelectorAll<HTMLElement>('.gallery-item').forEach((item, i) => {
          gsap.fromTo(item, { x: i % 2 ? 15 : -15 }, { x: 0, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'top 55%', scrub: 0.7 } })
        })

        const contact = document.querySelector('.contact')
        if (contact) gsap.fromTo(contact.querySelectorAll('.contact-copy, .contact-details, .map-placeholder'), { y: 40, opacity: 0.3, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: contact, start: 'top 78%', end: 'top 35%', scrub: 0.8 } })

      }
    }, root)
    return () => ctx.revert()
  }, [])

  return <main ref={root}>{children}</main>
}

export function MaskedTitle({ children }: { children: React.ReactNode }) {
  return <span className="masked-title">{String(children).split(/\n|(?<=\.) /).map((line, i) => <span className="mask-line" key={`${line}-${i}`}><span>{line}</span></span>)}</span>
}

export function ServiceStack({ children }: { children: React.ReactNode }) {
  return <div className="service-stack">{children}</div>
}

export function CinematicImage({ children }: { children: React.ReactNode }) {
  return <div className="cinematic-image">{children}</div>
}
