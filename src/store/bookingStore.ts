import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Package, CustomerInfo, Booking } from '@/types'

interface BookingState {
  selectedPackage: Package | null
  selectedDate: string | null
  selectedTime: string | null
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleNo: string
  currentStep: 1 | 2 | 3
  confirmedBooking: Booking | null
  setPackage: (pkg: Package) => void
  setDateTime: (date: string, time: string) => void
  setCustomerInfo: (info: CustomerInfo) => void
  setStep: (step: 1 | 2 | 3) => void
  setConfirmedBooking: (booking: Booking) => void
  reset: () => void
}

const initialState = {
  selectedPackage: null,
  selectedDate: null,
  selectedTime: null,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  vehicleNo: '',
  currentStep: 1 as const,
  confirmedBooking: null,
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      setPackage: (pkg) => set({ selectedPackage: pkg }),
      setDateTime: (date, time) => set({ selectedDate: date, selectedTime: time }),
      setCustomerInfo: (info) => set({ ...info }),
      setStep: (step) => set({ currentStep: step }),
      setConfirmedBooking: (booking) => set({ confirmedBooking: booking }),
      reset: () => set(initialState),
    }),
    {
      name: 'auto-sinaran-booking',
      partialize: (state) => ({
        selectedPackage: state.selectedPackage,
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
        customerName: state.customerName,
        customerPhone: state.customerPhone,
        customerEmail: state.customerEmail,
        vehicleNo: state.vehicleNo,
        currentStep: state.currentStep,
        confirmedBooking: state.confirmedBooking,
      }),
    }
  )
)
