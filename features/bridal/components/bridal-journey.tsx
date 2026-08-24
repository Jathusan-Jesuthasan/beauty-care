import { beautyJourney } from '../data/journey'
import { StaggerGroup, StaggerItem } from '@/components/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * BridalJourney
 *
 * Displays the four-stage beauty preparation timeline as a horizontal
 * step-by-step sequence. Each step animates in using StaggerItem on scroll.
 *
 * On mobile, the layout collapses to a vertical timeline via CSS
 * (see .journey-timeline in globals.css).
 */
export function BridalJourney() {
  return (
    <section
      id="bridal-journey"
      className="section bridal-journey"
      aria-labelledby="journey-title"
    >
      <SectionHeading
        label="The Beauty Journey"
        title="Beauty rituals designed around you."
        copy="Experience a calm, considered approach to beauty. From consultation to reveal, every step is focused on you."
      />

      <StaggerGroup>
        <div className="journey-timeline">
          {beautyJourney.map((step) => (
            <StaggerItem key={step.number}>
              <article className="journey-step" tabIndex={0}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.note}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}
