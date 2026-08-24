export interface Transformation {
  id: string
  category: 'Hair' | 'Beauty' | 'Bridal'
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  placeholder?: boolean
}
