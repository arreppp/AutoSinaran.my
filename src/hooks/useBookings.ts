import { useState, useEffect } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { fetchBookings, patchBookingStatus } from '@/lib/strapi'
import type { Booking } from '@/types'

export function useBookings() {
  const { bookings, setBookings, updateBookingStatus: storeUpdate } = useAdminStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchBookings()
      .then(setBookings)
      .catch(() => setError('Gagal memuatkan tempahan dari pelayan.'))
      .finally(() => setLoading(false))
  }, [setBookings])

  async function updateBookingStatus(id: string, status: Booking['status']) {
    await patchBookingStatus(id, status)
    storeUpdate(id, status)
  }

  return { bookings, updateBookingStatus, loading, error }
}
