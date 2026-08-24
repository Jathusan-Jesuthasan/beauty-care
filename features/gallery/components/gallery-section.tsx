'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { galleryImages } from '../data/gallery-images'

export function GallerySection() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = galleryImages.filter(
    ([category]) => filter === 'All' || category === filter,
  )

  const selectedIndex = selected
    ? galleryImages.findIndex(([, src]) => src === selected)
    : -1

  function move(direction: number) {
    setSelected(
      galleryImages[(selectedIndex + direction + galleryImages.length) % galleryImages.length][1],
    )
  }

  useEffect(() => {
    if (!selected) {
      // Focus restoration: focus the button that opened the lightbox
      const button = document.querySelector(`button[aria-label="View ${filtered.find(f => f[1] === selected)?.[0]} gallery image"]`) as HTMLButtonElement
      if (button) button.focus()
      return
    }

    const lightbox = document.querySelector('.lightbox') as HTMLElement
    const focusableElements = lightbox?.querySelectorAll('button')
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    // Focus the first element (close button) when lightbox opens
    firstElement?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)

      // Focus trap
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            event.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            event.preventDefault()
          }
        }
      }
    }

    document.body.classList.add('lightbox-open')
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('lightbox-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected, selectedIndex, filtered])

  return (
    <section id="gallery" className="section gallery">
      <SectionHeading
        label="A little inspiration"
        title="The Dee's edit."
        copy="A glimpse of hair, beauty, bridal and reference moments. Replace temporary images with the salon's own work when ready."
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

      {/* Gallery grid — Framer Motion layout animation on filter change */}
      <div className="gallery-grid">
        {filtered.map(([category, src, altText]) => (
          <motion.button
            layout
            key={src}
            className="gallery-item"
            style={{ position: 'relative' }}
            onClick={() => setSelected(src)}
            aria-label={`View ${category} gallery image`}
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
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Selected gallery image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="lightbox-close"
              aria-label="Close image"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <button
              className="lightbox-prev"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation()
                move(-1)
              }}
            >
              <ArrowLeft />
            </button>
            <Image
              src={selected}
              alt="Selected salon work"
              fill
              sizes="100vw"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              className="lightbox-next"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation()
                move(1)
              }}
            >
              <ArrowRight />
            </button>
            <span className="lightbox-count" aria-live="polite">
              {selectedIndex + 1} / {galleryImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
