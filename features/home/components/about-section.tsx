import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { ABOUT_IMAGE_URL } from '@/lib/constants/images'

export function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="about-image">
        <Image
          src={ABOUT_IMAGE_URL}
          alt="Professional skincare products in salon"
          fill
          sizes="(max-width: 760px) 100vw, 45vw"
        />
      </div>
      <div>
        <SectionHeading
          label="About Dee's"
          title="Where beauty meets confidence."
          copy="At Dee's Hair, Beauty & Bridal Salon, every appointment is more than a service. It is an experience designed around you, your style and your special moments."
        />
        <a className="text-link" href="#contact">
          Discover our story <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}
