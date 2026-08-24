/**
 * cn — class name utility.
 *
 * Merges Tailwind CSS class names safely using clsx for conditional
 * class logic and tailwind-merge to resolve conflicting Tailwind
 * utilities (e.g., two padding values, two text colours).
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-primary', className)
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
