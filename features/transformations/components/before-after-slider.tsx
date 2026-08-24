'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Transformation } from '../types'

interface BeforeAfterSliderProps {
  transformation: Transformation
}

/**
 * BeforeAfterSlider
 *
 * Renders a draggable before/after image comparison for a single transformation.
 * The slider position is controlled by a range input, which clips the "after"
 * image using CSS `clip-path: inset(0 0 0 <position>%)`.
 *
 * The range input is the actual interactive control and is keyboard-accessible.
 * An `aria-label` is applied to the input for screen reader compatibility.
 *
 * Animation: The `.transformation-slider` CSS class applies a subtle
 * `translateY(-3px)` on `:focus-within` (see globals.css). This is a CSS
 * micro-interaction — no JavaScript animation is used here.
 *
 * Animation contract: Do not rename `.transformation-after` — it is the
 * clip-path target driven by the slider position state.
 */
export function BeforeAfterSlider({ transformation }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="transformation-slider">
      {/* Image frame — before image is the base layer */}
      <div className="transformation-frame">
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
          aria-hidden="true"
        />
      </div>

      {/* Range input — the accessible interactive control */}
      <label className="transformation-control">
        Compare images
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(event) => setSliderPosition(Number(event.target.value))}
          aria-label="Move before and after comparison"
        />
      </label>

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
