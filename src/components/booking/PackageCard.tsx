import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn, formatPrice } from '@/lib/utils'
import type { Package } from '@/types'

interface Props {
  pkg: Package
  selected: boolean
  onSelect: (pkg: Package) => void
}

export default function PackageCard({ pkg, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pkg)}
      className={cn(
        'relative text-left w-full rounded-xl border-2 p-5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
        selected
          ? 'border-amber-500 bg-amber-500/10'
          : 'border-white/10 bg-white/5 hover:border-amber-500/40'
      )}
    >
      {pkg.isMostPopular && (
        <div className="absolute -top-3 left-4">
          <Badge className="text-xs">⭐ Paling Popular</Badge>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-heading text-xl text-white">{pkg.name}</h3>
          {pkg.description && <p className="text-white/50 text-xs mt-0.5">{pkg.description}</p>}
        </div>
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 mt-0.5',
            selected ? 'border-amber-500 bg-amber-500' : 'border-white/30'
          )}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      <div className="mb-3">
        <span className="font-heading text-3xl text-amber-400">{formatPrice(pkg.price)}</span>
      </div>

      <ul className="space-y-1.5">
        {pkg.services.map((s) => (
          <li key={s.id} className="flex items-center gap-2 text-sm text-white/75">
            <CheckCircle2 size={13} className="text-amber-500 shrink-0" />
            {s.name}
          </li>
        ))}
      </ul>
    </button>
  )
}
