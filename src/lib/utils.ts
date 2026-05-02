import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
  return `RM ${amount.toFixed(2)}`
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function generateBookingId() {
  const prefix = 'AS'
  const num = Math.floor(Math.random() * 90000) + 10000
  return `${prefix}${num}`
}

export function parseBookingFromParams(params: URLSearchParams) {
  return {
    billId: params.get('billplz[id]') ?? '',
    paid: params.get('billplz[paid]') === 'true',
    xSignature: params.get('billplz[x_signature]') ?? '',
  }
}

export function toAmountCents(ringgit: number) {
  return Math.round(ringgit * 100)
}
