import { useState, useMemo } from 'react'
import { CheckCircle, XCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useBookings } from '@/hooks/useBookings'
import { formatPrice } from '@/lib/utils'
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

export default function AdminBookings() {
  const { bookings, updateBookingStatus } = useBookings()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [actionBooking, setActionBooking] = useState<{ id: string; action: 'complete' | 'cancel' } | null>(null)

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        !search ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.vehicleNo.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all' || b.status === filterStatus
      return matchSearch && matchStatus
    }).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [bookings, search, filterStatus])

  function exportCsv() {
    const headers = ['ID', 'Nama', 'Telefon', 'E-mel', 'Kenderaan', 'Pakej', 'Harga', 'Tarikh', 'Masa', 'Status']
    const rows = filtered.map((b) => [
      b.id, b.customerName, b.customerPhone, b.customerEmail,
      b.vehicleNo, b.packageName, b.packagePrice, b.date, b.time, b.status,
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tempahan-autosinaran-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function confirmAction() {
    if (!actionBooking) return
    updateBookingStatus(actionBooking.id, actionBooking.action === 'complete' ? 'completed' : 'cancelled')
    setActionBooking(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl">SENARAI TEMPAHAN</h1>
          <p className="text-white/50 text-sm mt-1">{filtered.length} rekod dijumpai</p>
        </div>
        <Button variant="outline" onClick={exportCsv} className="flex items-center gap-2">
          <Download size={15} /> Eksport CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Cari nama, plat kenderaan, atau ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="pending_payment">Menunggu Bayaran</SelectItem>
            <SelectItem value="confirmed">Disahkan</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['ID', 'Pelanggan', 'Kenderaan', 'Pakej', 'Harga', 'Tarikh & Masa', 'Status', 'Tindakan'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-amber-400 font-mono text-xs">{b.id}</td>
                  <td className="px-4 py-3">
                    <div>{b.customerName}</div>
                    <div className="text-white/40 text-xs">{b.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{b.vehicleNo}</td>
                  <td className="px-4 py-3 text-white/70 text-xs">{b.packageName}</td>
                  <td className="px-4 py-3 text-amber-400">{formatPrice(b.packagePrice)}</td>
                  <td className="px-4 py-3 text-xs">
                    <div>{b.date}</div>
                    <div className="text-white/50">{b.time}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[b.status]} className="text-xs whitespace-nowrap">
                      {STATUS_LABELS[b.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {b.status === 'confirmed' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setActionBooking({ id: b.id, action: 'complete' })}
                          title="Tandakan sebagai Selesai"
                        >
                          <CheckCircle size={13} />
                        </Button>
                      )}
                      {(b.status === 'pending_payment' || b.status === 'confirmed') && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setActionBooking({ id: b.id, action: 'cancel' })}
                          title="Batalkan Tempahan"
                        >
                          <XCircle size={13} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-white/30">Tiada rekod dijumpai</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={!!actionBooking} onOpenChange={(o) => !o && setActionBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionBooking?.action === 'complete' ? 'Tandakan Sebagai Selesai' : 'Batalkan Tempahan'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/70 text-sm">
            {actionBooking?.action === 'complete'
              ? 'Adakah anda pasti tempahan ini telah selesai dilaksanakan?'
              : 'Adakah anda pasti ingin membatalkan tempahan ini?'}
          </p>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setActionBooking(null)} className="flex-1">Batal</Button>
            <Button
              variant={actionBooking?.action === 'complete' ? 'default' : 'destructive'}
              onClick={confirmAction}
              className="flex-1"
            >
              Sahkan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
