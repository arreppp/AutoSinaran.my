import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <img src="/logo.svg" alt="Auto Sinaran" className="h-8 mb-4" />
          <p className="text-white/60 text-sm leading-relaxed">
            Bengkel servis pilihan untuk pemandu e-hailing. Perkhidmatan berkualiti, harga telus, masa dihormati.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg text-amber-400 mb-4">PAUTAN PANTAS</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/', label: 'Laman Utama' },
              { href: '/book', label: 'Tempah Sekarang' },
              { href: '/#packages', label: 'Pakej Servis' },
              { href: '/admin/login', label: 'Portal Admin' },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-white/60 hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-amber-400 mb-4">HUBUNGI KAMI</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-white/60">
              <MapPin size={16} className="mt-0.5 shrink-0 text-amber-500" />
              <span>No 81-83 Jalan LP1A/2 Taman Lestari Perdana, Seri Kembangan, Malaysia</span>
            </li>
            <li className="flex items-center gap-2 text-white/60">
              <Phone size={16} className="shrink-0 text-amber-500" />
              <a href="https://wa.me/60103064816" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                +60 12-345 6789
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/60">
              <Clock size={16} className="shrink-0 text-amber-500" />
              <span>Isnin–Sabtu: 9:00 pagi – 6:00 petang</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Auto Sinaran. Hak cipta terpelihara.</span>
        <span>Dibina dengan ❤ untuk pemandu e-hailing Malaysia</span>
      </div>
    </footer>
  )
}
