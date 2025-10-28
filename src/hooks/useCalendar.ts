import { useState, useCallback } from 'react'
import { CalendarState, CalendarEvent } from '@/components/Calendar/CalendarView.types'
import { getNextMonth, getPreviousMonth, getNextWeek, getPreviousWeek } from '@/utils/date.utils'

export const useCalendar = (initialDate: Date = new Date(), initialView: 'month' | 'week' = 'month') => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
    selectedEvent: null,
    isModalOpen: false,
    modalMode: 'create'
  })

  const goToNextPeriod = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.view === 'month' 
        ? getNextMonth(prev.currentDate)
        : getNextWeek(prev.currentDate)
    }))
  }, [])

  const goToPreviousPeriod = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.view === 'month'
        ? getPreviousMonth(prev.currentDate)
        : getPreviousWeek(prev.currentDate)
    }))
  }, [])

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date()
    }))
  }, [])

  const setView = useCallback((view: 'month' | 'week') => {
    setState(prev => ({
      ...prev,
      view
    }))
  }, [])

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({
      ...prev,
      selectedDate: date
    }))
  }, [])

  const openCreateModal = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
      selectedEvent: null,
      isModalOpen: true,
      modalMode: 'create'
    }))
  }, [])

  const openEditModal = useCallback((event: CalendarEvent) => {
    setState(prev => ({
      ...prev,
      selectedEvent: event,
      selectedDate: null,
      isModalOpen: true,
      modalMode: 'edit'
    }))
  }, [])

  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
      selectedDate: null,
      selectedEvent: null
    }))
  }, [])

  return {
    ...state,
    goToNextPeriod,
    goToPreviousPeriod,
    goToToday,
    setView,
    setSelectedDate,
    openCreateModal,
    openEditModal,
    closeModal
  }
}