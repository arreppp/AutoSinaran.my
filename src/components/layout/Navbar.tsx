import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Auto Sinaran" className="h-8 w-auto" />
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
          <Button asChild size="sm">
            <Link to="/book">Tempah Sekarang</Link>
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
          <Button asChild size="sm" className="w-full">
            <Link to="/book" onClick={() => setOpen(false)}>Tempah Sekarang</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
