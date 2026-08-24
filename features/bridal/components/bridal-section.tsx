import Image from 'next/image'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SALON_EMAIL } from '@/lib/constants/site'
import { BRIDAL_IMAGE_URL } from '@/lib/constants/images'

export function BridalSection() {
  const bridalWhatsappHref = `https://wa.me/94703877877?text=${encodeURIComponent("Hello Dee's Salon, I would like to inquire about your Bridal hair & makeup services.")}`

  return (
    <section id="bridal" className="bridal">
      <ScrollReveal variant="scale">
        <div className="bridal-image">
          <Image
            src={BRIDAL_IMAGE_URL}
            alt="Bridal party makeup preparation at Dee's Salon"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <div className="bridal-copy">
          <SectionHeading
            light
            label="The bridal experience"
            title="Your special day, beautifully yours."
            copy="From bridal hair and makeup to complete beauty preparation, let Dee's help you look and feel unforgettable on your most special day."
          />
          <div className="bridal-actions">
            <a
              className="button button-light"
              href={`mailto:${SALON_EMAIL}?subject=Plan my bridal look`}
            >
              Plan your bridal look <ArrowUpRight size={15} />
            </a>
            <a
              className="button button-outline"
              href={bridalWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp bridal team <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
