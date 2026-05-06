import { DayPicker } from 'react-day-picker'
import { startOfToday, isSunday, parseISO } from 'date-fns'
import { useTimeSlots } from '@/hooks/useTimeSlots'
import { cn } from '@/lib/utils'

interface Props {
  selectedDate: string | null
  selectedTime: string | null
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

export default function DateTimePicker({ selectedDate, selectedTime, onDateChange, onTimeChange }: Props) {
  const { slots, loading } = useTimeSlots(selectedDate)

  function handleDaySelect(day: Date | undefined) {
    if (!day) return
    const iso = day.toISOString().split('T')[0]
    onDateChange(iso)
  }

  const disabledDays = [
    { before: startOfToday() },
    (day: Date) => isSunday(day),
  ]

  const selected = selectedDate ? parseISO(selectedDate) : undefined

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleDaySelect}
          disabled={disabledDays}
          classNames={{
            root: 'bg-white/5 border border-white/10 rounded-xl p-4',
            months: 'flex flex-col',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center mb-2',
            caption_label: 'text-sm font-medium text-white',
            nav: 'space-x-1 flex items-center',
            nav_button: 'h-7 w-7 bg-transparent text-white/60 hover:text-white rounded-md hover:bg-white/10 flex items-center justify-center transition-colors',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell: 'text-white/40 rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center',
            row: 'flex w-full mt-2',
            cell: 'h-9 w-9 text-center text-sm p-0 relative',
            day: 'h-9 w-9 p-0 font-normal text-white rounded-md hover:bg-amber-500/20 hover:text-amber-300 transition-colors flex items-center justify-center',
            day_selected: 'bg-amber-500 text-white font-bold hover:bg-amber-500 hover:text-white',
            day_today: 'text-amber-400 font-bold',
            day_disabled: 'text-white/20 hover:bg-transparent hover:text-white/20 cursor-not-allowed',
            day_outside: 'text-white/20',
          }}
        />
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-3">Pilih Masa</h3>
          {loading ? (
            <div className="text-white/40 text-sm">Memuat slot masa...</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => {
                const isBooked = slot.status === 'booked' || slot.status === 'blocked'
                const isSelected = selectedTime === slot.time
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={isBooked}
                    onClick={() => !isBooked && onTimeChange(slot.time)}
                    className={cn(
                      'py-2.5 rounded-lg text-sm font-medium border transition-all',
                      isBooked
                        ? 'border-red-900/50 bg-red-900/20 text-red-400/60 cursor-not-allowed line-through'
                        : isSelected
                        ? 'border-amber-500 bg-amber-500 text-white font-bold'
                        : 'border-white/20 bg-white/5 text-white hover:border-amber-500/50 hover:bg-amber-500/10'
                    )}
                  >
                    {slot.time}
                    {isBooked && <div className="text-xs -mt-0.5 no-underline text-red-400/60" style={{ textDecoration: 'none' }}>Penuh</div>}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
