import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { SALON_EMAIL } from '@/lib/constants/site'
import { BRIDAL_IMAGE_URL } from '@/lib/constants/images'

export function BridalSection() {
  return (
    <section id="bridal" className="bridal">
      {/*
       * Animation contract: `.bridal-image` and `.bridal-copy` are targeted
       * by cinematic-scroll.tsx (currently inactive). Do not rename.
       */}
      <div className="bridal-image">
        <Image
          src={BRIDAL_IMAGE_URL}
          alt="Bridal party makeup preparation"
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
      <div className="bridal-copy">
        <SectionHeading
          light
          label="The bridal experience"
          title="Your most beautiful day deserves the very best."
          copy="From bridal hair and makeup to complete beauty preparation, let Dee's help you look and feel unforgettable."
        />
        <a
          className="button button-light"
          href={`mailto:${SALON_EMAIL}?subject=Plan my bridal look`}
        >
          Plan your bridal look <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}
