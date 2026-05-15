import type { Package, DayAvailability, Booking } from '@/types'
import { format, addDays } from 'date-fns'

export const MOCK_PACKAGES: Package[] = [
  {
    id: 'pkg-1',
    name: 'Pakej Petronas Syntium 3000 5w30',
    description: 'Oil filter, gasket & labour',
    price: 249,
    image: '/3000.jpeg',
    services: [
      { id: 's1', name: 'Petronas Syntium 3000 5w30' },
      { id: 's2', name: 'Oil Filter' },
      { id: 's3', name: 'Gasket' },
      { id: 's4', name: 'Labour' },
    ],
    isActive: true,
    isMostPopular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pkg-2',
    name: 'Pakej Petronas Syntium 800 10w40',
    description: 'Oil filter, gasket & labour',
    price: 234,
    image: '/800.jpeg',
    services: [
      { id: 's1', name: 'Petronas Syntium 800 10w40' },
      { id: 's2', name: 'Oil Filter' },
      { id: 's3', name: 'Gasket' },
      { id: 's4', name: 'Labour' },
    ],
    isActive: true,
    isMostPopular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pkg-3',
    name: 'Pakej Servis Air-Cond',
    description: 'Air filter (blow), vacuum, recharge, top-up gas & labour',
    price: 59,
    image: '/aircond.jpeg',
    services: [
      { id: 's1', name: 'Air Filter (Blow)' },
      { id: 's2', name: 'Vacuum' },
      { id: 's3', name: 'Recharge' },
      { id: 's4', name: 'Top-Up Gas' },
      { id: 's5', name: 'Labour' },
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
    packageId: 'pkg-1',
    packageName: 'Pakej Petronas Syntium 3000 5w30',
    packagePrice: 249,
    packageServices: [
      { id: 's1', name: 'Petronas Syntium 3000 5w30' },
      { id: 's2', name: 'Oil Filter' },
      { id: 's3', name: 'Gasket' },
      { id: 's4', name: 'Labour' },
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
    packageId: 'pkg-2',
    packageName: 'Pakej Petronas Syntium 800 10w40',
    packagePrice: 234,
    packageServices: [
      { id: 's1', name: 'Petronas Syntium 800 10w40' },
      { id: 's2', name: 'Oil Filter' },
      { id: 's3', name: 'Gasket' },
      { id: 's4', name: 'Labour' },
    ],
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '14:00',
    status: 'confirmed',
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]
