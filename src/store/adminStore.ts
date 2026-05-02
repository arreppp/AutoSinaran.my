import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Package, Booking } from '@/types'

interface AdminState {
  isAuthenticated: boolean
  packages: Package[]
  bookings: Booking[]
  login: (username: string, password: string) => boolean
  logout: () => void
  setPackages: (packages: Package[]) => void
  addPackage: (pkg: Package) => void
  updatePackage: (pkg: Package) => void
  deletePackage: (id: string) => void
  setBookings: (bookings: Booking[]) => void
  updateBookingStatus: (id: string, status: Booking['status']) => void
}

const ADMIN_CREDENTIALS = { username: 'admin', password: 'sinaran2024' }

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      packages: [],
      bookings: [],

      login: (username, password) => {
        if (
          username === ADMIN_CREDENTIALS.username &&
          password === ADMIN_CREDENTIALS.password
        ) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => set({ isAuthenticated: false }),

      setPackages: (packages) => set({ packages }),
      addPackage: (pkg) => set({ packages: [...get().packages, pkg] }),
      updatePackage: (pkg) =>
        set({ packages: get().packages.map((p) => (p.id === pkg.id ? pkg : p)) }),
      deletePackage: (id) =>
        set({ packages: get().packages.filter((p) => p.id !== id) }),

      setBookings: (bookings) => set({ bookings }),
      updateBookingStatus: (id, status) =>
        set({
          bookings: get().bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        }),
    }),
    {
      name: 'auto-sinaran-admin',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        packages: state.packages,
        bookings: state.bookings,
      }),
    }
  )
)
