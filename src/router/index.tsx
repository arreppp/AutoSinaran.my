import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAdminStore } from '@/store/adminStore'
import LandingPage from '@/pages/LandingPage'
import BookingPage from '@/pages/BookingPage'
import PaymentSuccessPage from '@/pages/PaymentSuccessPage'
import PaymentFailPage from '@/pages/PaymentFailPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminPackages from '@/pages/admin/AdminPackages'
import AdminBookings from '@/pages/admin/AdminBookings'
import AdminLayout from '@/pages/admin/AdminLayout'

function AdminGuard() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <Outlet />
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/book', element: <BookingPage /> },
  { path: '/payment/success', element: <PaymentSuccessPage /> },
  { path: '/payment/fail', element: <PaymentFailPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'packages', element: <AdminPackages /> },
          { path: 'bookings', element: <AdminBookings /> },
        ],
      },
    ],
  },
])
