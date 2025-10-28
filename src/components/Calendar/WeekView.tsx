import React from 'react'
import { clsx } from 'clsx'
import { CalendarEvent } from './CalendarView.types'
import { getWeekDays, getTimeSlots, formatTime, isSameDayAs, formatDate } from '@/utils/date.utils'
import { getEventsForDay } from '@/utils/event.utils'

interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  selectedDate: Date | null
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export const WeekView: React.FC<WeekViewProps> = React.memo(({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick
}) => {
  const weekDays = getWeekDays(currentDate)
  const timeSlots = getTimeSlots(60) // 1-hour intervals

  const getEventPosition = (event: CalendarEvent, dayIndex: number) => {
    const dayStart = new Date(weekDays[dayIndex])
    dayStart.setHours(0, 0, 0, 0)
    
    const dayEnd = new Date(weekDays[dayIndex])
    dayEnd.setHours(23, 59, 59, 999)

    const eventStart = event.startDate < dayStart ? dayStart : event.startDate
    const eventEnd = event.endDate > dayEnd ? dayEnd : event.endDate

    const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes()
    const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes()
    const duration = Math.max(endMinutes - startMinutes, 30) // Minimum 30min height

    return {
      top: `${(startMinutes / 1440) * 100}%`,
      height: `${(duration / 1440) * 100}%`,
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Compact Week day headers */}
      <div className="grid grid-cols-8 border-b border-neutral-200">
        <div className="p-3 border-r border-neutral-200"></div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={clsx(
              'p-3 text-center cursor-pointer transition-colors border-r border-neutral-200 last:border-r-0',
              {
                'bg-primary-50 text-primary-700': selectedDate && isSameDayAs(day, selectedDate),
                'hover:bg-neutral-50': !selectedDate || !isSameDayAs(day, selectedDate),
              }
            )}
            onClick={() => onDateClick(day)}
          >
            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
              {formatDate(day, 'EEE')}
            </div>
            <div className={clsx(
              'text-lg font-semibold mt-1',
              {
                'text-primary-600': selectedDate && isSameDayAs(day, selectedDate),
                'text-neutral-900': !selectedDate || !isSameDayAs(day, selectedDate),
              }
            )}>
              {formatDate(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex-1 grid grid-cols-8 overflow-auto scrollbar-thin">
        {/* Time labels */}
        <div className="border-r border-neutral-200">
          {timeSlots.filter((_, index) => index % 1 === 0).map((time, index) => (
            <div
              key={index}
              className="h-16 border-b border-neutral-100 flex items-start justify-end pr-3 pt-2"
            >
              <span className="text-xs text-neutral-500 font-medium">
                {formatTime(time)}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(events, day)
          
          return (
            <div
              key={dayIndex}
              className="relative border-r border-neutral-200 last:border-r-0"
            >
              {timeSlots.map((time, timeIndex) => (
                <div
                  key={timeIndex}
                  className="h-16 border-b border-neutral-100 cursor-pointer hover:bg-neutral-50/50 transition-colors"
                  onClick={() => onDateClick(day)}
                />
              ))}
              
              {/* Events */}
              {dayEvents.map((event, eventIndex) => {
                const position = getEventPosition(event, dayIndex)
                return (
                  <div
                    key={eventIndex}
                    className="absolute left-1 right-1 text-xs p-2 rounded-lg text-white cursor-pointer hover:opacity-90 transition-all shadow-sm"
                    style={{
                      top: position.top,
                      height: position.height,
                      backgroundColor: event.color || '#3b82f6',
                      borderLeft: `3px solid ${event.color ? `${event.color}80` : '#3b82f680'}`
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                    title={`${event.title} - ${formatTime(event.startDate)} to ${formatTime(event.endDate)}`}
                  >
                    <div className="font-medium truncate mb-0.5">{event.title}</div>
                    <div className="truncate opacity-90 text-xs">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
})

WeekView.displayName = 'WeekView'