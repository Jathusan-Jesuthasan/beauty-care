import { transformations } from '../data/transformations'
import { BeforeAfterSlider } from './before-after-slider'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

/**
 * TransformationSection
 *
 * Renders the homepage transformations grid — three side-by-side before/after
 * comparison sliders organised by service category (Hair, Beauty, Bridal).
 *
 * This is a Server Component. The interactive slider logic lives inside
 * BeforeAfterSlider which is a Client Component ('use client').
 *
 * Layout: `.transformation-tabs` uses a 3-column grid on desktop.
 * On mobile, the grid collapses to a single column (see globals.css).
 *
 * The comparison imagery is supplied as local salon photography.
 */
export function TransformationSection() {
  return (
    <section id="transformations" className="section transformations">
      <SectionHeading
        label="Visual reference"
        title="The Dee's transformation."
        copy="Explore the difference a considered beauty experience can make."
      />

      <div className="transformation-tabs">
        {transformations.map((transformation, index) => (
          <ScrollReveal key={transformation.id} variant="scale" delay={index * 0.08}>
            <article>
              <h3>{transformation.category}</h3>
              <BeforeAfterSlider transformation={transformation} />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
