import { FirstVisitLoader } from '@/components/first-visit-loader'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MobileBookingBar } from '@/components/layout/mobile-booking-bar'
import { IntentFinder } from '@/features/services/components/intent-finder'
import { BranchFinder } from '@/features/locations/components/branch-finder'
import { BridalJourney } from '@/features/bridal/components/bridal-journey'
import { TransformationSection } from '@/features/transformations/components/transformation-section'

import { HeroSection } from '@/features/home/components/hero-section'
import { ServicesSection } from '@/features/home/components/services-section'
import { AboutSection } from '@/features/home/components/about-section'
import { BridalSection } from '@/features/bridal/components/bridal-section'
import { WhyChooseUsSection } from '@/features/home/components/why-choose-us-section'
import { TestimonialsSection } from '@/features/home/components/testimonials-section'
import { ContactSection } from '@/features/home/components/contact-section'
import { GallerySection } from '@/features/gallery/components/gallery-section'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dee's Hair, Beauty & Bridal Salon",
  description: "Experience premium hair, beauty, and bridal services in Sri Lanka. Your beauty, beautifully defined.",
  openGraph: {
    title: "Dee's Hair, Beauty & Bridal Salon",
    description: "Premium hair, beauty, and bridal services.",
    type: "website",
    locale: "en_LK",
  },
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Dee's Hair, Beauty & Bridal Salon",
    "image": "https://dees.salon/images/hero/hero-bridal-makeup.jpg",
    "url": "https://dees.salon",
    "telephone": "070 387 7877",
    "email": "deeshairbeautybridal@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FirstVisitLoader />
      <SiteHeader />
      <main>
        <HeroSection />
        <IntentFinder />
        <ServicesSection />
        <TransformationSection />
        <AboutSection />
        <BridalJourney />
        <BridalSection />
        <BranchFinder />
        <GallerySection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <MobileBookingBar />
    </>
  )
}
