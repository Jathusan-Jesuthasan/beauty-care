import { Award, Heart, MapPin, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

export function TrustSection() {
  const trustPillars = [
    {
      icon: MapPin,
      title: '4 Prime Branches',
      subtitle: 'Thalawathugoda, Piliyandala, Biyagama & Colombo 07',
    },
    {
      icon: Sparkles,
      title: 'Bridal Expertise',
      subtitle: 'Comprehensive bridal hair, makeup & trial styling',
    },
    {
      icon: Heart,
      title: 'Personalised Care',
      subtitle: 'Tailored around your style, occasion and comfort',
    },
    {
      icon: Award,
      title: 'Verified Excellence',
      subtitle: 'Top-rated hair & beauty services in Sri Lanka',
    },
  ] as const

  return (
    <section className="trust-section" aria-label="Why clients trust Dee's">
      <div className="trust-container">
        <ScrollReveal variant="fade-up">
          <div className="trust-grid">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.title} className="trust-card">
                  <div className="trust-icon-wrapper" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <div className="trust-info">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
