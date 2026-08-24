import { ArrowUpRight } from 'lucide-react'
import { SiteLogo } from './site-logo'
import { SALON_EMAIL, SALON_FACEBOOK_URL, SALON_NAME } from '@/lib/constants/site'

/**
 * The ordered list of section anchor IDs rendered in the footer nav.
 * Labels are derived by capitalising the first character of each ID.
 */
const FOOTER_NAV_LINKS = ['about', 'services', 'bridal', 'gallery', 'contact'] as const

/**
 * SiteFooter
 *
 * The site-wide footer. Renders the brand logo, tagline, navigation links,
 * a Facebook social link, and a copyright line with the contact email.
 *
 * This is a Server Component — no state or browser APIs are required.
 *
 * Layout (two rows):
 * - `.footer-top`    — logo, tagline, nav links, Facebook link
 * - `.footer-bottom` — copyright string and email address
 *
 * Animation contract:
 * - `.footer` — no animations. Do not rename.
 * - `.footer-social` — CSS hover only (opacity fade + translateY).
 * - `.footer-top`, `.footer-bottom` — layout only.
 */
export function SiteFooter() {
  return (
    <footer className="footer">
      {/* Top row: brand, tagline, navigation, social */}
      <div className="footer-top">
        <SiteLogo light />

        <p>Hair · Beauty · Bridal Salon</p>

        <nav aria-label="Footer navigation">
          {FOOTER_NAV_LINKS.map((sectionId) => (
            <a key={sectionId} href={`#${sectionId}`}>
              {sectionId[0].toUpperCase() + sectionId.slice(1)}
            </a>
          ))}
        </nav>

        <a
          className="footer-social"
          href={SALON_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Dee's Hair, Beauty & Bridal Salon on Facebook"
        >
          <span aria-hidden="true">f</span> Facebook
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>

      {/* Bottom row: copyright and contact email */}
      <div className="footer-bottom">
        <span>© 2026 {SALON_NAME}. All rights reserved.</span>
        <a href={`mailto:${SALON_EMAIL}`}>{SALON_EMAIL}</a>
      </div>
    </footer>
  )
}
