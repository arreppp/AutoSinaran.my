import axios from 'axios'
import type { Package, Booking, DayAvailability } from '@/types'

const STRAPI_BASE = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN ?? ''

export const strapiApi = axios.create({
  baseURL: `${STRAPI_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  },
})

// Strapi v4 response shapes
interface StrapiAttributes {
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

interface StrapiItem<T extends StrapiAttributes> {
  id: number
  attributes: T
}

interface StrapiList<T extends StrapiAttributes> {
  data: StrapiItem<T>[]
}

interface StrapiSingle<T extends StrapiAttributes> {
  data: StrapiItem<T>
}

interface PackageAttributes extends StrapiAttributes {
  name: string
  description?: string
  price: number
  services: Array<{ id: string; name: string }>
  isActive: boolean
  isMostPopular: boolean
}

interface BookingAttributes extends StrapiAttributes {
  bookingId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleNo: string
  packageId: string
  packageName: string
  packagePrice: number
  packageServices: Array<{ id: string; name: string }>
  date: string
  time: string
  status: string
  billplzBillId?: string
  billplzUrl?: string
  paidAt?: string
}

function toPackage(item: StrapiItem<PackageAttributes>): Package {
  const { id, attributes: a } = item
  return {
    id: String(id),
    name: a.name,
    description: a.description,
    price: a.price,
    services: a.services ?? [],
    isActive: a.isActive,
    isMostPopular: a.isMostPopular,
    createdAt: a.createdAt,
  }
}

function toBooking(item: StrapiItem<BookingAttributes>): Booking {
  const { attributes: a } = item
  return {
    id: a.bookingId,
    customerName: a.customerName,
    customerPhone: a.customerPhone,
    customerEmail: a.customerEmail,
    vehicleNo: a.vehicleNo,
    packageId: a.packageId,
    packageName: a.packageName,
    packagePrice: a.packagePrice,
    packageServices: a.packageServices ?? [],
    date: a.date,
    time: a.time,
    status: a.status as Booking['status'],
    billplzBillId: a.billplzBillId,
    billplzUrl: a.billplzUrl,
    paidAt: a.paidAt,
    createdAt: a.createdAt,
  }
}

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// --- Packages ---

export async function fetchPackages(): Promise<Package[]> {
  const { data } = await strapiApi.get<StrapiList<PackageAttributes>>('/packages?sort=createdAt:asc')
  return data.data.map(toPackage)
}

export async function createPackage(pkg: Omit<Package, 'id' | 'createdAt'>): Promise<Package> {
  const { data } = await strapiApi.post<StrapiSingle<PackageAttributes>>('/packages', { data: pkg })
  return toPackage(data.data)
}

export async function updatePackage(id: string, pkg: Partial<Omit<Package, 'id' | 'createdAt'>>): Promise<Package> {
  const { data } = await strapiApi.put<StrapiSingle<PackageAttributes>>(`/packages/${id}`, { data: pkg })
  return toPackage(data.data)
}

export async function deletePackage(id: string): Promise<void> {
  await strapiApi.delete(`/packages/${id}`)
}

// --- Bookings ---

export async function fetchBookings(): Promise<Booking[]> {
  const { data } = await strapiApi.get<StrapiList<BookingAttributes>>(
    '/bookings?sort=createdAt:desc&pagination[pageSize]=200'
  )
  return data.data.map(toBooking)
}

export async function createBooking(booking: Omit<Booking, 'createdAt'>): Promise<Booking> {
  const { data } = await strapiApi.post<StrapiSingle<BookingAttributes>>('/bookings', {
    data: {
      bookingId: booking.id,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      customerEmail: booking.customerEmail,
      vehicleNo: booking.vehicleNo,
      packageId: booking.packageId,
      packageName: booking.packageName,
      packagePrice: booking.packagePrice,
      packageServices: booking.packageServices,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      billplzBillId: booking.billplzBillId,
      billplzUrl: booking.billplzUrl,
    },
  })
  return toBooking(data.data)
}

export async function patchBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
  const { data: list } = await strapiApi.get<StrapiList<BookingAttributes>>(
    `/bookings?filters[bookingId][$eq]=${bookingId}`
  )
  if (list.data.length === 0) return
  const strapiId = list.data[0].id
  await strapiApi.put(`/bookings/${strapiId}`, { data: { status } })
}

// --- Availability ---

export async function fetchAvailability(date: string): Promise<DayAvailability> {
  const { data } = await strapiApi.get<StrapiList<BookingAttributes>>(
    `/bookings?filters[date][$eq]=${date}&filters[status][$in][0]=confirmed&filters[status][$in][1]=pending_payment`
  )
  const bookedTimes = new Set(data.data.map((item) => item.attributes.time))
  return {
    date,
    slots: TIME_SLOTS.map((time) => ({
      time,
      status: bookedTimes.has(time) ? 'booked' : 'available',
    })),
  }
}
