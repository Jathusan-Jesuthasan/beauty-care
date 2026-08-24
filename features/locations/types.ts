export type OpeningHours = Partial<Record<string, { open: string; close: string }>>

export interface Location {
  id: string
  slug: string
  name: string
  address: string
  phone: string
  email?: string
  secondaryPhone?: string
  rating?: number
  reviewCount?: number
  googleMapsUrl?: string
  googleReviewsUrl?: string
  mapEmbedUrl?: string
  openingHours: OpeningHours
  coordinates?: { latitude: number; longitude: number }
  mapUrl?: string
  bookingUrl?: string
  services: string[]
  images?: string[]
  featured?: boolean
  verified: boolean
  detailsPending?: boolean
}
