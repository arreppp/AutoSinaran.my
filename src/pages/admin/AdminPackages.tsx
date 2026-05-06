import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { usePackages } from '@/hooks/usePackages'
import { formatPrice, generateId } from '@/lib/utils'
import type { Package } from '@/types'

const schema = z.object({
  name: z.string().min(1, 'Nama pakej diperlukan'),
  description: z.string().optional(),
  price: z.coerce.number().min(1, 'Harga mesti lebih dari 0'),
  services: z.array(z.object({ name: z.string().min(1, 'Nama servis diperlukan') })).min(1, 'Sekurang-kurangnya 1 servis'),
  isActive: z.boolean(),
  isMostPopular: z.boolean(),
})

type PackageForm = z.infer<typeof schema>

interface FormDialogProps {
  pkg?: Package
  onClose: () => void
  onSave: (data: Omit<Package, 'id' | 'createdAt'>, pkg?: Package) => Promise<void>
}

function PackageFormDialog({ pkg, onClose, onSave }: FormDialogProps) {
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm<PackageForm>({
    resolver: zodResolver(schema),
    defaultValues: pkg
      ? { name: pkg.name, description: pkg.description ?? '', price: pkg.price, services: pkg.services.map((s) => ({ name: s.name })), isActive: pkg.isActive, isMostPopular: pkg.isMostPopular ?? false }
      : { name: '', description: '', price: 0, services: [{ name: '' }], isActive: true, isMostPopular: false },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'services' })

  async function onSubmit(data: PackageForm) {
    setSaving(true)
    try {
      const services = data.services.map((s, i) => ({
        id: pkg?.services[i]?.id ?? generateId(),
        name: s.name,
      }))
      await onSave({ ...data, services }, pkg)
      onClose()
    } catch {
      alert('Gagal menyimpan pakej. Sila cuba lagi.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Nama Pakej</Label>
        <Input {...register('name')} placeholder="Pakej Asas" className="mt-1" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label>Penerangan (pilihan)</Label>
        <Input {...register('description')} placeholder="Penerangan ringkas pakej" className="mt-1" />
      </div>
      <div>
        <Label>Harga (RM)</Label>
        <Input type="number" {...register('price')} placeholder="80" className="mt-1" />
        {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Senarai Servis</Label>
          <Button type="button" size="sm" variant="outline" onClick={() => append({ name: '' })}>
            <Plus size={14} className="mr-1" /> Tambah
          </Button>
        </div>
        {fields.map((field, i) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <Input {...register(`services.${i}.name`)} placeholder={`Servis ${i + 1}`} />
            {fields.length > 1 && (
              <Button type="button" size="icon" variant="destructive" onClick={() => remove(i)}>
                <X size={14} />
              </Button>
            )}
          </div>
        ))}
        {errors.services && <p className="text-red-400 text-xs mt-1">Sekurang-kurangnya 1 servis diperlukan</p>}
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch id="isActive" {...register('isActive')} defaultChecked={pkg?.isActive ?? true} />
          <Label htmlFor="isActive">Aktif</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="isMostPopular" {...register('isMostPopular')} defaultChecked={pkg?.isMostPopular ?? false} />
          <Label htmlFor="isMostPopular">Paling Popular</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={saving}>Batal</Button>
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
          {pkg ? 'Kemaskini' : 'Tambah Pakej'}
        </Button>
      </div>
    </form>
  )
}

export default function AdminPackages() {
  const { packages, addPackage, updatePackage, deletePackage, loading } = usePackages()
  const [editPkg, setEditPkg] = useState<Package | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleSave(data: Omit<Package, 'id' | 'createdAt'>, pkg?: Package) {
    if (pkg) {
      await updatePackage({ ...pkg, ...data })
    } else {
      await addPackage(data)
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    try {
      await deletePackage(id)
      setDeleteId(null)
    } catch {
      alert('Gagal memadam pakej. Sila cuba lagi.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-heading text-3xl">PAKEJ SERVIS</h1>
          <p className="text-white/50 text-sm mt-1">Urus pakej yang ditawarkan kepada pelanggan</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-2" /> Tambah Pakej</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Pakej Baru</DialogTitle></DialogHeader>
            <PackageFormDialog onClose={() => setShowAdd(false)} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      {loading && <p className="text-white/40 text-sm">Memuatkan pakej...</p>}

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Nama Pakej', 'Servis', 'Harga', 'Status', 'Tindakan'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-white/40 font-medium text-xs uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{pkg.name}</div>
                    {pkg.isMostPopular && <Badge className="text-xs mt-1">Paling Popular</Badge>}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-xs">{pkg.services.length} servis</td>
                  <td className="px-4 py-3 text-amber-400 font-heading text-base">{formatPrice(pkg.price)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={pkg.isActive ? 'success' : 'secondary'}>
                      {pkg.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Dialog open={editPkg?.id === pkg.id} onOpenChange={(o) => !o && setEditPkg(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary" onClick={() => setEditPkg(pkg)}>
                            <Pencil size={13} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Pakej</DialogTitle></DialogHeader>
                          {editPkg && (
                            <PackageFormDialog
                              pkg={editPkg}
                              onClose={() => setEditPkg(null)}
                              onSave={handleSave}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog open={deleteId === pkg.id} onOpenChange={(o) => !o && setDeleteId(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive" onClick={() => setDeleteId(pkg.id)}>
                            <Trash2 size={13} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Padam Pakej</DialogTitle></DialogHeader>
                          <p className="text-white/70 text-sm">Adakah anda pasti ingin memadam <strong>{pkg.name}</strong>? Tindakan ini tidak boleh dibatalkan.</p>
                          <div className="flex gap-3 mt-4">
                            <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1" disabled={deleting}>Batal</Button>
                            <Button variant="destructive" onClick={() => handleDelete(pkg.id)} className="flex-1" disabled={deleting}>
                              {deleting ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
                              Padam
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && packages.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-white/30">Tiada pakej lagi</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
