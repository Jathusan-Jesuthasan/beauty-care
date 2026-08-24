/**
 * Image URLs used across the homepage sections.
 *
 * This file maps the salon's original photography to the website's
 * structural constants. All primary imagery is served locally from
 * the `public/images/` directory.
 *
 * NOTE: The transformation images currently retain their Unsplash
 * placeholders as genuine before/after salon work has not yet been
 * provided.
 */

/** Hero section — 3 primary images. */
export const HERO_IMAGE_URL = '/images/hero/hero-bridal-makeup.jpg'
export const HERO_BRIDAL_IMAGE_URL = '/images/hero/hero-bridal-makeup.jpg'
export const HERO_PRODUCTS_IMAGE_URL = '/images/hero/hero-hair-care-products.jpeg'
export const HERO_SERVICE_IMAGE_URL = '/images/hero/hero-service.jpeg'

/** Bridal section and bridal service card. */
export const BRIDAL_IMAGE_URL = '/images/bridal/bridal-party-makeup.jpeg'

/** About section. */
export const ABOUT_IMAGE_URL = '/images/products/professional-skincare-products.jpeg'

/**
 * Hair styling detail shot.
 * Used in the Hair service card.
 */
export const HAIR_DETAIL_IMAGE_URL = '/images/hair/long-hair-styling.jpeg'

/** Beauty service card. */
export const BEAUTY_IMAGE_URL = '/images/beauty/advanced-facial-treatment.jpeg'

/** Gallery — hair styling image. */
export const GALLERY_HAIR_IMAGE_URL = '/images/hair/wavy-hair-styling.jpeg'

/** Gallery — makeup/beauty image. */
export const GALLERY_BEAUTY_IMAGE_URL = '/images/beauty/facial-treatment-salon.jpeg'

/** Gallery — second bridal image (makeup application). */
export const GALLERY_BRIDAL_IMAGE_URL = '/images/bridal/salon-makeup-service.jpeg'

/** Gallery — model portrait. */
export const GALLERY_MODEL_IMAGE_URL = '/images/hair/styling-service.jpeg'

/**
 * BeautifulTransformations component — card one (natural look).
 * Used by components/beautiful-transformations.tsx (currently unused/legacy).
 * REQUIRES GENUINE BEFORE/AFTER IMAGES.
 */
export const TRANSFORMATION_NATURAL_IMAGE_URL =
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85'

/**
 * BeautifulTransformations component — card two (radiant look).
 * Used by components/beautiful-transformations.tsx (currently unused/legacy).
 * REQUIRES GENUINE BEFORE/AFTER IMAGES.
 */
export const TRANSFORMATION_RADIANT_IMAGE_URL =
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85'
