import React, { useCallback } from 'react'
import { clsx } from 'clsx'
import { CalendarEvent } from './CalendarView.types'
import { formatDay, isToday as isTodayUtil } from '@/utils/date.utils'
import { getEventsForDay } from '@/utils/event.utils'

interface CalendarCellProps {
  date: Date
  events: CalendarEvent[]
  isCurrentMonth: boolean
  isSelected: boolean
  onClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(({
  date,
  events,
  isCurrentMonth,
  isSelected,
  onClick,
  onEventClick
}) => {
  const isToday = isTodayUtil(date)
  const dayEvents = getEventsForDay(events, date)
  const displayEvents = dayEvents.slice(0, 2) // Show only 2 events for cleaner look
  const hasMoreEvents = dayEvents.length > 2

  const handleClick = useCallback(() => {
    onClick(date)
  }, [date, onClick])

  const handleEventClick = useCallback((event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    onEventClick(event)
  }, [onEventClick])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${formatDay(date)} ${isCurrentMonth ? 'current month' : 'adjacent month'}. ${dayEvents.length} events.`}
      className={clsx(
        'min-h-[120px] p-2 border-b border-r border-neutral-100 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:z-10',
        {
          'bg-white hover:bg-neutral-50': isCurrentMonth && !isSelected,
          'bg-neutral-50 text-neutral-400': !isCurrentMonth,
          'bg-primary-50 border-primary-200': isSelected,
          'border-r-0 last:border-r-0': (days.indexOf(date) + 1) % 7 === 0, // Remove right border for last column
        }
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Date indicator */}
      <div className="flex justify-between items-center mb-1">
        <span className={clsx(
          'text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full transition-colors',
          {
            'text-neutral-900': isCurrentMonth && !isToday,
            'text-neutral-400': !isCurrentMonth,
            'text-primary-600 bg-primary-500/10': isToday && !isSelected,
            'text-primary-700 bg-primary-500/20': isToday && isSelected,
          }
        )}>
          {formatDay(date)}
        </span>
        
        {dayEvents.length > 0 && (
          <span className={clsx(
            'text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center',
            {
              'bg-neutral-200 text-neutral-700': isCurrentMonth,
              'bg-neutral-300 text-neutral-500': !isCurrentMonth,
            }
          )}>
            {dayEvents.length}
          </span>
        )}
      </div>
      
      {/* Events */}
      <div className="space-y-1">
        {displayEvents.map(event => (
          <div
            key={event.id}
            className="text-xs px-2 py-1 rounded text-white cursor-pointer hover:opacity-90 transition-opacity truncate"
            style={{ 
              backgroundColor: event.color || '#3b82f6',
              borderLeft: `3px solid ${event.color || '#3b82f6'}`
            }}
            onClick={(e) => handleEventClick(event, e)}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
        {hasMoreEvents && (
          <button 
            className="text-xs text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:underline w-full text-left px-2 py-1"
            onClick={handleClick}
          >
            +{dayEvents.length - 2} more
          </button>
        )}
      </div>
    </div>
  )
})

CalendarCell.displayName = 'CalendarCell'

// Helper to get day index (you'll need to calculate this based on the grid)
const days = Array.from({ length: 42 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i)
  return date
})