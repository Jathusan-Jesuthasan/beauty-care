'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { galleryImages } from '../data/gallery-images'

export function GallerySection() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const filtered = galleryImages.filter(
    ([category]) => filter === 'All' || category === filter,
  )

  const selectedIndex = selected
    ? galleryImages.findIndex(([, src]) => src === selected)
    : -1

  function move(direction: number) {
    if (selectedIndex === -1) return
    const nextIndex =
      (selectedIndex + direction + galleryImages.length) % galleryImages.length
    setSelected(galleryImages[nextIndex][1])
  }

  // ── Lightbox Scroll Lock, Focus Trap & Keyboard Navigation ─────────────
  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = ''
      document.body.classList.remove('lightbox-open')
      return
    }

    // Lock page scroll completely
    document.body.style.overflow = 'hidden'
    document.body.classList.add('lightbox-open')

    const lightbox = document.querySelector('.lightbox-modal') as HTMLElement
    const focusableElements = lightbox?.querySelectorAll<HTMLButtonElement>('button')
    const firstElement = focusableElements?.[0]
    const lastElement = focusableElements?.[focusableElements.length - 1]

    firstElement?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelected(null)
      } else if (event.key === 'ArrowLeft') {
        move(-1)
      } else if (event.key === 'ArrowRight') {
        move(1)
      } else if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus()
          event.preventDefault()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('lightbox-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected, selectedIndex])

  // ── Touch Swipe Handlers for Mobile ────────────────────────────────────
  function handleTouchStart(e: React.TouchEvent) {
    touchStartXRef.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartXRef.current === null) return
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX
    touchStartXRef.current = null

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) move(1) // Swipe left -> next
      else move(-1) // Swipe right -> prev
    }
  }

  const currentImageInfo = selected
    ? galleryImages.find(([, src]) => src === selected)
    : null

  return (
    <section id="gallery" className="section gallery">
      <SectionHeading
        label="A little inspiration"
        title="The Dee's edit."
        copy="A glimpse of hair, beauty, bridal and reference moments crafted at Dee's Salon."
      />

      {/* Category filter tabs */}
      <div className="filters" role="tablist" aria-label="Gallery categories">
        {['All', 'Hair', 'Beauty', 'Bridal', 'Transformations'].map(
          (category) => (
            <button
              key={category}
              role="tab"
              aria-selected={filter === category}
              className={filter === category ? 'active' : ''}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Gallery grid */}
      <motion.div
        key={filter}
        className="gallery-grid"
        suppressHydrationWarning
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {filtered.map(([category, src, altText], index) => (
          <motion.button
            layout
            key={src}
            suppressHydrationWarning
            className="gallery-item"
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelected(src)}
            aria-label={`View ${category} gallery image: ${altText}`}
          >
            <Image
              src={src}
              alt={altText}
              fill
              sizes="(max-width: 760px) 50vw, 30vw"
            />
            <span>
              {category}
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Selected gallery image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              className="lightbox-btn lightbox-close-btn"
              aria-label="Close image lightbox"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>

            {/* Previous Button */}
            <button
              className="lightbox-btn lightbox-nav-btn lightbox-prev-btn"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation()
                move(-1)
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Center Image Container */}
            <div
              className="lightbox-content-frame"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="lightbox-image-wrapper">
                <Image
                  src={selected}
                  alt={currentImageInfo ? currentImageInfo[2] : 'Selected salon work'}
                  fill
                  priority
                  className="lightbox-active-image"
                  sizes="(max-width: 768px) 95vw, 85vw"
                />
              </div>

              {/* Caption & Counter Bar */}
              <div className="lightbox-caption-bar">
                <span className="lightbox-category-tag">
                  {currentImageInfo ? currentImageInfo[0] : 'Gallery'}
                </span>
                <span className="lightbox-counter-text" aria-live="polite">
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(galleryImages.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              className="lightbox-btn lightbox-nav-btn lightbox-next-btn"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation()
                move(1)
              }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
