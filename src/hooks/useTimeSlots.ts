import { useState, useEffect } from 'react'
import { fetchAvailability } from '@/lib/strapi'
import type { TimeSlot } from '@/types'

export function useTimeSlots(date: string | null) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) {
      setSlots([])
      return
    }
    setLoading(true)
    fetchAvailability(date)
      .then((availability) => setSlots(availability.slots))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false))
  }, [date])

  return { slots, loading }
}
