import { useState, useEffect } from 'react'
import { getMockAvailability } from '@/lib/mockData'
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
    // Simulate async fetch
    const timer = setTimeout(() => {
      const availability = getMockAvailability(date)
      setSlots(availability.slots)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [date])

  return { slots, loading }
}
