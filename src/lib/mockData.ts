import type { Package, DayAvailability, Booking } from '@/types'
import { format, addDays } from 'date-fns'

export const MOCK_PACKAGES: Package[] = [
  {
    id: 'pkg-1',
    name: 'Pakej Asas',
    description: 'Servis asas untuk menjaga kereta anda',
    price: 80,
    services: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
    ],
    isActive: true,
    isMostPopular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pkg-2',
    name: 'Pakej Standard',
    description: 'Pakej paling popular untuk pemandu e-hailing',
    price: 150,
    services: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
      { id: 's3', name: 'Putaran & Pemeriksaan Tayar' },
    ],
    isActive: true,
    isMostPopular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pkg-3',
    name: 'Pakej Premium',
    description: 'Servis lengkap untuk keselamatan dan keselesaan maksimum',
    price: 200,
    services: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
      { id: 's3', name: 'Putaran & Pemeriksaan Tayar' },
      { id: 's4', name: 'Penggantian Wiper' },
    ],
    isActive: true,
    isMostPopular: false,
    createdAt: new Date().toISOString(),
  },
]

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
]

export function getMockAvailability(dateStr: string): DayAvailability {
  const bookedTimes = ['09:00', '11:00', '15:00']
  return {
    date: dateStr,
    slots: TIME_SLOTS.map((time) => ({
      time,
      status: bookedTimes.includes(time) ? 'booked' : 'available',
    })),
  }
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'AS10001',
    customerName: 'Ahmad Razif',
    customerPhone: '0123456789',
    customerEmail: 'razif@gmail.com',
    vehicleNo: 'WXY 1234',
    packageId: 'pkg-2',
    packageName: 'Pakej Standard',
    packagePrice: 150,
    packageServices: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
      { id: 's3', name: 'Putaran & Pemeriksaan Tayar' },
    ],
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '10:00',
    status: 'confirmed',
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'AS10002',
    customerName: 'Siti Norbaya',
    customerPhone: '0198765432',
    customerEmail: 'siti@gmail.com',
    vehicleNo: 'VKL 5678',
    packageId: 'pkg-1',
    packageName: 'Pakej Asas',
    packagePrice: 80,
    packageServices: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
    ],
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '14:00',
    status: 'confirmed',
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'AS10003',
    customerName: 'Rajesh Kumar',
    customerPhone: '0112233445',
    customerEmail: 'rajesh@gmail.com',
    vehicleNo: 'JHB 9012',
    packageId: 'pkg-3',
    packageName: 'Pakej Premium',
    packagePrice: 200,
    packageServices: [
      { id: 's1', name: 'Pemeriksaan & Servis Brek' },
      { id: 's2', name: 'Tukar Minyak Enjin' },
      { id: 's3', name: 'Putaran & Pemeriksaan Tayar' },
      { id: 's4', name: 'Penggantian Wiper' },
    ],
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    status: 'completed',
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]
