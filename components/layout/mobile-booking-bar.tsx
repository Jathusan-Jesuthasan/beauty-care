import { ArrowUpRight, Phone } from 'lucide-react'
import { SALON_PHONE } from '@/lib/constants/site'

/**
 * MobileBookingBar
 *
 * A sticky bottom action bar visible only on mobile viewports (≤760px).
 * Provides two quick-action links: a direct phone call and a booking CTA.
 *
 * This is a Server Component — no state or browser APIs are required.
 *
 * Visibility is controlled entirely by CSS:
 * - `.mobile-book` is `display: none` above 760px breakpoint
 * - `.mobile-book` is `display: flex` at ≤760px (see globals.css)
 *
 * The phone number is formatted for the `tel:` protocol by removing spaces.
 * The aria-label on the call link includes the readable phone number for
 * screen reader users who may not parse `tel:` URIs.
 */
export function MobileBookingBar() {
  const callHref = `tel:${SALON_PHONE.replaceAll(' ', '')}`

  return (
    <div className="mobile-book">
      <a href={callHref} aria-label={`Call Dee's Salon at ${SALON_PHONE}`}>
        <Phone size={16} />
        Call
      </a>
      <a href="#contact">
        Book appointment <ArrowUpRight size={16} />
      </a>
    </div>
  )
}
