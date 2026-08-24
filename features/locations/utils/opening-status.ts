import type { OpeningHours } from '../types'

// ─── Types ───────────────────────────────────────────────────────────────────

export type OpeningStatus = {
  label: 'Open now' | 'Closed' | 'Hours to be confirmed'
  /** Formatted closing time, e.g. "6:00 PM". Present when the salon is currently open. */
  closesAt?: string
  /** Formatted opening time, e.g. "9:00 AM". Present when the salon is currently closed. */
  opensAt?: string
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Converts a 24-hour time string ("18:00") to a 12-hour AM/PM string ("6:00 PM"). */
function formatClockTime(time: string): string {
  const [rawHour, minute] = time.split(':').map(Number)
  const suffix = rawHour >= 12 ? 'PM' : 'AM'
  const hour = rawHour % 12 || 12
  return `${hour}:${minute.toString().padStart(2, '0')} ${suffix}`
}

/** Converts a time string ("09:00") to total minutes from midnight. */
function toMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Determines whether a salon location is currently open, closed, or unconfirmed,
 * based on its opening hours configuration and the current time.
 *
 * @param openingHours - The location's weekly opening hours. May be empty or undefined.
 * @param now - The reference date/time. Defaults to the current system time.
 *              Accepts a custom value for testing purposes.
 */
export function getOpeningStatus(
  openingHours?: OpeningHours,
  now = new Date(),
): OpeningStatus {
  if (!openingHours || Object.keys(openingHours).length === 0) {
    return { label: 'Hours to be confirmed' }
  }

  const dayName = now
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase()

  const todayHours = openingHours[dayName]

  if (!todayHours) {
    return { label: 'Closed' }
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const isOpen =
    currentMinutes >= toMinutes(todayHours.open) &&
    currentMinutes < toMinutes(todayHours.close)

  if (isOpen) {
    return {
      label: 'Open now',
      closesAt: formatClockTime(todayHours.close),
    }
  }

  return {
    label: 'Closed',
    opensAt: formatClockTime(todayHours.open),
  }
}

/**
 * Formats a full opening hours map into an array of human-readable strings,
 * one entry per day that has defined hours.
 *
 * Example output: ["Monday: 9:00 AM – 6:00 PM", "Tuesday: 9:00 AM – 6:00 PM", ...]
 */
export function formatOpeningHours(openingHours: OpeningHours): string[] {
  return Object.entries(openingHours)
    .filter(
      (entry): entry is [string, { open: string; close: string }] =>
        Boolean(entry[1]),
    )
    .map(([day, hours]) => {
      const dayLabel = day[0].toUpperCase() + day.slice(1)
      return `${dayLabel}: ${formatClockTime(hours.open)} – ${formatClockTime(hours.close)}`
    })
}
