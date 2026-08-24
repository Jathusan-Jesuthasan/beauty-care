import type { Location } from '../types'

const SHARED_EMAIL = 'deeshairbeautybridal@gmail.com'

const DAILY_NINE_TO_SIX = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '09:00', close: '18:00' },
  sunday: { open: '09:00', close: '18:00' },
}

const WEEKDAY_WITH_EARLY_WEEKEND = {
  ...DAILY_NINE_TO_SIX,
  saturday: { open: '08:00', close: '18:00' },
  sunday: { open: '08:00', close: '18:00' },
}

export const locations: Location[] = [
  {
    id: 'thalawathugoda',
    slug: 'thalawathugoda',
    name: "Dee's Hair Beauty & Bridal Salon — Thalawathugoda",
    address: 'No. 539/A1, Madiwela Road, Thalawathugoda, Sri Lanka',
    phone: '070 387 7877',
    secondaryPhone: '076 637 7877',
    email: SHARED_EMAIL,
    rating: 4.8,
    reviewCount: 4527,
    googleMapsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Madiwela+Rd+Thalawathugoda',
    googleReviewsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Madiwela+Rd+Thalawathugoda',
    openingHours: DAILY_NINE_TO_SIX,
    services: ['Bridal Hair & Makeup', 'Facial & Skincare', 'Hair Dressing', 'Nails & Beauty'],
    featured: true,
    verified: true,
  },
  {
    id: 'piliyandala',
    slug: 'piliyandala',
    name: "Dee's Hair Beauty & Bridal Salon — Piliyandala Branch",
    address: 'No. 291, Colombo Road, Piliyandala 10300, Sri Lanka',
    phone: '074 015 5855',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 5158,
    googleMapsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Piliyandala+Branch',
    googleReviewsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Piliyandala+Branch',
    openingHours: WEEKDAY_WITH_EARLY_WEEKEND,
    services: ['Hair Coloring & Styling', 'Bridal Dressing', 'Facial Treatments', 'Manicure & Pedicure'],
    verified: true,
  },
  {
    id: 'colombo-07',
    slug: 'colombo-07',
    name: "Dee's Hair, Beauty & Bridal Salon — Colombo 07",
    address: '146A, Professor Nandadasa Kodagoda Road, Colombo 00700, Sri Lanka',
    phone: '077 660 7607',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 2887,
    googleMapsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Colombo+07',
    googleReviewsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Colombo+07',
    openingHours: DAILY_NINE_TO_SIX,
    services: ['Luxury Bridal Packages', 'Hair Spa & Rebonding', 'Skin Rejuvenation', 'Makeup Artistry'],
    verified: true,
  },
  {
    id: 'biyagama',
    slug: 'biyagama',
    name: "Dee's Hair Beauty & Bridal Salon — Biyagama",
    address: '454/1E, New Kandy Road, Biyagama, Sri Lanka',
    phone: '071 993 7775',
    email: SHARED_EMAIL,
    rating: 4.9,
    reviewCount: 2549,
    googleMapsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+New+Kandy+Road+Biyagama',
    googleReviewsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+New+Kandy+Road+Biyagama',
    openingHours: DAILY_NINE_TO_SIX,
    services: ['Bridal Makeover', 'Keratin & Hair Treatments', 'Facials', 'Threading & Waxing'],
    verified: true,
  },
  {
    id: 'battaramulla',
    slug: 'battaramulla',
    name: "Dee's Hair Beauty & Bridal Salon — Battaramulla",
    address: '416/A, Battaramulla–Pannipitiya Road, Battaramulla 12138, Sri Lanka',
    phone: '077 556 7567',
    email: SHARED_EMAIL,
    rating: 5.0,
    reviewCount: 1266,
    googleMapsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Battaramulla+Pannipitiya+Rd',
    googleReviewsUrl: 'https://maps.google.com/?q=Dee%27s+Hair+Beauty+%26+Bridal+Salon+Battaramulla+Pannipitiya+Rd',
    openingHours: DAILY_NINE_TO_SIX,
    services: ['Specialist Hair Styling', 'Bridal Dressing & Trials', 'Glow Facials', 'Nail Art'],
    verified: true,
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug)
}
