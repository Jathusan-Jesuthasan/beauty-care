import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { SALON_PHONE } from '@/lib/constants/site'

/**
 * MobileBookingBar
 *
 * A sticky bottom action bar visible only on mobile viewports (≤760px).
 * Provides three quick-action links: Call | WhatsApp | Book Appointment.
 *
 * - `.mobile-book` is `display: none` above 760px breakpoint
 * - `.mobile-book` is `display: grid` at ≤760px with safe-area padding
 */
export function MobileBookingBar() {
  const callHref = `tel:${SALON_PHONE.replaceAll(' ', '')}`
  const whatsappHref = `https://wa.me/94703877877?text=${encodeURIComponent("Hello Dee's Salon, I would like to inquire about booking an appointment.")}`

  return (
    <nav className="mobile-book" aria-label="Quick mobile booking actions">
      <a
        href={callHref}
        className="mobile-book-action"
        aria-label={`Call Dee's Salon at ${SALON_PHONE}`}
      >
        <Phone size={15} />
        <span>Call</span>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-book-action mobile-book-whatsapp"
        aria-label="Chat with Dee's Salon on WhatsApp"
      >
        <MessageCircle size={15} />
        <span>WhatsApp</span>
      </a>
      <a
        href="#contact"
        className="mobile-book-action mobile-book-primary"
        aria-label="Book an appointment"
      >
        <span>Book</span>
        <ArrowUpRight size={14} />
      </a>
    </nav>
  )
}
