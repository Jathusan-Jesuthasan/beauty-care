import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/scroll-reveal'

export function WhyChooseUsSection() {
  const differentiators = [
    ['01', 'Personalised beauty', 'Every service is tailored to your style and preferences.'],
    ['02', 'Professional care', 'Focused on quality, detail and customer experience.'],
    ['03', 'Bridal expertise', 'Beautifully coordinated hair and beauty for special occasions.'],
    ['04', 'Your experience matters', 'A welcoming environment designed around comfort and confidence.'],
  ] as const

  return (
    <section className="section why">
      <SectionHeading label="The Dee's difference" title="Beauty, with intention." />
      <StaggerGroup className="why-grid">
        {differentiators.map(([number, title, copy]) => (
          <StaggerItem key={number}>
            <article className="why-item">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
