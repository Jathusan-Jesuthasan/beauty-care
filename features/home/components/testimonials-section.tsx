import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/scroll-reveal'

export function TestimonialsSection() {
  const reviews = [
    ['\u201cI absolutely loved my bridal look. Every detail was perfect.\u201d', 'Happy bride', 'Placeholder review'],
    ['\u201cI left feeling polished, comfortable and completely myself.\u201d', 'Happy client', 'Placeholder review'],
    ['\u201cSuch a thoughtful experience from beginning to end.\u201d', 'Happy client', 'Placeholder review'],
  ] as const

  return (
    <section className="section testimonials">
      <SectionHeading label="Kind words" title="A beautiful feeling, shared." />
      <StaggerGroup className="testimonial-grid">
        {reviews.map(([quote, name, note]) => (
          <StaggerItem key={quote}>
            <article className="testimonial">
              <span className="quote-mark">&ldquo;</span>
              <p>{quote}</p>
              <footer>
                {name}
                <small>{note}</small>
              </footer>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
