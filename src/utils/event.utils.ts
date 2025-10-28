import { CalendarEvent } from '@/components/Calendar/CalendarView.types'
import { isSameDayAs, startOfDay, endOfDay } from './date.utils'

export const filterEventsByDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => 
    isSameDayAs(event.startDate, date) || 
    isSameDayAs(event.endDate, date) ||
    (event.startDate <= endOfDay(date) && event.endDate >= startOfDay(date))
  )
}

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
}

export const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const dayEvents = filterEventsByDate(events, date)
  return sortEventsByTime(dayEvents)
}

export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = []
  
  if (!event.title?.trim()) {
    errors.push('Title is required')
  }
  
  if (event.title && event.title.length > 100) {
    errors.push('Title must be less than 100 characters')
  }
  
  if (event.description && event.description.length > 500) {
    errors.push('Description must be less than 500 characters')
  }
  
  if (!event.startDate) {
    errors.push('Start date is required')
  }
  
  if (!event.endDate) {
    errors.push('End date is required')
  }
  
  if (event.startDate && event.endDate && event.startDate > event.endDate) {
    errors.push('End date must be after start date')
  }
  
  return errors
}

export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const getDefaultEventColor = (): string => {
  return '#3b82f6'
}