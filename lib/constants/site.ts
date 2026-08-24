/**
 * Global salon identity and contact constants.
 *
 * These are the salon-wide defaults used when no location-specific
 * value is available. For example, phone and email are used as
 * fallbacks when a location entry has no dedicated contact details.
 *
 * IMPORTANT: Do not replace location-specific phone/email with these
 * values. Location-specific contact details live in:
 *   features/locations/data/locations.ts
 */

export const SALON_NAME = "Dee's Hair, Beauty & Bridal Salon"

export const SALON_TAGLINE = 'Hair · Beauty · Bridal Salon'

/**
 * Primary salon phone number.
 * Displayed in the navigation contact bar, footer, and mobile booking bar.
 * Used as a fallback for location pages that have no dedicated phone number.
 */
export const SALON_PHONE = '070 387 7877'

/**
 * Primary salon email address.
 * Used in contact sections, booking CTAs, and bridal enquiry links.
 * Used as a fallback for location pages that have no dedicated email address.
 */
export const SALON_EMAIL = 'deeshairbeautybridal@gmail.com'

/**
 * Facebook page URL. Used in the site footer social link.
 */
export const SALON_FACEBOOK_URL =
  'https://www.facebook.com/DeesHairbeautyBridalSalon/photos'
