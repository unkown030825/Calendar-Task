import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  addWeeks,
  subWeeks,
  startOfDay,
  endOfDay,
  isToday as isTodayDateFns
} from 'date-fns'

export const formatDate = (date: Date, formatStr: string = 'yyyy-MM-dd'): string => {
  return format(date, formatStr)
}

export const getDaysInMonth = (date: Date): Date[] => {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
}

export const isSameMonthAs = (date: Date, comparison: Date): boolean => {
  return isSameMonth(date, comparison)
}

export const isToday = (date: Date): boolean => {
  return isTodayDateFns(date)
}

export const isSameDayAs = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2)
}

export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1)
}

export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1)
}

export const getNextWeek = (date: Date): Date => {
  return addWeeks(date, 1)
}

export const getPreviousWeek = (date: Date): Date => {
  return subWeeks(date, 1)
}

export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 })
  return eachDayOfInterval({ start: weekStart, end: weekEnd })
}

export const getTimeSlots = (interval: number = 60): Date[] => {
  const slots: Date[] = []
  const baseDate = new Date()
  baseDate.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += interval) {
      const slot = new Date(baseDate)
      slot.setHours(i, j)
      slots.push(slot)
    }
  }
  
  return slots
}

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm')
}

export const formatDay = (date: Date): string => {
  return format(date, 'd')
}

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy')
}

export const formatWeekRange = (date: Date): string => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 })
  return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
}

export const formatDateTimeLocal = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm")
}

// Add the missing exports
export { startOfDay, endOfDay }