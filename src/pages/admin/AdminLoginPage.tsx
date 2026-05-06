import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminStore } from '@/store/adminStore'

const schema = z.object({
  username: z.string().min(1, 'Username diperlukan'),
  password: z.string().min(1, 'Kata laluan diperlukan'),
})

type LoginForm = z.infer<typeof schema>

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const login = useAdminStore((s) => s.login)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 400))
    const ok = login(data.username, data.password)
    if (ok) {
      navigate('/admin/dashboard', { replace: true })
    } else {
      setError('Username atau kata laluan salah.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A1515] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="Auto Sinaran" className="h-10 mx-auto mb-4" />
          <h1 className="font-heading text-3xl">PORTAL ADMIN</h1>
          <p className="text-white/50 text-sm mt-1">Log masuk untuk mengurus tempahan</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register('username')} placeholder="admin" className="mt-1" autoComplete="username" />
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Kata Laluan</Label>
            <Input id="password" type="password" {...register('password')} placeholder="••••••••" className="mt-1" autoComplete="current-password" />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <><Loader2 size={16} className="animate-spin mr-2" /> Log masuk...</> : 'Log Masuk'}
          </Button>
        </form>

        <p className="text-center text-white/30 text-xs mt-4">
          Demo: admin / sinaran2024
        </p>
      </div>
    </div>
  )
}
