import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, CalendarDays, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAdminStore } from '@/store/adminStore'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/packages', icon: Package, label: 'Pakej Servis' },
  { to: '/admin/bookings', icon: CalendarDays, label: 'Tempahan' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = useAdminStore((s) => s.logout)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#0A1515] text-white flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-60 bg-[#060f0f] border-r border-white/10 flex flex-col transition-transform duration-200',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
          <img src="/logo.svg" alt="Auto Sinaran" className="h-7 w-auto" />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors w-full"
          >
            <LogOut size={17} />
            Log Keluar
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 md:ml-60 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#0A1515] border-b border-white/10 px-4 h-14 flex items-center gap-3">
          <button
            className="md:hidden text-white p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-white/50 text-sm">Portal Pengurusan</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
