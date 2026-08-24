import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { notFound } from 'next/navigation'
import { locations, getLocationBySlug } from '@/features/locations/data/locations'
import { formatOpeningHours, getOpeningStatus } from '@/features/locations/utils/opening-status'

const salonPhone = '070 387 7877'
const salonEmail = 'deeshairbeautybridal@gmail.com'

type LocationPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return locations.filter((location) => location.verified).map((location) => ({ slug: location.slug })) }
export const dynamicParams = false

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return { title: "Location not found | Dee's Salon" }
  return { 
    title: `${location.name} | Dee's Hair, Beauty & Bridal Salon`, 
    description: `Discover the Dee's Hair, Beauty & Bridal Salon experience at ${location.name}.`,
    openGraph: {
      title: `${location.name} | Dee's Hair, Beauty & Bridal Salon`,
      description: `Visit our ${location.name} salon branch for premium hair and beauty services.`,
      type: "website",
    }
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location || !location.verified) notFound()
  const status = getOpeningStatus(location.openingHours)
  const phone = location.phone ?? salonPhone
  const email = location.email ?? salonEmail

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": `Dee's Hair, Beauty & Bridal Salon - ${location.name}`,
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressCountry": "LK"
    },
    ...(location.googleMapsUrl ? { "hasMap": location.googleMapsUrl } : {})
  }

  return (
    <main className="location-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="location-back" href="/#locations">Back to all locations</a>
      <section className="location-hero">
        <span className="eyebrow">Dee&apos;s location</span>
        <h1>{location.name}</h1>
        <p>{location.address}</p>
        <span className={`status status-${status.label === 'Open now' ? 'open' : 'pending'}`}>
          {status.label}{status.closesAt ? ` · Closes at ${status.closesAt}` : status.opensAt ? ` · Opens at ${status.opensAt}` : ''}
        </span>
      </section>
      <section className="location-content">
        <div>
          <span className="eyebrow">Your visit</span>
          <h2>Everything you need to plan your appointment.</h2>
        </div>
        <div className="location-details">
          <div><MapPin size={18} /><span><small>Address</small>{location.address}</span></div>
          <div><Phone size={18} /><span><small>Phone</small><a href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</a>{location.secondaryPhone && <a href={`tel:${location.secondaryPhone.replaceAll(' ', '')}`}>{location.secondaryPhone}</a>}</span></div>
          <div><Mail size={18} /><span><small>Email</small><a href={`mailto:${email}`}>{email}</a></span></div>
          <div><span className="location-detail-mark">01</span><span><small>Opening hours</small>{formatOpeningHours(location.openingHours).map((hours) => <span key={hours}>{hours}</span>)}</span></div>
          {location.rating && <div><span className="location-detail-mark">★</span><span><small>Google rating</small>{location.rating.toFixed(1)} · {location.reviewCount?.toLocaleString()} reviews</span></div>}
        </div>
        <div className="location-services">
          <span className="eyebrow">Available services</span>
          {location.services.length ? <div>{location.services.map((service) => <span key={service}>{service}</span>)}</div> : <p className="location-note">Branch-specific services are available by contacting the salon.</p>}
        </div>
        <div className="location-actions">
          {location.googleMapsUrl && <a className="text-link" href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={15} /></a>}
          {location.googleReviewsUrl && <a className="text-link" href={location.googleReviewsUrl} target="_blank" rel="noopener noreferrer">View Google reviews <ArrowUpRight size={15} /></a>}
          <a className="button" href={`mailto:${email}?subject=Book at ${location.name}`}>Book appointment <ArrowUpRight size={15} /></a>
        </div>
      </section>
    </main>
  )
}
