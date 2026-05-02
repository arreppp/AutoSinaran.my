import { useEffect } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { MOCK_PACKAGES } from '@/lib/mockData'
import type { Package } from '@/types'

export function usePackages() {
  const { packages, setPackages } = useAdminStore()

  useEffect(() => {
    if (packages.length === 0) {
      setPackages(MOCK_PACKAGES)
    }
  }, [packages.length, setPackages])

  const activePackages = packages.filter((p: Package) => p.isActive)
  return { packages, activePackages }
}
