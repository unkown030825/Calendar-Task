import type { Meta, StoryObj } from '@storybook/react'
import { CalendarView } from './CalendarView'
import type { CalendarEvent } from './CalendarView.types'

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarView>

export default meta
type Story = StoryObj<typeof meta>

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
]

const manyEvents: CalendarEvent[] = Array.from({ length: 25 }, (_, i) => ({
  id: `evt-${i + 1}`,
  title: `Event ${i + 1}`,
  description: `Description for event ${i + 1}`,
  startDate: new Date(2024, 0, 15 + Math.floor(i / 5), 9 + (i % 8), 0),
  endDate: new Date(2024, 0, 15 + Math.floor(i / 5), 10 + (i % 8), 0),
  color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
  category: ['Meeting', 'Work', 'Personal', 'Health', 'Travel'][i % 5],
}))

const eventHandlers = {
  onEventAdd: (event: CalendarEvent) => console.log('Event added:', event),
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => console.log('Event updated:', id, updates),
  onEventDelete: (id: string) => console.log('Event deleted:', id),
}

export const Default: Story = {
  args: {
    events: sampleEvents,
    ...eventHandlers,
    initialView: 'month',
  },
}

export const Empty: Story = {
  args: {
    events: [],
    ...eventHandlers,
    initialView: 'month',
  },
}

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    ...eventHandlers,
    initialView: 'week',
  },
}

export const WithManyEvents: Story = {
  args: {
    events: manyEvents,
    ...eventHandlers,
    initialView: 'month',
  },
}

export const InteractiveDemo: Story = {
  args: {
    events: sampleEvents,
    ...eventHandlers,
    initialView: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully functional calendar with event management capabilities.',
      },
    },
  },
}