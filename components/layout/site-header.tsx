'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SiteLogo } from './site-logo'
import { BookingLink } from '@/components/ui/booking-link'

/**
 * Navigation link definition — a [label, sectionId] tuple.
 * The sectionId maps to the `id` attribute of a page section element.
 */
type NavLink = [label: string, sectionId: string]

/**
 * The ordered list of navigation links rendered in the header.
 * Each entry links to a hash anchor (#sectionId) on the homepage.
 */
const NAV_LINKS: NavLink[] = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Services', 'services'],
  ['Bridal', 'bridal'],
  ['Gallery', 'gallery'],
  ['Locations', 'locations'],
  ['Contact', 'contact'],
]

/**
 * SiteHeader
 *
 * The primary site navigation header. Fixed to the top of the viewport.
 * Manages three pieces of state:
 *
 * 1. `scrolled` — true when the page has scrolled past 24px.
 *    Adds the `.scrolled` class which triggers the background fill
 *    and border transition defined in globals.css.
 *
 * 2. `active` — the sectionId of the currently visible section.
 *    Determined by comparing the scroll position against section offsets.
 *    Uses `aria-current="page"` to communicate the active link to assistive tech.
 *
 * 3. `open` — whether the mobile navigation overlay is open.
 *    When true, adds `.menu-open` to `document.body` (locks body scroll
 *    and shows the overlay via CSS).
 *    Focuses the close button immediately on open for keyboard accessibility.
 *    Escape key closes the menu from anywhere on the page.
 *
 * Animation contracts (do not rename these classes without auditing globals.css
 * and cinematic-scroll.tsx):
 * - `.nav`           — the fixed header element
 * - `.nav-links`     — the navigation link list (hidden on mobile when closed)
 * - `.scrolled`      — class added to `.nav` after scroll threshold
 * - `.menu-open`     — class added to `document.body` when mobile nav is open
 * - `.menu-button`   — the hamburger/close toggle button
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  /**
   * Ref to the menu toggle button. Used to restore focus to the close button
   * when the mobile menu opens (keyboard accessibility requirement).
   */
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // ── Effect 1: Scroll detection and active section tracking ────────────────
  useEffect(() => {
    /** Sets `scrolled` based on whether the page has scrolled past 24px. */
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }

    /**
     * Updates `active` to the sectionId of the section closest to the
     * top 35% of the viewport. Falls back to a hash-based check for
     * precise section targeting immediately after a hash navigation.
     */
    function updateActiveSection() {
      const currentHash = window.location.hash.slice(1)

      // Immediately honour the hash if we just jumped to that section
      const isNearHashSection =
        currentHash &&
        NAV_LINKS.some(([, id]) => id === currentHash) &&
        Math.abs(
          window.scrollY -
            (document.getElementById(currentHash)?.offsetTop ?? 0),
        ) < 12

      if (isNearHashSection) {
        setActive(currentHash)
        return
      }

      // Otherwise, find the last section whose top is above the 35% viewport marker
      const viewportMarker = window.scrollY + window.innerHeight * 0.35

      const currentSection = NAV_LINKS.map(([, id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .filter((section) => section.offsetTop <= viewportMarker)
        .at(-1)

      setActive(currentSection?.id ?? 'home')
    }

    /** Syncs `active` immediately when the URL hash changes (e.g. on click). */
    function handleHashChange() {
      setActive(window.location.hash.slice(1) || 'home')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', handleHashChange)

    // Run once on mount to set initial state
    handleScroll()
    handleHashChange()
    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // ── Effect 2: Mobile menu body-lock and Escape key handler ────────────────
  useEffect(() => {
    // Toggle the body scroll-lock class used by the mobile overlay CSS
    document.body.classList.toggle('menu-open', open)

    // Move focus to the menu button when the menu opens (keyboard accessibility)
    if (open) {
      menuButtonRef.current?.focus()
    }

    /** Closes the menu when the user presses Escape from anywhere on the page. */
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      // Always clean up the body class to prevent stuck state on unmount
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-is-open' : ''}`}>
      <SiteLogo />

      <nav
        className={`nav-links${open ? ' open' : ''}`}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(([label, sectionId]) => (
          <a
            key={sectionId}
            href={`#${sectionId}`}
            aria-current={active === sectionId ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}

        <BookingLink href="#contact">Book appointment</BookingLink>
      </nav>

      <button
        ref={menuButtonRef}
        className="menu-button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}
