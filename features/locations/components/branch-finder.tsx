'use client'

import { useState } from 'react'
import { StaggerGroup, StaggerItem, ScrollReveal } from '@/components/scroll-reveal'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { locations } from '../data/locations'
import { formatOpeningHours, getOpeningStatus } from '../utils/opening-status'
import { SALON_PHONE, SALON_EMAIL } from '@/lib/constants/site'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * BranchFinder
 *
 * Displays all verified Dee's salon locations in an interactive browser.
 * A list of branch cards on the left allows selecting a location.
 * The right panel shows the selected location's full detail: address,
 * phone, email, opening hours, Google rating, and action links.
 *
 * Opening status (Open now / Closed) is calculated in real time from the
 * location's opening hours and the current system time.
 *
 * When no verified locations exist, an empty-state fallback is shown
 * with direct contact details so visitors can still reach the salon.
 *
 * Accessibility:
 * - Branch cards use `aria-pressed` to communicate the selected state.
 * - The selected location detail panel has `aria-label`.
 * - The section is labelled via `aria-labelledby`.
 *
 * Animation contract:
 * - `.branch-card` — CSS left-border scale animation on hover/active
 *   (see globals.css: `.branch-card:after`). Do not rename.
 */
export function BranchFinder() {
  const verifiedLocations = locations.filter((location) => location.verified)

  const [selectedId, setSelectedId] = useState(verifiedLocations[0]?.id)

  const selectedLocation =
    verifiedLocations.find((location) => location.id === selectedId) ??
    verifiedLocations[0]

  // ── Empty state ───────────────────────────────────────────────────────────

  if (!selectedLocation) {
    return (
      <section
        id="locations"
        className="section branch-finder branch-empty"
        aria-labelledby="locations-title"
      >
        <div className="branch-empty-copy">
          <SectionHeading
            label="Find your Dee's"
            title="Find your nearest Dee's."
            copy="Discover a Dee's salon and find the experience that's right for you."
          />
        </div>

        <div className="branch-empty-state">
          <span className="eyebrow">Our locations</span>
          <p>
            Branch information is being updated. Please contact Dee&apos;s for
            the latest location and appointment information.
          </p>
          <div className="branch-empty-actions">
            <a className="button" href={`tel:${SALON_PHONE.replaceAll(' ', '')}`}>
              <Phone size={15} /> Call Dee&apos;s
            </a>
            <a className="text-link" href={`mailto:${SALON_EMAIL}`}>
              Email Dee&apos;s <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ── Helpers for selected location ─────────────────────────────────────────

  const selectedStatus = getOpeningStatus(selectedLocation.openingHours)
  const selectedPhone = selectedLocation.phone ?? SALON_PHONE
  const selectedEmail = selectedLocation.email ?? SALON_EMAIL

  /**
   * Extracts the branch name portion from the full location name.
   * Example: "Dee's Hair Beauty & Bridal Salon — Thalawathugoda" → "Thalawathugoda"
   */
  function getBranchLabel(fullName: string): string {
    return fullName.split(' — ')[1] ?? fullName
  }

  /**
   * Strips the "Dee's Hair Beauty & Bridal Salon — " prefix for compact display
   * in the branch card list, while preserving the full name for accessibility.
   */
  function getShortLocationName(fullName: string): string {
    return fullName
      .replace("Dee's Hair Beauty & Bridal Salon — ", '')
      .replace("Dee's Hair, Beauty & Bridal Salon — ", '')
  }

  // ── Full branch finder ────────────────────────────────────────────────────

  return (
    <section
      id="locations"
      className="section branch-finder"
      aria-labelledby="locations-title"
    >
      {/* Header row with heading and location count */}
      <div className="branch-heading">
        <SectionHeading
          label="Find your Dee's"
          title="Find your nearest Dee's."
          copy="Discover a Dee's salon near you and choose the location that's right for your next beauty experience."
        />
        <span className="branch-count">
          {verifiedLocations.length.toString().padStart(2, '0')} locations
        </span>
      </div>

      <div className="branch-layout">
        {/* Location selector cards */}
        <StaggerGroup className="branch-cards" stagger={0.06} delay={0.04}>
          {verifiedLocations.map((location) => {
            const locationStatus = getOpeningStatus(location.openingHours)
            const isSelected = location.id === selectedLocation.id
            const statusModifier =
              locationStatus.label === 'Open now' ? 'open' : 'pending'

            return (
              <StaggerItem key={location.id}>
                <button
                  className={`branch-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedId(location.id)}
                  aria-pressed={isSelected}
                >
                  <span className="branch-card-number">
                    {location.featured ? 'Featured' : "Dee's"}
                  </span>
                  <h3>{getShortLocationName(location.name)}</h3>
                  <p>{location.address}</p>
                  <span className={`status status-${statusModifier}`}>
                    {locationStatus.label}
                    {locationStatus.closesAt &&
                      ` · Closes at ${locationStatus.closesAt}`}
                    {!locationStatus.closesAt &&
                      locationStatus.opensAt &&
                      ` · Opens at ${locationStatus.opensAt}`}
                  </span>
                </button>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        {/* Selected location detail panel */}
        <ScrollReveal className="branch-detail-reveal" variant="fade-up" delay={0.12}>
        <div className="branch-detail">
          {/* Static location visual without third-party embed scripts */}
          <div
            className="branch-visual"
            aria-label={`Selected location summary: ${selectedLocation.name}`}
          >
            <MapPin size={22} />
            <span>{getBranchLabel(selectedLocation.name)}</span>
            <small>
              Dee&apos;s Hair, Beauty &amp; Bridal Salon
              <br />
              Sri Lanka
            </small>
          </div>

          {/* Location details */}
          <div className="branch-detail-copy">
            <span className="eyebrow">Selected location</span>
            <h3>{getBranchLabel(selectedLocation.name)}</h3>
            <p>{selectedLocation.address}</p>

            {/* Opening hours */}
            <div className="branch-hours">
              {formatOpeningHours(selectedLocation.openingHours).map(
                (hoursLine) => (
                  <span key={hoursLine}>{hoursLine}</span>
                ),
              )}
            </div>

            {/* Google rating */}
            {selectedLocation.rating && (
              <div className="branch-rating">
                <strong>{selectedLocation.rating.toFixed(1)} ★</strong>
                <span>
                  {selectedLocation.reviewCount?.toLocaleString()} Google
                  Reviews
                </span>
              </div>
            )}

            {/* Contact details */}
            <div className="branch-contact">
              <a href={`tel:${selectedPhone.replaceAll(' ', '')}`}>
                <Phone size={16} /> {selectedPhone}
              </a>
              {selectedLocation.secondaryPhone && (
                <a
                  href={`tel:${selectedLocation.secondaryPhone.replaceAll(' ', '')}`}
                >
                  <Phone size={16} /> {selectedLocation.secondaryPhone}
                </a>
              )}
              <a href={`mailto:${selectedEmail}`}>{selectedEmail}</a>
            </div>

            {/* Action links */}
            <div className="branch-actions">
              {selectedLocation.googleMapsUrl && (
                <a
                  className="text-link"
                  href={selectedLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <ArrowUpRight size={15} />
                </a>
              )}
              {selectedLocation.googleReviewsUrl && (
                <a
                  className="text-link"
                  href={selectedLocation.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Google reviews <ArrowUpRight size={15} />
                </a>
              )}
              <a
                className="button"
                href={`mailto:${selectedEmail}?subject=Book at ${selectedLocation.name}`}
              >
                Book appointment <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
