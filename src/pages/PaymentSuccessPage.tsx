import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/store/bookingStore'
import { useAdminStore } from '@/store/adminStore'
import { parseBookingFromParams, formatDate, formatPrice } from '@/lib/utils'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReceiptDocument from '@/components/receipt/ReceiptDocument'

export default function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const store = useBookingStore()
  const updateBookingStatus = useAdminStore((s) => s.updateBookingStatus)
  const { paid } = parseBookingFromParams(params)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (paid && store.confirmedBooking && !confirmed) {
      updateBookingStatus(store.confirmedBooking.id, 'confirmed')
      setConfirmed(true)
    }
  }, [paid, store.confirmedBooking, confirmed, updateBookingStatus])

  const booking = store.confirmedBooking

  if (!paid || !booking) {
    return (
      <div className="min-h-screen bg-[#0A1515] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-amber-400 text-6xl mb-4">⚠</div>
          <h1 className="font-heading text-3xl mb-2">Maklumat Pembayaran Tidak Lengkap</h1>
          <p className="text-white/60 mb-6">Jika anda telah membayar, sila hubungi kami dengan bukti pembayaran.</p>
          <Button asChild variant="outline">
            <Link to="/">Kembali ke Laman Utama</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A1515] text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <CheckCircle2 size={64} className="text-green-400 mx-auto mb-4" />
        <h1 className="font-heading text-4xl mb-2 text-green-400">PEMBAYARAN BERJAYA!</h1>
        <p className="text-white/60 mb-8">Tempahan anda telah disahkan. Sila simpan resit ini.</p>

        <div className="rounded-xl border border-white/10 bg-white/5 text-left mb-6 overflow-hidden">
          <div className="bg-green-500/10 border-b border-green-500/20 px-5 py-3">
            <span className="font-heading text-green-400">RESIT TEMPAHAN</span>
            <span className="ml-2 text-white/50 text-sm">#{booking.id}</span>
          </div>
          <div className="p-5 space-y-2.5 text-sm">
            {[
              ['Nama', booking.customerName],
              ['No. Kenderaan', booking.vehicleNo],
              ['Pakej', booking.packageName],
              ['Tarikh', formatDate(booking.date)],
              ['Masa', booking.time],
              ['No. Telefon', booking.customerPhone],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-white/50">{label}</span>
                <span className="text-white font-medium text-right">{value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between">
              <span className="text-white/70 font-medium">Jumlah Dibayar</span>
              <span className="font-heading text-xl text-green-400">{formatPrice(booking.packagePrice)}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm mb-6">
          Sila tiba 10 minit lebih awal dari masa yang ditetapkan.
        </div>

        <div className="flex flex-col gap-3">
          <PDFDownloadLink
            document={<ReceiptDocument booking={booking} />}
            fileName={`resit-autosinaran-${booking.id}.pdf`}
          >
            {(({ loading: pdfLoading }: { loading: boolean }) => (
              <Button className="w-full" size="lg">
                {pdfLoading ? 'Menyedia resit...' : '📄 Muat Turun Resit PDF'}
              </Button>
            )) as unknown as React.ReactNode}
          </PDFDownloadLink>
          <Button asChild variant="outline" onClick={() => store.reset()}>
            <Link to="/">Buat Tempahan Baru</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
