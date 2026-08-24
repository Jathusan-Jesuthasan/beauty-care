import type { Location } from '../types'

// ─── Shared defaults ──────────────────────────────────────────────────────────

/**
 * Shared email address for all locations that have no dedicated address.
 * Note: This is intentionally kept local to the data file rather than
 * importing from lib/constants/site.ts to avoid a circular dependency
 * between data and constants layers. The value must match SALON_EMAIL.
 */
const SHARED_EMAIL = 'deeshairbeautybridal@gmail.com'

/**
 * Standard 9 AM – 6 PM opening hours applied to every day of the week.
 * Used as a base for locations with identical daily hours.
 */
const DAILY_NINE_TO_SIX = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '09:00', close: '18:00' },
  sunday: { open: '09:00', close: '18:00' },
}

/**
 * Weekday schedule with earlier weekend opening (8 AM instead of 9 AM).
 * Applied to locations that open earlier on weekends.
 */
const WEEKDAY_WITH_EARLY_WEEKEND = {
  ...DAILY_NINE_TO_SIX,
  saturday: { open: '08:00', close: '18:00' },
  sunday: { open: '08:00', close: '18:00' },
}

// ─── Location data ────────────────────────────────────────────────────────────

/**
 * All Dee's salon locations.
 *
 * `verified: true`  — location details have been confirmed and the page is live.
 * `verified: false` — location exists but details are unconfirmed; excluded from
 *                     static params and not publicly linked.
 * `featured: true`  — displayed with priority in the branch finder UI.
 *
 * Review counts were last researched on 2026-08-23.
 * Update periodically or replace with a Google Places API integration.
 *
 * Google Maps and Google Reviews URLs are intentionally left empty pending
 * confirmation of the correct links. Fill these in when verified.
 */
export const locations: Location[] = [
  {
    id: 'thalawathugoda',
    slug: 'thalawathugoda',
    name: "Dee's Hair Beauty & Bridal Salon — Thalawathugoda",
    address: 'No. 539/A1, Madiwela Road, 10116, Sri Lanka',
    phone: '070 387 7877',
    secondaryPhone: '076 637 7877',
    email: SHARED_EMAIL,
    rating: 4.8,
    reviewCount: 4528,
    googleMapsUrl: '',
    googleReviewsUrl: '',
    openingHours: DAILY_NINE_TO_SIX,
    services: [],
    featured: true,
    verified: true,
  },
  {
    id: 'piliyandala',
    slug: 'piliyandala',
    name: "Dee's Hair Beauty & Bridal Salon — Piliyandala",
    address: '291, Piliyandala 10300, Sri Lanka',
    phone: '074 015 5855',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 5158,
    googleMapsUrl: '',
    googleReviewsUrl: '',
    openingHours: WEEKDAY_WITH_EARLY_WEEKEND,
    services: [],
    verified: true,
  },
  {
    id: 'biyagama',
    slug: 'biyagama',
    name: "Dee's Hair Beauty & Bridal Salon — Biyagama",
    address: '454/1E, New Kandy Road, Sri Lanka',
    phone: '071 993 7775',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 2549,
    googleMapsUrl: '',
    googleReviewsUrl: '',
    openingHours: DAILY_NINE_TO_SIX,
    services: [],
    verified: true,
  },
  {
    id: 'colombo-07',
    slug: 'colombo-07',
    name: "Dee's Hair, Beauty & Bridal Salon — Colombo 07",
    address:
      '146A, Professor Nandadasa Kodagoda Road, Colombo 00700, Sri Lanka',
    phone: '077 660 7607',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 2887,
    googleMapsUrl: '',
    googleReviewsUrl: '',
    openingHours: DAILY_NINE_TO_SIX,
    services: [],
    verified: true,
  },
  {
    id: 'battaramulla',
    slug: 'battaramulla',
    name: "Dee's Hair Beauty & Bridal Salon — Battaramulla",
    address:
      '416/A, Battaramulla–Pannipitiya Road, Sri Jayawardenepura Kotte 12138, Sri Lanka',
    phone: '077 556 7567',
    email: SHARED_EMAIL,
    rating: 5.0,
    reviewCount: 1266,
    googleMapsUrl: '',
    googleReviewsUrl: '',
    openingHours: DAILY_NINE_TO_SIX,
    services: [],
    verified: false, // Details pending — excluded from public static pages
  },
]

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/**
 * Finds a location by its URL slug.
 * Returns `undefined` if no matching location is found.
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug)
}
