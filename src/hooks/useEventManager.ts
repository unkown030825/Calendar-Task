import { useState, useCallback } from 'react'
import { CalendarEvent } from '@/components/Calendar/CalendarView.types'
import { generateEventId, getDefaultEventColor, validateEvent } from '@/utils/event.utils'

export const useEventManager = (
  initialEvents: CalendarEvent[] = [],
  onEventAdd?: (event: CalendarEvent) => void,
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void,
  onEventDelete?: (id: string) => void
) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const errors = validateEvent(eventData)
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateEventId(),
      color: eventData.color || getDefaultEventColor()
    }

    setEvents(prev => [...prev, newEvent])
    onEventAdd?.(newEvent)
    
    return newEvent
  }, [onEventAdd])

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    const eventToUpdate = events.find(event => event.id === id)
    if (!eventToUpdate) {
      throw new Error('Event not found')
    }

    const updatedEvent = { ...eventToUpdate, ...updates }
    const errors = validateEvent(updatedEvent)
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event))
    onEventUpdate?.(id, updates)
    
    return updatedEvent
  }, [events, onEventUpdate])

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    onEventDelete?.(id)
  }, [onEventDelete])

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  }
}