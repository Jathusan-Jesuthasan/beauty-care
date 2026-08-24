import {
  ArrowUpRight,
  Camera,
  MessageCircle,
  PhoneCall,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FacebookIcon } from '@/components/icons/facebook-icon'
import {
  SALON_EMAIL,
  SALON_FACEBOOK_URL,
  SALON_INSTAGRAM_URL,
  SALON_PHONE,
} from '@/lib/constants/site'

export function ContactSection() {
  const callHref = `tel:${SALON_PHONE.replaceAll(' ', '')}`
  const whatsappHref = `https://wa.me/94703877877?text=${encodeURIComponent("Hello Dee's Salon, I would like to book an appointment.")}`

  return (
    <section id="contact" className="contact">
      <ScrollReveal variant="fade-up">
        <SectionHeading
          light
          label="Start a conversation"
          title="Ready for your next look?"
          copy="Let's make it beautiful. Tell us what you have in mind and we'll help you find the right service."
        />
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <div className="contact-details">
        <a href={callHref}>
          <PhoneCall size={18} />
          <span>
            <small>Call us</small>
            {SALON_PHONE}
          </span>
        </a>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} />
          <span>
            <small>WhatsApp us</small>
            WhatsApp Direct Chat
          </span>
        </a>
        <a href={SALON_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
          <FacebookIcon size={18} style={{ color: '#1877F2' }} />
          <span>
            <small>Facebook</small>
            Dee&apos;s Salon Facebook Page
          </span>
        </a>
        <a href={SALON_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <Camera size={18} style={{ color: '#E1306C' }} />
          <span>
            <small>Instagram</small>
            Dee&apos;s Salon Instagram
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
            Call now <PhoneCall size={15} />
          </a>
          <a
            className="button button-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <MessageCircle size={15} />
          </a>
          <a
            className="button button-facebook"
            href={SALON_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook <FacebookIcon size={15} />
          </a>
          <a
            className="button button-outline"
            href={SALON_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <Camera size={15} />
          </a>
          <a className="button button-outline" href={`mailto:${SALON_EMAIL}`}>
            Email us <ArrowUpRight size={15} />
          </a>
        </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
