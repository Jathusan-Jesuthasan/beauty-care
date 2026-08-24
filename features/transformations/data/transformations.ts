import type { Transformation } from '../types'

export const transformations: Transformation[] = [
  {
    id: 'hair-reference', category: 'Hair',
    beforeImage: '/images/before-after/Before-hair.jpg',
    afterImage: '/images/before-after/after-hair.jpeg',
    beforeLabel: 'Before', afterLabel: 'After',
  },
  {
    id: 'beauty-reference', category: 'Beauty',
    beforeImage: '/images/before-after/before-Beauty.jpg',
    afterImage: '/images/before-after/after-beauty.jpeg',
    beforeLabel: 'Before', afterLabel: 'After',
  },
  {
    id: 'bridal-reference', category: 'Bridal',
    beforeImage: '/images/before-after/before-bridal.jpg',
    afterImage: '/images/before-after/after-bridal.jpg',
    beforeLabel: 'Before', afterLabel: 'After',
  },
]
