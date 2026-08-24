import type { Transformation } from '../types'

export const transformations: Transformation[] = [
  {
    id: 'hair-reference', category: 'Hair',
    beforeImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85',
    afterImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=85',
    beforeLabel: 'Reference image', afterLabel: 'Reference image', placeholder: true,
  },
  {
    id: 'beauty-reference', category: 'Beauty',
    beforeImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
    afterImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    beforeLabel: 'Reference image', afterLabel: 'Reference image', placeholder: true,
  },
  {
    id: 'bridal-reference', category: 'Bridal',
    beforeImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85',
    afterImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85',
    beforeLabel: 'Reference image', afterLabel: 'Reference image', placeholder: true,
  },
]
