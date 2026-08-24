import { ArrowUpRight } from 'lucide-react'

interface BookingLinkProps {
  children: React.ReactNode
  /** The href destination — typically a hash anchor (#contact) or mailto: link. */
  href: string
  /**
   * When true, renders the light variant of the button:
   * ivory background with dark text, used on dark section backgrounds.
   */
  light?: boolean
}

/**
 * BookingLink
 *
 * A styled anchor element that visually matches the site's primary CTA button.
 * Used for booking, contact, and navigation CTAs throughout the homepage.
 *
 * This is a plain anchor (`<a>`) — not a `<button>` — because every usage
 * links to a destination (hash anchor or mailto). Using `<a>` is semantically
 * correct here and correctly communicates "this navigates somewhere" to
 * assistive technology.
 *
 * Animation contract:
 * - `.button` — CSS hover: background fade, `translateY(-2px)`, SVG translate
 * - `.button-light` — ivory variant, used on dark backgrounds
 * - `.button svg` — icon translate animation on hover (globals.css line 35)
 *
 * Named `BookingLink` (not `Button`) to distinguish from the shadcn-based
 * `Button` primitive in `components/ui/button.tsx`.
 */
export function BookingLink({ children, href, light = false }: BookingLinkProps) {
  return (
    <a className={`button${light ? ' button-light' : ''}`} href={href}>
      {children}
      <ArrowUpRight size={15} />
    </a>
  )
}
