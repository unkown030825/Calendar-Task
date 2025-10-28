import React from 'react'
import { CalendarViewProps } from './CalendarView.types'
import { useCalendar } from '@/hooks/useCalendar'
import { useEventManager } from '@/hooks/useEventManager'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { EventModal } from './EventModal'
import { Button } from '@/components/primitives/Button'
import { Select } from '@/components/primitives/Select'
import { formatMonthYear, formatWeekRange } from '@/utils/date.utils'

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date()
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    selectedEvent,
    isModalOpen,
    modalMode,
    goToNextPeriod,
    goToPreviousPeriod,
    goToToday,
    setView,
    setSelectedDate,
    openCreateModal,
    openEditModal,
    closeModal
  } = useCalendar(initialDate, initialView)

  const { addEvent, updateEvent, deleteEvent } = useEventManager(
    events,
    onEventAdd,
    onEventUpdate,
    onEventDelete
  )

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    openCreateModal(date)
  }

  const handleEventClick = (event: any) => {
    openEditModal(event)
  }

  const handleSaveEvent = (event: any) => {
    if (modalMode === 'create') {
      addEvent(event)
    } else {
      updateEvent(event.id, event)
    }
  }

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id)
  }

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' }
  ]

  const handleViewChange = (value: string) => {
    if (value === 'month' || value === 'week') {
      setView(value)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-neutral-200">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToToday}
                className="text-neutral-700 hover:text-neutral-900"
              >
                Today
              </Button>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousPeriod}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                  aria-label="Previous period"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextPeriod}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                  aria-label="Next period"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-neutral-900 min-w-[200px]">
              {view === 'month' ? formatMonthYear(currentDate) : formatWeekRange(currentDate)}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-32">
              <Select
                options={viewOptions}
                value={view}
                onChange={handleViewChange}
              />
            </div>
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => openCreateModal(new Date())}
              className="whitespace-nowrap"
            >
              Add Event
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="p-1 sm:p-2 lg:p-4">
        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        mode={modalMode}
        event={selectedEvent}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onClose={closeModal}
      />
    </div>
  )
}