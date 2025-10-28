export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  color?: string
  category?: string
}

export interface CalendarViewProps {
  events: CalendarEvent[]
  onEventAdd: (event: CalendarEvent) => void
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void
  onEventDelete: (id: string) => void
  initialView?: 'month' | 'week'
  initialDate?: Date
}

export interface CalendarState {
  currentDate: Date
  view: 'month' | 'week'
  selectedDate: Date | null
  selectedEvent: CalendarEvent | null
  isModalOpen: boolean
  modalMode: 'create' | 'edit'
}

export interface CalendarCellProps {
  date: Date
  events: CalendarEvent[]
  isToday: boolean
  isCurrentMonth: boolean
  isSelected: boolean
  onClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export interface EventModalProps {
  isOpen: boolean
  mode: 'create' | 'edit'
  event?: CalendarEvent | null
  selectedDate?: Date | null
  onSave: (event: CalendarEvent) => void
  onDelete: (id: string) => void
  onClose: () => void
}