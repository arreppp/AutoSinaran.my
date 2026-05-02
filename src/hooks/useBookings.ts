import { useEffect } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { MOCK_BOOKINGS } from '@/lib/mockData'

export function useBookings() {
  const { bookings, setBookings, updateBookingStatus } = useAdminStore()

  useEffect(() => {
    if (bookings.length === 0) {
      setBookings(MOCK_BOOKINGS)
    }
  }, [bookings.length, setBookings])

  return { bookings, updateBookingStatus }
}
