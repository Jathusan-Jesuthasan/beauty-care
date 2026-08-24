'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Transformation } from '../types'

interface BeforeAfterSliderProps {
  transformation: Transformation
}

/**
 * BeforeAfterSlider
 *
 * Renders a draggable before/after image comparison for a single transformation.
 * The comparison handle is part of the image frame so the divider, reveal, and
 * pointer target always move together.
 */
export function BeforeAfterSlider({ transformation }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const frameRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = (clientX: number) => {
    const frame = frameRef.current
    if (!frame) return

    const bounds = frame.getBoundingClientRect()
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, nextPosition)))
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event.clientX)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) updatePosition(event.clientX)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const change = event.key === 'ArrowLeft' ? -5 : 5
      setSliderPosition((position) => Math.max(0, Math.min(100, position + change)))
    }
  }

  return (
    <div className="transformation-slider">
      {/* Image frame — before image is the base layer */}
      <div
        ref={frameRef}
        className="transformation-frame"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={transformation.beforeImage}
          alt={transformation.beforeLabel}
          fill
          sizes="(max-width: 760px) 92vw, 48vw"
        />

        {/* After image — clipped from the left by the slider position */}
        <div
          className="transformation-after"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <Image
            src={transformation.afterImage}
            alt={transformation.afterLabel}
            fill
            sizes="(max-width: 760px) 92vw, 48vw"
          />
        </div>

        {/* Image labels */}
        <span className="transformation-label transformation-label-before">
          {transformation.beforeLabel}
        </span>
        <span className="transformation-label transformation-label-after">
          {transformation.afterLabel}
        </span>

        {/* Visual divider line at the slider position */}
        <div
          className="transformation-divider"
          style={{ left: `${sliderPosition}%` }}
        >
          <button
            type="button"
            className="transformation-handle"
            role="slider"
            aria-label="Adjust before and after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            onKeyDown={handleKeyDown}
          >
            <span aria-hidden="true">↔</span>
          </button>
        </div>
      </div>

      {/* Placeholder notice — visible until the salon supplies real imagery */}
      {transformation.placeholder && (
        <p className="placeholder-note">
          Reference imagery only. Replace with verified Dee&apos;s
          transformations.
        </p>
      )}
    </div>
  )
}
