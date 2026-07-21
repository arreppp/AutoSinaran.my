import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const WA_NUMBER = '60103064816'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Salam%2C%20saya%20nak%20semak%20slot%20servis%20Auto%20Sinaran`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { href: '/', label: 'Laman Utama' },
    { href: '/#packages', label: 'Pakej' },
    { href: '/#how-it-works', label: 'Cara Tempah' },
    { href: '/#contact', label: 'Hubungi Kami' },
  ]

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl tracking-wide leading-none">
          AUTO <span className="text-amber-400">SINARAN</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === l.href ? 'text-amber-400' : 'text-white/70 hover:text-white'
              )}
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href={WA_LINK} target="_blank" rel="noreferrer">Tempah Sekarang</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="w-full" asChild>
            <a href={WA_LINK} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Tempah Sekarang</a>
          </Button>
        </div>
      )}
    </nav>
  )
}
