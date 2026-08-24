import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/scroll-reveal'
import {
  BEAUTY_IMAGE_URL,
  BRIDAL_IMAGE_URL,
  HAIR_DETAIL_IMAGE_URL,
} from '@/lib/constants/images'

export function ServicesSection() {
  const serviceItems = [
    ['01', 'Hair', 'Cut · Colour · Styling · Treatments', HAIR_DETAIL_IMAGE_URL, 'Long hair styling service'],
    ['02', 'Beauty', 'Facials · Makeup · Brows · Beauty Care', BEAUTY_IMAGE_URL, 'Advanced facial treatment'],
    ['03', 'Bridal', 'Bridal Hair · Bridal Makeup · Packages', BRIDAL_IMAGE_URL, 'Bridal party makeup preparation'],
  ] as const

  return (
    <section id="services" className="section services">
      <SectionHeading
        label="Our signature services"
        title="The art of feeling like yourself."
        copy="Thoughtful beauty care, considered around your style, your occasion and your time."
      />
      <StaggerGroup>
        <div className="service-grid">
          {serviceItems.map(([number, title, description, imageSrc, altText]) => (
            <StaggerItem key={title}>
              <a
                className="service-card"
                href={title === 'Bridal' ? '#bridal' : '#contact'}
              >
                <div className="service-image" style={{ position: 'relative' }}>
                  <Image
                    src={imageSrc}
                    alt={altText}
                    fill
                    sizes="(max-width: 760px) 90vw, 30vw"
                  />
                  <span>{number}</span>
                </div>
                <div className="service-info">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="explore">
                    Explore <ArrowUpRight size={15} />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}
