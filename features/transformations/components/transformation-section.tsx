import { transformations } from '../data/transformations'
import { BeforeAfterSlider } from './before-after-slider'
import { SectionHeading } from '@/components/ui/section-heading'

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
 * Note: Current imagery is placeholder/reference. These will be replaced
 * with verified Dee's salon transformation photography.
 */
export function TransformationSection() {
  return (
    <section id="transformations" className="section transformations">
      <SectionHeading
        label="Visual reference"
        title="The Dee's transformation."
        copy="Explore the difference a considered beauty experience can make. These reference images are placeholders until the salon's own work is supplied."
      />

      <div className="transformation-tabs">
        {transformations.map((transformation) => (
          <article key={transformation.id}>
            <h3>{transformation.category}</h3>
            <BeforeAfterSlider transformation={transformation} />
          </article>
        ))}
      </div>
    </section>
  )
}
