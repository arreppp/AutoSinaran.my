import { CheckCircle2, Star, AlertCircle, Wrench, Clock, Share2, MessageCircle, MapPin, Phone } from 'lucide-react'
import { useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const WA_NUMBER = '60103064816'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Salam%2C%20saya%20nak%20semak%20slot%20servis%20Auto%20Sinaran`

const packages = [
  { id: 1, name: 'Pakej Petronas Syntium 3000 5w30', desc: 'Oil filter, gasket & labour', price: 'RM199', popular: true, image: '/3000.jpeg' },
  { id: 2, name: 'Pakej Petronas Syntium 800 10w40', desc: 'Oil filter, gasket & labour', price: 'RM169', popular: false, image: '/800.jpeg' },
  { id: 5, name: 'Pakej Servis Air-Cond', desc: 'Air filter (blow), vacuum, recharge, top-up gas & labour', price: 'RM59', popular: false, image: '/aircond.jpeg', horizontal: true },
]

const displayPackages = [
  { id: 3, name: 'Pakej Brake Pad', desc: 'Termasuk labour', price: 'Dari RM90' },
  { id: 4, name: 'Pakej Top Overhaul', desc: 'Termasuk labour', price: 'Dari RM499' },
]

const problems = [
  { no: '01', text: 'Kerap rosak' },
  { no: '02', text: 'Upah mahal' },
  { no: '03', text: 'Hilang income' },
]

const solutions = [
  { icon: Wrench, text: 'Alat ganti tulen, OEM & kualiti kerja' },
  { icon: Star, text: 'Harga berpatutan' },
  { icon: Clock, text: 'Servis pantas' },
]

const testimonials = [
  { text: '2 jam siap, servis laju. Terus boleh jalan. Tak payah tunggu lama, terus boleh pickup penumpang.', author: 'Driver Grab', platform: 'Grab' },
  { text: 'Harga sangat berpatutan, jimat berbanding bengkel lain. Sekarang saya datang sini je setiap servis.', author: 'Driver AirAsia MOVE', platform: 'AirAsia MOVE' },
  { text: 'Staff mesra, kerja kemas. Kereta saya dah rasa macam baru balik dari servis. Sangat puas hati!', author: 'Driver inDrive', platform: 'inDrive' },
  { text: 'Slot mudah, datang pagi terus masuk. Tak payah tunggu berlama-lama macam bengkel biasa.', author: 'Driver Grab', platform: 'Grab' },
  { text: 'Minyak hitam tukar, filter tukar, semua dalam masa 2 jam. Harga pun tak tipu. Recommended!', author: 'Driver Maxim', platform: 'Maxim' },
  { text: 'Dah 3 kali datang sini. Servis konsisten, harga sama je tak naik-naik. Best sangat!', author: 'Driver Grab', platform: 'Grab' },
  { text: 'Lepas servis kat sini, kereta rasa lebih ringan dan jimat minyak sikit. Memang berbaloi!', author: 'Driver AirAsia MOVE', platform: 'AirAsia MOVE' },
]

function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="overflow-hidden w-screen">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div ref={trackRef} className="marquee-track">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="w-72 shrink-0 mx-3 p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
            </div>
            <div>
              <p className="text-white/55 text-xs">— {t.author}</p>
              <span className="text-amber-400/70 text-xs">{t.platform}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Auto Sinaran – Bengkel E-Hailing',
        text: 'Servis kereta pantas & harga berpatutan untuk driver e-hailing! Siap 2-3 jam.',
        url: window.location.origin,
      })
    } else {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Auto Sinaran – Bengkel pilihan driver e-hailing! Siap 2-3 jam, harga berpatutan. ${window.location.origin}`)}`
      window.open(shareUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1515] text-white font-body">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/faci7.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[#0A1515]/60" />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00A19C 0%, transparent 70%)' }}
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
            Servis profesional untuk pemandu Grab, AirAsia MOVE, inDrive &amp; semua platform e-hailing. Tempah, bayar, terima resit terus.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" className="text-base font-bold w-full sm:w-auto">
                Semak Slot Harini
              </Button>
            </a>
            <Button size="lg" variant="outline" asChild>
              <a href="#packages">Lihat Pakej</a>
            </Button>
          </div>

          {/* WhatsApp + Urgency */}
          <p className="text-white/60 text-sm mb-1">
            Chat WhatsApp: <span className="text-amber-400 font-semibold">010-306 4816</span>
          </p>
          <p className="blink text-yellow-400 font-heading text-base sm:text-lg tracking-wide mb-6">
            TAWARAN 5% DISKAUN BOOKING SLOT SECARA ONLINE
          </p>

          {/* 3 Trust Points */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> Siap 2-3 jam</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> Special harga untuk e-hailing</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-500" /> 1200+ kereta sudah servis</span>
          </div>
        </div>
      </section>

      {/* Masalah Driver */}
      <section className="py-14 px-4 bg-[#0D1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2">MASALAH DRIVER E-HAILING</h2>
          <p className="text-center text-white/50 mb-8 text-sm">Kami faham cabaran anda setiap hari</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {problems.map(({ no, text }) => (
              <div key={no} className="flex items-center gap-4 p-5 rounded-xl border border-red-500/20 bg-red-500/5">
                <span className="font-heading text-3xl text-red-400/40">{no}</span>
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solusi */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2">SOLUSI KAMI</h2>
          <p className="text-center text-white/50 mb-8 text-sm">Satu tempat, semua selesai</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {solutions.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <p className="text-white/80 text-sm font-medium leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Tempah */}
      <section id="how-it-works" className="py-14 px-4 bg-[#0D1E1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2">CARA TEMPAH</h2>
          <p className="text-center text-white/50 mb-10 text-sm">Mudah, cepat & tanpa kelam-kabut</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'WhatsApp Kami', desc: 'Hubungi kami melalui WhatsApp untuk semak slot yang available.' },
              { step: '02', title: 'Datang Ke Bengkel', desc: 'Tiba pada waktu yang ditetapkan. Tiada tunggu lama.' },
              { step: '03', title: 'Kereta Siap & Jalan', desc: 'Servis selesai dalam 2–3 jam. Terima resit terus.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <span className="font-heading text-5xl text-amber-400/20 mb-3">{step}</span>
                <h3 className="font-heading text-lg mb-2 text-amber-400">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="blink text-center text-yellow-400 font-heading text-lg sm:text-xl tracking-wide mt-8">
            DAPATKAN TAWARAN 5% DISKAUN BOOKING SLOT SECARA ONLINE
            <br />
            010 306 4816
          </p>
          <div className="flex justify-center mt-4">
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" className="font-bold">
                <MessageCircle size={18} className="mr-2" />
                Mula Tempah Sekarang
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pakej Popular */}
      <section id="packages" className="py-14 px-4 bg-[#0A1515]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2">PAKEJ POPULAR</h2>
          <p className="text-center text-white/50 mb-8 text-sm">Harga termasuk tukar minyak + servis asas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-xl border p-5 transition-all ${pkg.horizontal ? 'sm:col-span-2' : ''} ${
                  pkg.popular
                    ? 'border-amber-500 bg-gradient-to-b from-amber-500/15 to-transparent'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-4">
                    <Badge className="text-xs px-3">⭐ Paling Popular</Badge>
                  </span>
                )}
                {pkg.horizontal ? (
                  <div className="flex gap-4 items-center">
                    <div className="w-1/2 shrink-0 rounded-lg overflow-hidden bg-white/5">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h3 className="font-heading text-lg leading-snug">{pkg.name}</h3>
                      <p className="text-white/50 text-xs">{pkg.desc}</p>
                      <span className="font-heading text-2xl text-amber-400 mt-2">{pkg.price}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-white/5 flex items-center justify-center">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-heading text-lg leading-snug">{pkg.name}</h3>
                        <p className="text-white/50 text-xs mt-0.5">{pkg.desc}</p>
                      </div>
                      <span className="font-heading text-2xl text-amber-400 shrink-0 ml-4">{pkg.price}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {displayPackages.map((pkg) => (
              <div key={pkg.id} className="relative rounded-xl border border-white/10 bg-white/5 p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-lg">{pkg.name}</h3>
                  <p className="text-white/50 text-xs mt-0.5">{pkg.desc}</p>
                </div>
                <span className="font-heading text-xl text-amber-400 shrink-0 ml-4">{pkg.price}</span>
              </div>
            ))}
          </div>

          <p className="blink text-center text-yellow-400 font-heading text-lg sm:text-xl tracking-wide mt-8">
            DAPATKAN TAWARAN 5% DISKAUN BOOKING SLOT SECARA ONLINE
            <br />
            010 306 4816
          </p>
          <p className="text-center text-amber-400 font-heading text-xl mt-4 tracking-wide">
            HANYA 20 SLOT SEHARI
          </p>
          <div className="flex justify-center mt-4">
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" className="font-bold">
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Sekarang
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14">
        <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2 px-4">APA KATA DRIVER</h2>
        <p className="text-center text-white/50 mb-8 text-sm px-4">Kepuasan pelanggan adalah keutamaan kami</p>
        <TestimonialCarousel />
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-500/10 via-[#0D1E1E] to-[#0A1515]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl mb-3">NAK JIMAT KOS SERVIS?</h2>
          <p className="text-white/60 text-sm mb-8">Klik WhatsApp sekarang dan dapatkan harga terbaik untuk driver e-hailing</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              <Share2 size={16} />
              Kongsi Kepada Rakan
            </button>
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button size="lg" className="font-bold w-full sm:w-auto">
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Sekarang
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Facilities Gallery */}
      <section className="py-14 px-4 bg-[#0D1E1E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-center mb-2">KEMUDAHAN BENGKEL</h2>
          <p className="text-center text-white/50 mb-8 text-sm">Lihat sendiri kemudahan dan persekitaran bengkel kami</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-square">
                <img
                  src={`/faci${i + 1}.jpeg`}
                  alt={`Kemudahan bengkel ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl text-center mb-2">LOKASI &amp; HUBUNGI</h2>
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
                  <a href="tel:+60103064816" className="text-white/60 text-sm hover:text-amber-400">010-306 4816</a>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <MessageCircle className="text-amber-400 shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-medium mb-1">WhatsApp</div>
                  <a
                    href={WA_LINK}
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
