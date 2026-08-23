'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Heart, MapPin, Menu, MessageCircle, Phone, Sparkles, X } from 'lucide-react'
import { CinematicScroll } from '@/components/cinematic-scroll'
import { BeautifulTransformations } from '@/components/beautiful-transformations'
import { FirstVisitLoader } from '@/components/first-visit-loader'
import { ScrollReveal, MaskedHeading, StaggerGroup, StaggerItem, ImageReveal } from '@/components/scroll-reveal'

const WHATSAPP_NUMBER = '923001234567'
const whatsapp = (message = 'Hi Hamsh Beauty Care, I visited your website and would like to know more about your beauty services.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const images = {
  hero: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85',
  bridal: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85',
  interior: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
  owner: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=85',
}

const gallery = [
  ['Bridal', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85'],
  ['Makeup', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85'],
  ['Hair', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85'],
  ['Beauty', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85'],
  ['Bridal', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85'],
  ['Makeup', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85'],
]

const services = [
  ['Bridal Makeup', 'Elegant, long-lasting makeup tailored to your features, dress and wedding style.', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=85'],
  ['Party Makeup', 'Polished, luminous looks for birthdays, celebrations and special occasions.', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85'],
  ['Hair Styling', 'Beautifully finished hairstyles for weddings, events and everyday transformations.', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=85'],
  ['Facial Treatments', 'Refreshing care created to leave your skin looking rested, radiant and renewed.', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85'],
]

const serviceMessage = (name: string) =>
  `Hi Hamsh Beauty Care, I visited your website and I'm interested in your ${name} service. Could you please send me more information?`

function Button({ children, href, light = false }: { children: React.ReactNode; href: string; light?: boolean }) {
  return (
    <motion.a whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} href={href} className={`button ${light ? 'button-light' : ''}`}>
      {children}
      <motion.span whileHover={{ x: 4 }}>
        <ArrowUpRight size={16} />
      </motion.span>
    </motion.a>
  )
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow: string
  title: string
  copy?: string
  centered?: boolean
}) {
  return (
    <div className={`section-intro ${centered ? 'centered' : ''}`}>
      <ScrollReveal variant="fade-up" delay={0}>
        <span className="eyebrow">{eyebrow}</span>
      </ScrollReveal>
      <MaskedHeading as="h2" delay={0.06}>
        {title}
      </MaskedHeading>
      {copy && (
        <ScrollReveal variant="fade-up" delay={0.12}>
          <p>{copy}</p>
        </ScrollReveal>
      )}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const links = ['Services', 'Bridal', 'Gallery', 'Offers', 'About', 'Contact']

  return (
    <header className="nav">
      <a href="#home" className="logo" onClick={() => setOpen(false)}>
        <span>H</span>
        <div>Hamsh <b>Beauty Care</b></div>
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-links open"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <motion.div
              className="drawer-logo"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <span>Hamsh</span>
              <small>Beauty Care</small>
            </motion.div>

            <div className="drawer-links">
              {links.map((x, i) => (
                <motion.a
                  key={x}
                  href={`#${x.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                >
                  {x}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="drawer-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.58, duration: 0.35 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.4 }}
            >
              <Button href={whatsapp()}>WhatsApp Us</Button>
            </motion.div>

            <span className="drawer-petal" />
          </motion.nav>
        )}
      </AnimatePresence>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
            >
              <X />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
            >
              <Menu />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, 22])

  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <ScrollReveal variant="fade-up" delay={0.05}>
          <span className="eyebrow">Hamsh Beauty Care</span>
        </ScrollReveal>
        <MaskedHeading as="h1" delay={0.12}>
          Beauty that<br /><i>feels like you.</i>
        </MaskedHeading>
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p>
            Professional makeup, bridal styling, hair care and beauty treatments designed to make every woman feel confident and beautiful.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.28}>
          <div className="hero-actions">
            <Button href="#services">Explore Services</Button>
            <a className="text-link" href={whatsapp()}>Chat on WhatsApp <ArrowUpRight size={16} /></a>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.35}>
          <span className="hero-note">Beauty <b>•</b> Confidence <b>•</b> Elegance</span>
        </ScrollReveal>
      </div>

      <motion.div
        className="hero-visual"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <Image src={images.hero} alt="Elegant woman wearing soft bridal makeup" fill priority sizes="(max-width: 768px) 100vw, 55vw" />
        <div className="hero-badge">
          <Sparkles size={17} />
          <span>Made for your<br /><b>most beautiful moments</b></span>
        </div>
      </motion.div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services-cinematic">
      <SectionIntro
        eyebrow="What we do"
        title="Our beauty services"
        copy="Discover professional beauty treatments designed to help you look and feel your best."
      />
      <StaggerGroup stagger={0.09} delay={0.1}>
        <div className="service-grid">
          {services.map(([name, desc, image], i) => (
            <StaggerItem key={name} variant="fade-up" distance={26}>
              <article className="service-card">
                <div className="card-image">
                  <Image src={image} alt={`${name} at Hamsh Beauty Care`} fill sizes="(max-width: 768px) 90vw, 25vw" />
                  <span>0{i + 1}</span>
                </div>
                <div className="card-body">
                  <span className="eyebrow">Beauty care</span>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <a href={whatsapp(serviceMessage(name))}>
                    Ask on WhatsApp <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}

function Bridal() {
  return (
    <section id="bridal" className="bridal section">
      <ImageReveal className="bridal-image" withOverlay delay={0.1}>
        <Image src={images.bridal} alt="Bride in elegant makeup and jewelry" fill sizes="(max-width: 768px) 100vw, 50vw" />
      </ImageReveal>

      <div className="bridal-copy">
        <ScrollReveal variant="fade-up" delay={0.05}>
          <span className="eyebrow gold">The bridal edit</span>
        </ScrollReveal>
        <MaskedHeading as="h2" delay={0.12}>
          Your bridal moment deserves something special.
        </MaskedHeading>
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p>
            From bridal makeup to elegant hairstyling, we help create a look that feels beautifully yours — considered, personal and unforgettable.
          </p>
        </ScrollReveal>

        <StaggerGroup stagger={0.06} delay={0.25}>
          <div className="bridal-list">
            {['Bridal Makeup', 'Bridal Hairstyling', 'Bridal Dressing', 'Engagement Makeup', 'Bridesmaid Makeup', 'Pre-Bridal Beauty Care'].map((x) => (
              <StaggerItem key={x} variant="fade-up" distance={15}>
                <span><Heart size={13} />{x}</span>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>

        <ScrollReveal variant="fade-up" delay={0.35}>
          <Button href={whatsapp('Hi Hamsh Beauty Care, I would love to discuss my bridal look with you.')} light>
            Discuss your bridal look
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = gallery.filter((x) => filter === 'All' || x[0] === filter)

  return (
    <section id="gallery" className="section gallery-section">
      <SectionIntro
        eyebrow="A little inspiration"
        title="Our recent work"
        copy="A glimpse into the beautiful moments we get to be part of."
      />
      <ScrollReveal variant="fade-up" delay={0.1}>
        <div className="filters">
          {['All', 'Bridal', 'Makeup', 'Hair', 'Beauty'].map((x) => (
            <button
              className={filter === x ? 'active' : ''}
              key={x}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="gallery-grid">
        {filtered.map(([category, src], i) => (
          <ScrollReveal key={src} variant="scale" delay={(i % 3) * 0.08} amount={0.1}>
            <button className="gallery-item" onClick={() => setSelected(src)}>
              <Image src={src} alt={`${category} beauty work`} fill sizes="(max-width: 768px) 50vw, 30vw" />
              <span>
                <small>{category}</small>
                <ArrowUpRight size={18} />
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {selected && (
        <div className="lightbox" role="dialog" aria-label="Gallery image" onClick={() => setSelected(null)}>
          <button aria-label="Close image"><X /></button>
          <Image src={selected} alt="Selected beauty work" fill sizes="100vw" />
        </div>
      )}
    </section>
  )
}

function Packages() {
  return (
    <section id="offers" className="section packages">
      <SectionIntro
        eyebrow="Made for your moment"
        title="Beauty packages"
        copy="Thoughtfully paired services for the moments that matter."
        centered
      />
      <StaggerGroup stagger={0.09} delay={0.1}>
        <div className="package-grid">
          {[
            ['01', 'Bridal Glow', ['Bridal Makeup', 'Hairstyling', 'Bridal Dressing', 'Pre-Bridal Beauty Care']],
            ['02', 'Party Glam', ['Party Makeup', 'Professional Hairstyle']],
            ['03', 'Glow & Care', ['Facial Treatment', 'Beauty Care', 'Hair Care']],
          ].map(([no, name, list]) => (
            <StaggerItem key={name as string} variant="fade-up" distance={24}>
              <article className={`package ${no === '01' ? 'featured' : ''}`}>
                <span className="package-no">{no}</span>
                <h3>{name}</h3>
                <ul>
                  {(list as string[]).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <a href={whatsapp(`Hi Hamsh Beauty Care, I'm interested in the ${name} package. Could you please tell me more about it?`)}>
                  Ask for pricing <ArrowUpRight size={15} />
                </a>
              </article>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}

function About() {
  return (
    <>
      <section className="offer-banner">
        <ScrollReveal variant="left" delay={0.1}>
          <div>
            <span className="eyebrow">Special offer</span>
            <MaskedHeading as="h2">A little extra glow.</MaskedHeading>
            <p>Discover our latest bridal, beauty and seasonal offers.</p>
            <Button href={whatsapp('Hi Hamsh Beauty Care, I would like to know about your latest offers.')}>
              View offer on WhatsApp
            </Button>
          </div>
        </ScrollReveal>

        <ImageReveal className="offer-photo" withOverlay delay={0.15}>
          <Image src="https://images.unsplash.com/photo-1512207846876-bb54ef5056b0?auto=format&fit=crop&w=900&q=85" alt="Beauty products and flowers" fill sizes="40vw" />
        </ImageReveal>
      </section>

      <section id="about" className="section about">
        <ImageReveal className="about-photo" delay={0.1}>
          <Image src={images.owner} alt="Hamsh Beauty Care beautician" fill sizes="40vw" />
          <span>Beauty is personal.</span>
        </ImageReveal>

        <div className="about-copy">
          <SectionIntro
            eyebrow="Our story"
            title="About Hamsh Beauty Care"
            copy="At Hamsh Beauty Care, beauty is about more than appearance. Our goal is to help every woman feel comfortable, confident and beautiful through professional beauty care, makeup and styling."
          />
          <StaggerGroup stagger={0.06} delay={0.15}>
            <div className="pills">
              {['Personalised Beauty Care', 'Bridal Specialists', 'Professional Makeup', 'Ladies Only', 'Attention to Detail'].map((x) => (
                <StaggerItem key={x} variant="fade-up" distance={16}>
                  <span><Sparkles size={14} />{x}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

function Why() {
  return (
    <section className="why section">
      <SectionIntro eyebrow="The Hamsh difference" title="A beauty experience, made for you." centered />
      <StaggerGroup stagger={0.08} delay={0.1}>
        <div className="why-grid">
          {[
            ['01', 'Personalised Care', 'Every beauty treatment is tailored to you.'],
            ['02', 'Professional Services', 'Careful attention to quality, style and presentation.'],
            ['03', 'Bridal Expertise', 'Beautiful transformations for memorable occasions.'],
            ['04', 'Ladies-only comfort', 'A welcoming experience designed for women.'],
          ].map(([n, t, d]) => (
            <StaggerItem key={n} variant="fade-up" distance={22}>
              <div className="why-item">
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section testimonials">
      <SectionIntro eyebrow="Kind words" title="Loved by our clients" centered />
      <StaggerGroup stagger={0.09} delay={0.1}>
        <div className="testimonial-grid">
          {[
            ['SA', 'Sana Ahmed', 'Bridal Makeup', 'The makeup was beautiful and exactly what I imagined for my special day.'],
            ['MH', 'Maha Hussain', 'Party Makeup', 'Such a warm experience and the finish was absolutely gorgeous.'],
            ['AR', 'Areeba Raza', 'Hair Styling', 'They understood exactly what I wanted. I felt so confident.'],
          ].map(([initials, name, type, quote]) => (
            <StaggerItem key={name} variant="fade-up" distance={25}>
              <article className="testimonial">
                <div className="stars">★★★★★</div>
                <p>“{quote}”</p>
                <footer>
                  <span>{initials}</span>
                  <div>
                    <b>{name}</b>
                    <small>{type}</small>
                  </div>
                </footer>
              </article>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}

function Social() {
  return (
    <section className="social section">
      <SectionIntro eyebrow="Stay inspired" title="Follow our beauty journey" copy="More looks, more inspiration, more beautiful moments." />
      <StaggerGroup stagger={0.07} delay={0.1}>
        <div className="social-grid">
          {gallery.slice(0, 4).map(([cat, src]) => (
            <StaggerItem key={src} variant="scale">
              <Image src={src} alt={`${cat} beauty inspiration`} width={400} height={400} />
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
      <ScrollReveal variant="fade-up" delay={0.2}>
        <a className="text-link" href="#contact">
          <Heart size={17} /> Follow Hamsh Beauty Care on Instagram <ArrowUpRight size={16} />
        </a>
      </ScrollReveal>
    </section>
  )
}

function FAQ() {
  const [active, setActive] = useState(0)
  const questions = [
    'Do you provide bridal makeup?',
    'Do you offer party makeup?',
    'Can I send a reference makeup style through WhatsApp?',
    'How can I ask about pricing?',
    'Do you provide services only for ladies?',
    'Where is Hamsh Beauty Care located?',
  ]

  return (
    <section className="section faq">
      <SectionIntro eyebrow="Good to know" title="Frequently asked questions" />
      <ScrollReveal variant="fade-up" delay={0.15}>
        <div className="faq-list">
          {questions.map((q, i) => (
            <div className={`faq-item ${active === i ? 'is-open' : ''}`} key={q}>
              <button onClick={() => setActive(active === i ? -1 : i)}>
                <span>{q}</span>
                <ChevronDown size={19} />
              </button>
              <div className="answer">
                <p>
                  {i === 0
                    ? 'Yes, we offer personalised bridal makeup and complete bridal styling for your special day.'
                    : i === 1
                    ? 'Yes, our party makeup looks are tailored to your event, outfit and personal style.'
                    : 'Honestly. Send us your reference through WhatsApp and our team will be happy to guide you.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <ScrollReveal variant="left" delay={0.05}>
        <div className="contact-copy">
          <span className="eyebrow gold">Start a conversation</span>
          <MaskedHeading as="h2">Let&apos;s create<br /><i>your look.</i></MaskedHeading>
          <p>Interested in one of our services? Message us directly on WhatsApp and tell us what you&apos;re looking for.</p>
          <Button href={whatsapp()}>Chat with us on WhatsApp</Button>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.15}>
        <div className="contact-details">
          <div><Phone size={18} /><span><small>Phone</small>+92 300 1234567</span></div>
          <div><MessageCircle size={18} /><span><small>WhatsApp</small>Message us anytime</span></div>
          <div><MapPin size={18} /><span><small>Location</small>Your city, Pakistan</span></div>
          <div><Heart size={18} /><span><small>Opening hours</small>Mon – Sat · 10am – 8pm</span></div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="right" delay={0.2}>
        <div className="map-placeholder">
          <MapPin size={30} />
          <span>Hamsh Beauty Care</span>
          <small>Location map</small>
        </div>
      </ScrollReveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <ScrollReveal variant="fade-up" delay={0.05}>
        <div className="footer-top">
          <a href="#home" className="logo light">
            <span>H</span>
            <div>Hamsh <b>Beauty Care</b></div>
          </a>
          <p>Beauty <b>•</b> Confidence <b>•</b> Elegance</p>
          <div className="socials">
            <a href="#contact" aria-label="Facebook"><MessageCircle size={18} /></a>
            <a href="#contact" aria-label="Instagram"><Heart size={18} /></a>
            <a href={whatsapp()} aria-label="WhatsApp"><MessageCircle size={18} /></a>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={0.1}>
        <div className="footer-bottom">
          <span>© Hamsh Beauty Care. All Rights Reserved.</span>
          <div>
            <a href="#services">Services</a>
            <a href="#bridal">Bridal</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <FirstVisitLoader />
      <CinematicScroll>
        <Navbar />
        <Hero />
        <Services />
        <Bridal />
        <BeautifulTransformations />
        <Gallery />
        <Packages />
        <About />
        <Why />
        <Testimonials />
        <Social />
        <FAQ />
        <Contact />
        <Footer />
        <a className="floating-whatsapp" href={whatsapp()} aria-label="Chat on WhatsApp">
          <MessageCircle size={23} />
        </a>
        <a className="mobile-whatsapp" href={whatsapp()}>
          <MessageCircle size={19} /> Chat with Hamsh Beauty Care
        </a>
      </CinematicScroll>
    </>
  )
}
