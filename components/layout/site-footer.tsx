import {
  ArrowUpRight,
  Camera,
  MessageCircle,
  PhoneCall,
} from 'lucide-react'
import { SiteLogo } from './site-logo'
import { FacebookIcon } from '@/components/icons/facebook-icon'
import {
  SALON_EMAIL,
  SALON_FACEBOOK_URL,
  SALON_INSTAGRAM_URL,
  SALON_NAME,
  SALON_PHONE,
} from '@/lib/constants/site'

const FOOTER_NAV_LINKS = ['home', 'about', 'services', 'bridal', 'gallery', 'locations', 'contact'] as const
const LOCATION_LINKS = [
  ['Thalawathugoda', '/locations/thalawathugoda'],
  ['Piliyandala', '/locations/piliyandala'],
  ['Biyagama', '/locations/biyagama'],
  ['Colombo 07', '/locations/colombo-07'],
  ['Battaramulla', '/locations/battaramulla'],
] as const

export function SiteFooter() {
  const callHref = `tel:${SALON_PHONE.replaceAll(' ', '')}`
  const whatsappHref = `https://wa.me/94703877877?text=${encodeURIComponent("Hello Dee's Salon, I would like to inquire about booking an appointment.")}`

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top row: brand, tagline, nav, branches, contact */}
        <div className="footer-grid">
          {/* Col 1: Brand & Statement */}
          <div className="footer-col footer-brand-col">
            <SiteLogo light />
            <p className="footer-tagline">
              Hair · Beauty · Bridal Salon
            </p>
            <p className="footer-statement">
              Personalised hair, beauty and bridal services tailored around your style, occasion and confidence.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <nav className="footer-links" aria-label="Footer navigation">
              {FOOTER_NAV_LINKS.map((sectionId) => (
                <a key={sectionId} href={`/#${sectionId}`}>
                  {sectionId[0].toUpperCase() + sectionId.slice(1)}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Branches */}
          <div className="footer-col">
            <h4 className="footer-heading">Branches</h4>
            <nav className="footer-links" aria-label="Salon location branches">
              {LOCATION_LINKS.map(([name, url]) => (
                <a key={name} href={url}>
                  {name}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">Contact & Booking</h4>
            <div className="footer-contact-items">
              <a href={callHref} className="footer-contact-link">
                <PhoneCall size={15} aria-hidden="true" />
                <span>{SALON_PHONE}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link footer-whatsapp-link"
              >
                <MessageCircle size={15} aria-hidden="true" className="whatsapp-icon" />
                <span>WhatsApp Us</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a
                className="footer-contact-link footer-facebook-link"
                href={SALON_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Dee's Hair, Beauty & Bridal Salon on Facebook"
              >
                <FacebookIcon size={15} className="facebook-icon" />
                <span>Facebook Page</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a
                className="footer-contact-link footer-instagram-link"
                href={SALON_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Dee's Hair, Beauty & Bridal Salon on Instagram"
              >
                <Camera size={15} />
                <span>Instagram</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright and contact email */}
        <div className="footer-bottom">
          <span>© 2026 {SALON_NAME}. All rights reserved.</span>
          <a href={`mailto:${SALON_EMAIL}`}>{SALON_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}
