import { transformations } from '@/features/transformations/data/transformations'
import {
  BEAUTY_IMAGE_URL,
  BRIDAL_IMAGE_URL,
  GALLERY_BEAUTY_IMAGE_URL,
  GALLERY_BRIDAL_IMAGE_URL,
  GALLERY_HAIR_IMAGE_URL,
  GALLERY_MODEL_IMAGE_URL,
} from '@/lib/constants/images'

export const galleryImages = [
  ['Bridal', BRIDAL_IMAGE_URL, 'Bridal party makeup preparation'],
  ['Beauty', GALLERY_BEAUTY_IMAGE_URL, 'Facial treatment in salon'],
  ['Hair', GALLERY_HAIR_IMAGE_URL, 'Wavy hair styling'],
  ['Beauty', BEAUTY_IMAGE_URL, 'Advanced facial treatment'],
  ['Bridal', GALLERY_BRIDAL_IMAGE_URL, 'Makeup application service'],
  ['Hair', GALLERY_MODEL_IMAGE_URL, 'Hair styling and finishing'],
  ['Transformations', transformations[0].afterImage, 'Hair styling transformation result'],
] as const
