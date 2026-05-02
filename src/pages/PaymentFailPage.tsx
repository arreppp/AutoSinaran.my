import { Link, useNavigate } from 'react-router-dom'
import { XCircle, MessageCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/store/bookingStore'

export default function PaymentFailPage() {
  const navigate = useNavigate()
  const store = useBookingStore()

  function handleRetry() {
    store.setStep(3)
    navigate('/book')
  }

  const waText = encodeURIComponent('Salam, saya menghadapi masalah semasa pembayaran untuk tempahan Auto Sinaran. Boleh bantu?')

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <XCircle size={64} className="text-red-400 mx-auto mb-4" />
        <h1 className="font-heading text-4xl mb-2 text-red-400">PEMBAYARAN GAGAL</h1>
        <p className="text-white/60 mb-8">
          Pembayaran tidak berjaya. Sila cuba lagi atau hubungi kami untuk bantuan.
        </p>

        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-8">
          Maklumat tempahan anda masih disimpan. Anda boleh cuba bayar semula.
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleRetry} size="lg" className="w-full flex items-center justify-center gap-2">
            <RefreshCw size={18} /> Cuba Semula
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
            <a href={`https://wa.me/60103064816?text=${waText}`} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Hubungi via WhatsApp
            </a>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link to="/">Kembali ke Laman Utama</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
