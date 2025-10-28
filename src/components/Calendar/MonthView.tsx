import React from 'react'
import { CalendarEvent } from './CalendarView.types'
import { getDaysInMonth, isSameMonthAs, isSameDayAs } from '@/utils/date.utils'
import { CalendarCell } from './CalendarCell'

interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  selectedDate: Date | null
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthView: React.FC<MonthViewProps> = React.memo(({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick
}) => {
  const days = getDaysInMonth(currentDate)

  return (
    <div className="w-full">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-neutral-200">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-4 text-sm font-medium text-neutral-500 text-start"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => (
          <CalendarCell
            key={index}
            date={date}
            events={events}
            isCurrentMonth={isSameMonthAs(date, currentDate)}
            isSelected={selectedDate ? isSameDayAs(date, selectedDate) : false}
            onClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
})

MonthView.displayName = 'MonthView'