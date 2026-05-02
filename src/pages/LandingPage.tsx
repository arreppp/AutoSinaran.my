import { Link } from 'react-router-dom'
import { CheckCircle2, Star, Zap, ShieldCheck, CalendarCheck, ChevronRight, MapPin, Phone, MessageCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePackages } from '@/hooks/usePackages'
import { formatPrice } from '@/lib/utils'

export default function LandingPage() {
  const { activePackages } = usePackages()

  return (
    <div className="min-h-screen bg-[#0A1628] text-white font-body">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f36] to-[#0A1628]" />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 text-amber-400 border-amber-400/40 text-xs uppercase tracking-widest">
            Bengkel Pilihan E-Hailing
          </Badge>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl mb-4 tracking-wide">
            AUTO{' '}
            <span className="text-amber-400">SINARAN</span>
          </h1>
          <p className="text-xl sm:text-2xl font-heading text-white/80 mb-3 tracking-wide">
            JAGA KERETA, JAGA REZEKI
          </p>
          <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Servis profesional untuk pemandu Grab, AirAsia MOVE, inDrive & semua platform e-hailing. Tempah online, bayar mudah, terima resit terus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base font-bold">
              <Link to="/book">
                Tempah Sekarang <ChevronRight size={18} className="ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#packages">Lihat Pakej</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> Harga Telus</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> Tempahan Online 24/7</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> Bayaran Selamat</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-[#0d1f36]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-2">KENAPA PILIH KAMI?</h2>
          <p className="text-center text-white/50 mb-10 text-sm">Kami faham keperluan pemandu e-hailing</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: 'Harga Telus', desc: 'Tiada caj tersembunyi. Harga tetap, pakej jelas.' },
              { icon: Zap, title: 'Servis Pantas', desc: 'Siap dalam masa yang dijanjikan. Hormati masa anda.' },
              { icon: Star, title: 'Pakar E-Hailing', desc: 'Kami faham keperluan kereta yang digunakan setiap hari.' },
              { icon: CalendarCheck, title: 'Tempah Online', desc: 'Pilih masa, bayar, dan datang. Semudah itu.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <h3 className="font-heading text-lg mb-1">{title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-2">PAKEJ SERVIS</h2>
          <p className="text-center text-white/50 mb-10 text-sm">Pilih pakej yang sesuai dengan keperluan anda</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-xl border p-6 flex flex-col transition-all hover:scale-[1.02] ${
                  pkg.isMostPopular
                    ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 to-transparent'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {pkg.isMostPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="text-xs px-3">⭐ Paling Popular</Badge>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-heading text-2xl">{pkg.name}</h3>
                  {pkg.description && <p className="text-white/50 text-xs mt-1">{pkg.description}</p>}
                </div>
                <div className="mb-4">
                  <span className="font-heading text-4xl text-amber-400">{formatPrice(pkg.price)}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.services.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 size={14} className="text-amber-500 shrink-0" />
                      {s.name}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={pkg.isMostPopular ? 'default' : 'outline'} className="w-full">
                  <Link to="/book">Tempah Sekarang</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-[#0d1f36]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-2">CARA TEMPAHAN</h2>
          <p className="text-center text-white/50 mb-10 text-sm">3 langkah mudah, selesai dalam minit</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Pilih Pakej', desc: 'Semak senarai servis dan pilih pakej yang sesuai dengan keperluan anda.' },
              { step: '02', title: 'Pilih Tarikh & Masa', desc: 'Pilih tarikh dan slot masa yang masih ada. Isikan maklumat kenderaan anda.' },
              { step: '03', title: 'Bayar & Selesai', desc: 'Bayar secara online melalui BillPlz. Terima resit dan datang pada masa yang ditetapkan.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10">
                <div className="font-heading text-5xl text-amber-400/30 mb-2">{step}</div>
                <h3 className="font-heading text-xl mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/book">Mulakan Tempahan <ChevronRight size={18} className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-2">LOKASI & HUBUNGI</h2>
          <p className="text-center text-white/50 mb-10 text-sm">Datang terus atau hubungi kami dahulu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <MapPin className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Alamat</div>
                  <div className="text-white/60 text-sm">No 81-83 Jalan LP1A/2 Taman Lestari Perdana, Seri Kembangan, Malaysia</div>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <Phone className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">Telefon</div>
                  <a href="tel:+60389455143" className="text-white/60 text-sm hover:text-amber-400">+60 10-306 4816</a>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <MessageCircle className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">WhatsApp</div>
                  <a
                    href="https://wa.me/60103064816?text=Salam%2C%20saya%20ingin%20bertanya%20tentang%20servis%20Auto%20Sinaran"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 text-sm hover:text-amber-400"
                  >
                    Chat dengan kami
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 h-64 md:h-auto">
              <iframe
                src="https://maps.google.com/maps?q=No+81-83+Jalan+LP1A%2F2+Taman+Lestari+Perdana+Seri+Kembangan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '250px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Auto Sinaran Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
