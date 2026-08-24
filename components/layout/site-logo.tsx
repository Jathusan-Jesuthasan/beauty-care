interface SiteLogoProps {
  /**
   * When true, renders the light variant used on dark backgrounds (footer).
   * When false (default), renders the standard variant for the navigation bar.
   */
  light?: boolean
}

/**
 * SiteLogo
 *
 * The Dee's Hair, Beauty & Bridal Salon brand mark.
 * Renders as an anchor linking back to the top of the page (#home).
 *
 * Used in two locations:
 * - `components/layout/site-header.tsx` — navigation bar (default variant)
 * - `components/layout/site-footer.tsx` — footer (light variant)
 *
 * This is a Server Component — no client-side logic required.
 *
 * Animation contract:
 * - `.brand` — flexbox layout, ivory colour
 * - `.brand-mark` — the large italic "D" character in the display font
 * - `.brand-light` — colour override for the footer's dark background context
 *
 * Typography:
 * - `.brand-mark` — italic 39px Playfair Display
 * - `.brand strong` — italic 25px Playfair Display (magenta "Dee's")
 * - `.brand small` — 7px uppercase tracked label ("Hair · Beauty · Bridal")
 * - `.brand small b` — 8px uppercase "SALON"
 */
export function SiteLogo({ light = false }: SiteLogoProps) {
  return (
    <a
      href="#home"
      className={`brand${light ? ' brand-light' : ''}`}
      aria-label="Dee's Hair, Beauty & Bridal Salon home"
    >
      <span className="brand-mark">D</span>
      <span>
        <strong>ee&apos;s</strong>
        <small>
          Hair · Beauty · Bridal
          <br />
          <b>SALON</b>
        </small>
      </span>
    </a>
  )
}
