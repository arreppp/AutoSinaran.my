import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PackageCard from '@/components/booking/PackageCard'
import DateTimePicker from '@/components/booking/DateTimePicker'
import BookingSummary from '@/components/booking/BookingSummary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePackages } from '@/hooks/usePackages'
import { useBookingStore } from '@/store/bookingStore'
import { useAdminStore } from '@/store/adminStore'
import { createBillMock } from '@/lib/billplz'
import { generateBookingId, toAmountCents } from '@/lib/utils'
import type { Package } from '@/types'

const customerSchema = z.object({
  customerName: z.string().min(2, 'Nama sekurang-kurangnya 2 aksara'),
  customerPhone: z.string().min(9, 'No. telefon tidak sah').max(15),
  customerEmail: z.string().email('E-mel tidak sah'),
  vehicleNo: z.string().min(3, 'No. plat kenderaan diperlukan').toUpperCase(),
})

type CustomerForm = z.infer<typeof customerSchema>

const STEPS = ['Pilih Pakej', 'Tarikh & Masa', 'Semak & Bayar']

export default function BookingPage() {
  const navigate = useNavigate()
  const { activePackages } = usePackages()
  const store = useBookingStore()
  const addBooking = useAdminStore((s) => s.setBookings)
  const existingBookings = useAdminStore((s) => s.bookings)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerName: store.customerName,
      customerPhone: store.customerPhone,
      customerEmail: store.customerEmail,
      vehicleNo: store.vehicleNo,
    },
  })

  const canNext = (() => {
    if (store.currentStep === 1) return !!store.selectedPackage
    if (store.currentStep === 2) return !!store.selectedDate && !!store.selectedTime
    return true
  })()

  function goBack() {
    if (store.currentStep > 1) store.setStep((store.currentStep - 1) as 1 | 2 | 3)
    else navigate('/')
  }

  function goNext() {
    if (store.currentStep < 3) store.setStep((store.currentStep + 1) as 1 | 2 | 3)
  }

  function onCustomerSubmit(data: CustomerForm) {
    store.setCustomerInfo(data)
    goNext()
  }

  async function handlePayment() {
    if (!store.selectedPackage || !store.selectedDate || !store.selectedTime) return
    setLoading(true)
    try {
      const bookingId = generateBookingId()
      const appBase = import.meta.env.VITE_APP_BASE_URL ?? window.location.origin

      const bill = await createBillMock({
        collection_id: import.meta.env.VITE_BILLPLZ_COLLECTION_ID ?? 'mock_collection',
        email: store.customerEmail,
        mobile: store.customerPhone,
        name: store.customerName,
        amount: toAmountCents(store.selectedPackage.price),
        callback_url: `${appBase}/api/billplz/callback`,
        redirect_url: `${appBase}/payment/success`,
        description: `Auto Sinaran - ${store.selectedPackage.name}`,
        reference_1_label: 'Booking ID',
        reference_1: bookingId,
      })

      // Save booking as pending
      const newBooking = {
        id: bookingId,
        customerName: store.customerName,
        customerPhone: store.customerPhone,
        customerEmail: store.customerEmail,
        vehicleNo: store.vehicleNo,
        packageId: store.selectedPackage.id,
        packageName: store.selectedPackage.name,
        packagePrice: store.selectedPackage.price,
        packageServices: store.selectedPackage.services,
        date: store.selectedDate,
        time: store.selectedTime,
        status: 'pending_payment' as const,
        billplzBillId: bill.id,
        billplzUrl: bill.url,
        createdAt: new Date().toISOString(),
      }
      addBooking([...existingBookings, newBooking])
      store.setConfirmedBooking(newBooking)

      // Redirect to BillPlz (mock redirects back to success directly)
      window.location.href = bill.url
    } catch (err) {
      console.error(err)
      alert('Ralat semasa membuat bil. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1515] text-white font-body">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, i) => {
              const step = (i + 1) as 1 | 2 | 3
              const active = store.currentStep === step
              const done = store.currentStep > step
              return (
                <div key={label} className="flex-1 flex flex-col items-center relative">
                  {i < STEPS.length - 1 && (
                    <div className={`absolute top-4 left-1/2 w-full h-0.5 ${done ? 'bg-amber-500' : 'bg-white/10'}`} />
                  )}
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold z-10 transition-colors ${
                    done ? 'bg-amber-500 border-amber-500 text-[#0A1515]'
                    : active ? 'border-amber-500 text-amber-500 bg-[#0A1515]'
                    : 'border-white/20 text-white/30 bg-[#0A1515]'
                  }`}>
                    {done ? '✓' : step}
                  </div>
                  <span className={`mt-2 text-xs hidden sm:block ${active ? 'text-amber-400' : done ? 'text-white/60' : 'text-white/30'}`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Step 1 — Package */}
          {store.currentStep === 1 && (
            <div>
              <h2 className="font-heading text-3xl mb-6">PILIH PAKEJ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {activePackages.map((pkg: Package) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    selected={store.selectedPackage?.id === pkg.id}
                    onSelect={(p) => store.setPackage(p)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Date & Customer */}
          {store.currentStep === 2 && (
            <div>
              <h2 className="font-heading text-3xl mb-6">TARIKH, MASA & MAKLUMAT</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <DateTimePicker
                  selectedDate={store.selectedDate}
                  selectedTime={store.selectedTime}
                  onDateChange={(d) => store.setDateTime(d, '')}
                  onTimeChange={(t) => store.setDateTime(store.selectedDate!, t)}
                />
                <form id="customer-form" onSubmit={handleSubmit(onCustomerSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Nama Penuh</Label>
                    <Input id="customerName" {...register('customerName')} placeholder="Ahmad Bin Ibrahim" className="mt-1" />
                    {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">No. Telefon</Label>
                    <Input id="customerPhone" {...register('customerPhone')} placeholder="0123456789" className="mt-1" />
                    {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">E-mel</Label>
                    <Input id="customerEmail" type="email" {...register('customerEmail')} placeholder="nama@gmail.com" className="mt-1" />
                    {errors.customerEmail && <p className="text-red-400 text-xs mt-1">{errors.customerEmail.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="vehicleNo">No. Plat Kenderaan</Label>
                    <Input id="vehicleNo" {...register('vehicleNo')} placeholder="WXY 1234" className="mt-1 uppercase" />
                    {errors.vehicleNo && <p className="text-red-400 text-xs mt-1">{errors.vehicleNo.message}</p>}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {store.currentStep === 3 && (
            <div>
              <h2 className="font-heading text-3xl mb-6">SEMAK & BAYAR</h2>
              <BookingSummary />
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300">
                Pembayaran selamat melalui BillPlz. Anda akan diarahkan ke halaman pembayaran BillPlz.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-1">
              <ChevronLeft size={16} /> Kembali
            </Button>
            {store.currentStep < 3 ? (
              store.currentStep === 2 ? (
                <Button
                  form="customer-form"
                  type="submit"
                  disabled={!canNext}
                  className="flex-1 flex items-center justify-center gap-1"
                >
                  Seterusnya <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canNext}
                  className="flex-1 flex items-center justify-center gap-1"
                >
                  Seterusnya <ChevronRight size={16} />
                </Button>
              )
            ) : (
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 text-base font-bold"
                size="lg"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Memproses...</> : 'Bayar Sekarang'}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
