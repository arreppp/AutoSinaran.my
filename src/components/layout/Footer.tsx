import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'

const WA_NUMBER = '60103064816'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Salam%2C%20saya%20nak%20semak%20slot%20servis%20Auto%20Sinaran`

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <p className="font-heading text-2xl tracking-wide mb-4">AUTO <span className="text-amber-400">SINARAN</span></p>
          <p className="text-white/60 text-sm leading-relaxed">
            Bengkel servis pilihan untuk pemandu e-hailing. Perkhidmatan berkualiti, harga telus, masa dihormati.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg text-amber-400 mb-4">PAUTAN PANTAS</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white/60 hover:text-amber-400 transition-colors"
              >
                Laman Utama
              </Link>
            </li>
            <li>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="text-white/60 hover:text-amber-400 transition-colors">
                Tempah Sekarang
              </a>
            </li>
            <li>
              <a href="/#packages" className="text-white/60 hover:text-amber-400 transition-colors">
                Pakej Servis
              </a>
            </li>
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
                +60 10-306 4816
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/60">
              <Clock size={16} className="shrink-0 text-amber-500" />
              <span>Isnin–Sabtu: 8:00 pagi – 5:30 petang</span>
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
