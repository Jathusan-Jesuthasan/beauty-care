interface SectionHeadingProps {
  /** Short uppercase label displayed above the main heading (the "eyebrow"). */
  label: string
  /** The main `<h2>` heading text. */
  title: string
  /** Optional body copy paragraph rendered below the heading. */
  copy?: string
  /**
   * When true, renders the light variant: ivory heading and muted copy text.
   * Use on dark/dark-background sections (bridal, contact, intent-finder).
   */
  light?: boolean
}

/**
 * SectionHeading
 *
 * The standard heading block used at the top of each homepage section.
 * Renders an eyebrow label, an `<h2>`, and an optional paragraph.
 *
 * This is a Server Component — no client-side logic required.
 *
 * Animation contract:
 * - `.section-heading` — max-width constraint and bottom margin
 * - `.heading-light` — colour variant for dark backgrounds
 * - `.eyebrow` — magenta uppercase label style
 * - `.section-heading h2` — display font, font size, letter spacing
 * - `.section-heading p` — muted body copy
 *
 * These class names are animation-selector contracts. Do not rename
 * without auditing consumers in globals.css and cinematic-scroll.tsx.
 */
export function SectionHeading({
  label,
  title,
  copy,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading${light ? ' heading-light' : ''}`}>
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}
