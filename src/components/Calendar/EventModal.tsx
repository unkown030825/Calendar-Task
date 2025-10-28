import React, { useState, useEffect } from 'react'
import { CalendarEvent } from './CalendarView.types'
import { Modal } from '@/components/primitives/Modal'
import { Button } from '@/components/primitives/Button'
import { Select } from '@/components/primitives/Select'
import { formatDateTimeLocal } from '@/utils/date.utils'
import { validateEvent, generateEventId } from '@/utils/event.utils'

interface EventModalProps {
  isOpen: boolean
  mode: 'create' | 'edit'
  event?: CalendarEvent | null
  selectedDate?: Date | null
  onSave: (event: CalendarEvent) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
]

const categoryOptions = [
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Health', label: 'Health' },
  { value: 'Travel', label: 'Travel' },
]

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  mode,
  event,
  selectedDate,
  onSave,
  onDelete,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    color: '#3b82f6',
    category: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && event) {
        setFormData({
          title: event.title,
          description: event.description || '',
          startDate: event.startDate,
          endDate: event.endDate,
          color: event.color || '#3b82f6',
          category: event.category || ''
        })
      } else if (mode === 'create' && selectedDate) {
        const startDate = new Date(selectedDate)
        startDate.setHours(9, 0, 0, 0)
        
        const endDate = new Date(selectedDate)
        endDate.setHours(10, 0, 0, 0)

        setFormData({
          title: '',
          description: '',
          startDate,
          endDate,
          color: '#3b82f6',
          category: ''
        })
      }
      setErrors([])
      setIsSubmitting(false)
    }
  }, [isOpen, mode, event, selectedDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const validationErrors = validateEvent(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const eventData: CalendarEvent = {
        id: mode === 'edit' && event ? event.id : generateEventId(),
        title: formData.title.trim(),
        description: formData.description.trim() ,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        color: formData.color,
        category: formData.category.trim()
      }

      onSave(eventData)
      onClose()
    } catch (error) {
      setErrors(['Failed to save event. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    if (event && window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id)
      onClose()
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create New Event' : 'Edit Event'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.length > 0 && (
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
            <ul className="text-sm text-error-700 list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
            Event Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Add event title"
            maxLength={100}
            disabled={isSubmitting}
          />
          <div className="text-xs text-neutral-500 mt-1 text-right">
            {formData.title.length}/100
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Add event description (optional)"
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="text-xs text-neutral-500 mt-1 text-right">
            {formData.description.length}/500
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-2">
              Start *
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={formatDateTimeLocal(formData.startDate)}
              onChange={(e) => updateField('startDate', new Date(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-2">
              End *
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={formatDateTimeLocal(formData.endDate)}
              onChange={(e) => updateField('endDate', new Date(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Color"
            options={colorOptions}
            value={formData.color}
            onChange={(value) => updateField('color', value)}
            disabled={isSubmitting}
          />

          <Select
            label="Category"
            options={[{ value: '', label: 'Select...' }, ...categoryOptions]}
            value={formData.category}
            onChange={(value) => updateField('category', value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-between pt-2">
          <div>
            {mode === 'edit' && (
              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                disabled={isSubmitting}
                size="sm"
              >
                Delete
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              size="sm"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              size="sm"
            >
              {isSubmitting ? 'Saving...' : (mode === 'create' ? 'Create' : 'Save')}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}