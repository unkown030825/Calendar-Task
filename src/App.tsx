import { CalendarView } from '@/components/Calendar/CalendarView'

const sampleEvents = [
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
]

function App() {
  const handleEventAdd = (event: any) => {
    console.log('Event added:', event)
  }

  const handleEventUpdate = (id: string, updates: any) => {
    console.log('Event updated:', id, updates)
  }

  const handleEventDelete = (id: string) => {
    console.log('Event deleted:', id)
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Calendar View</h1>
        <CalendarView
          events={sampleEvents}
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