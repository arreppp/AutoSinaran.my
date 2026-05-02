import { Calendar, Clock, Car, User, Package as PackageIcon } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import { useBookingStore } from '@/store/bookingStore'

export default function BookingSummary() {
  const { selectedPackage, selectedDate, selectedTime, customerName, vehicleNo } = useBookingStore()

  if (!selectedPackage || !selectedDate || !selectedTime) return null

  const rows = [
    { icon: PackageIcon, label: 'Pakej', value: selectedPackage.name },
    { icon: Calendar, label: 'Tarikh', value: formatDate(selectedDate) },
    { icon: Clock, label: 'Masa', value: selectedTime },
    { icon: User, label: 'Nama', value: customerName },
    { icon: Car, label: 'No. Kenderaan', value: vehicleNo },
  ]

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-3">
        <h3 className="font-heading text-xl text-amber-400">RINGKASAN TEMPAHAN</h3>
      </div>
      <div className="p-5 space-y-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon size={15} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="flex-1 flex justify-between gap-2">
              <span className="text-white/50 text-sm">{label}</span>
              <span className="text-white text-sm font-medium text-right">{value}</span>
            </div>
          </div>
        ))}

        {/* Services */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-white/50 text-sm mb-2">Servis Termasuk:</div>
          <ul className="space-y-1">
            {selectedPackage.services.map((s) => (
              <li key={s.id} className="text-white/80 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
          <span className="text-white/70 font-medium">Jumlah Bayaran</span>
          <span className="font-heading text-2xl text-amber-400">{formatPrice(selectedPackage.price)}</span>
        </div>
      </div>
    </div>
  )
}
