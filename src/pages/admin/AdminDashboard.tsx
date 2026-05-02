import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useBookings } from '@/hooks/useBookings'
import { formatDate, formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import type { BookingStatus } from '@/types'

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending_payment: 'Menunggu Bayaran',
  confirmed: 'Disahkan',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}
const STATUS_VARIANTS: Record<BookingStatus, 'warning' | 'success' | 'secondary' | 'destructive'> = {
  pending_payment: 'warning',
  confirmed: 'success',
  completed: 'secondary',
  cancelled: 'destructive',
}

export default function AdminDashboard() {
  const { bookings } = useBookings()
  const today = format(new Date(), 'yyyy-MM-dd')
  const thisMonth = format(new Date(), 'yyyy-MM')

  const stats = useMemo(() => {
    const todayCount = bookings.filter((b) => b.date === today && b.status !== 'cancelled').length
    const monthBookings = bookings.filter((b) => b.date.startsWith(thisMonth) && b.status !== 'cancelled')
    const monthCount = monthBookings.length
    const monthRevenue = monthBookings
      .filter((b) => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.packagePrice, 0)
    return { todayCount, monthCount, monthRevenue }
  }, [bookings, today, thisMonth])

  const recent = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl">DASHBOARD</h1>
        <p className="text-white/50 text-sm mt-1">{formatDate(today)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: CalendarCheck, label: 'Tempahan Hari Ini', value: stats.todayCount, color: 'text-amber-400' },
          { icon: TrendingUp, label: 'Tempahan Bulan Ini', value: stats.monthCount, color: 'text-blue-400' },
          { icon: DollarSign, label: 'Pendapatan Bulan Ini', value: formatPrice(stats.monthRevenue), color: 'text-green-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-white/50 text-sm">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <div className={`font-heading text-3xl ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
          <h2 className="font-heading text-xl">TEMPAHAN TERBARU</h2>
          <Button asChild variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
            <Link to="/admin/bookings">Lihat Semua <ArrowRight size={14} className="ml-1" /></Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['ID', 'Pelanggan', 'Kenderaan', 'Pakej', 'Tarikh', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-amber-400 font-mono text-xs">{b.id}</td>
                  <td className="px-4 py-3">{b.customerName}</td>
                  <td className="px-4 py-3 font-mono text-xs">{b.vehicleNo}</td>
                  <td className="px-4 py-3 text-white/70">{b.packageName}</td>
                  <td className="px-4 py-3 text-white/70 text-xs">{b.date} {b.time}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[b.status]} className="text-xs">
                      {STATUS_LABELS[b.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-white/30">Tiada tempahan lagi</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
