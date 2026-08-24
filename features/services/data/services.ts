export interface ServiceIntent {
  id: string
  label: string
  description: string
  services: string[]
  cta: string
  target: string
}

export const serviceIntents: ServiceIntent[] = [
  { id: 'hair', label: 'Hair', description: 'Cut, colour, styling and treatments shaped around you.', services: ['Hair styling', 'Cut and colour', 'Hair treatments'], cta: 'Explore hair services', target: '#services' },
  { id: 'beauty', label: 'Beauty', description: 'Facials, makeup, brows and considered beauty care.', services: ['Facials', 'Makeup', 'Brows and beauty care'], cta: 'Explore beauty services', target: '#services' },
  { id: 'bridal', label: 'Bridal', description: 'A calm, considered beauty experience for your most meaningful day.', services: ['Bridal hair', 'Bridal makeup', 'Bridal preparation'], cta: 'Start your bridal journey', target: '#bridal-journey' },
  { id: 'event', label: 'Special event', description: 'Makeup, styling and beauty details for the moments worth dressing up for.', services: ['Event makeup', 'Occasion styling', 'Beauty preparation'], cta: 'Plan your event look', target: '#contact' },
]
