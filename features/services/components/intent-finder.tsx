'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { serviceIntents } from '../data/services'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * IntentFinder
 *
 * Interactive section that helps visitors identify which Dee's service
 * is right for them. Displays a list of service categories (Hair, Beauty,
 * Bridal, Special Event) as tab-style buttons. Selecting a category reveals
 * a description, list of included services, and a CTA link.
 *
 * Uses role="tablist" / role="tab" / role="tabpanel" for accessibility.
 * Keyboard navigation is handled natively by the browser via button focus.
 *
 * Animation: Framer Motion StaggerGroup/StaggerItem is NOT used here.
 * The containing page's scroll reveal handles section entrance animation.
 */
export function IntentFinder() {
  const [selectedId, setSelectedId] = useState(serviceIntents[0].id)

  const selectedIntent =
    serviceIntents.find((intent) => intent.id === selectedId) ??
    serviceIntents[0]

  const selectedIndex = serviceIntents.findIndex(
    (intent) => intent.id === selectedId,
  )

  return (
    <section className="section intent-finder" aria-labelledby="intent-title">
      <SectionHeading
        label="A considered place to begin"
        title="What brings you to Dee's?"
        copy="Tell us what you're looking for and we'll guide you to the right experience."
      />

      <div className="intent-layout">
        {/* Service category selector */}
        <div
          className="intent-options"
          role="tablist"
          aria-label="Choose an experience"
        >
          <span className="intent-prompt">I&apos;m here for</span>

          {serviceIntents.map((intent) => (
            <button
              key={intent.id}
              role="tab"
              aria-selected={selectedIntent.id === intent.id}
              className={selectedIntent.id === intent.id ? 'active' : ''}
              onClick={() => setSelectedId(intent.id)}
            >
              {intent.label}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>

        {/* Selected service detail panel */}
        <div className="intent-result" role="tabpanel">
          <span className="intent-number">
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <h3>{selectedIntent.label}</h3>
          <p>{selectedIntent.description}</p>
          <ul>
            {selectedIntent.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <a className="text-link" href={selectedIntent.target}>
            {selectedIntent.cta} <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
