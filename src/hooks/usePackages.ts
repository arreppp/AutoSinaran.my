import { useState, useEffect } from 'react'
import { useAdminStore } from '@/store/adminStore'
import {
  fetchPackages,
  createPackage as strapiCreate,
  updatePackage as strapiUpdate,
  deletePackage as strapiDelete,
} from '@/lib/strapi'
import type { Package } from '@/types'

export function usePackages() {
  const { packages, setPackages, addPackage: storeAdd, updatePackage: storeUpdate, deletePackage: storeDelete } = useAdminStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchPackages()
      .then(setPackages)
      .catch(() => setError('Gagal memuatkan pakej dari pelayan.'))
      .finally(() => setLoading(false))
  }, [setPackages])

  const activePackages = packages.filter((p: Package) => p.isActive)

  async function addPackage(pkg: Omit<Package, 'id' | 'createdAt'>) {
    const created = await strapiCreate(pkg)
    storeAdd(created)
    return created
  }

  async function updatePackage(pkg: Package) {
    const { id, createdAt: _c, ...rest } = pkg
    const updated = await strapiUpdate(id, rest)
    storeUpdate(updated)
  }

  async function deletePackage(id: string) {
    await strapiDelete(id)
    storeDelete(id)
  }

  return { packages, activePackages, loading, error, addPackage, updatePackage, deletePackage }
}
