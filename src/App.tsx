import React, { useState } from 'react'
import { CalendarView } from '@/components/Calendar/CalendarView'
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types'

const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    description: 'Review new component designs',
    startDate: new Date(2024, 0, 15, 14, 0),
    endDate: new Date(2024, 0, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2024, 0, 16, 10, 0),
    endDate: new Date(2024, 0, 16, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
  {
    id: 'evt-4',
    title: 'Development Sprint',
    description: 'Sprint planning and task assignment',
    startDate: new Date(2024, 0, 17, 9, 0),
    endDate: new Date(2024, 0, 17, 17, 0),
    color: '#8b5cf6',
    category: 'Work',
  },
]

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

  const handleEventAdd = (event: CalendarEvent) => {
    console.log('Event added:', event)
    setEvents(prev => [...prev, event])
  }

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    console.log('Event updated:', id, updates)
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ))
  }

  const handleEventDelete = (id: string) => {
    console.log('Event deleted:', id)
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Calendar View Component</h1>
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialView="month"
        />
      </div>
    </div>
  )
}

export default App