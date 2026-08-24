import { ArrowUpRight, Phone } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { SALON_EMAIL, SALON_PHONE } from '@/lib/constants/site'

export function ContactSection() {
  const callHref = `tel:${SALON_PHONE.replaceAll(' ', '')}`

  return (
    <section id="contact" className="contact">
      <SectionHeading
        light
        label="Start a conversation"
        title="Ready for your next look?"
        copy="Let's make it beautiful. Tell us what you have in mind and we'll help you find the right service."
      />
      <div className="contact-details">
        <a href={callHref}>
          <Phone size={18} />
          <span>
            <small>Call us</small>
            {SALON_PHONE}
          </span>
        </a>
        <a href={`mailto:${SALON_EMAIL}`}>
          <span className="contact-symbol">@</span>
          <span>
            <small>Email us</small>
            {SALON_EMAIL}
          </span>
        </a>
        <div className="contact-actions">
          <a className="button button-light" href={callHref}>
            Call now <Phone size={15} />
          </a>
          <a className="text-link light-link" href={`mailto:${SALON_EMAIL}`}>
            Email us <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
