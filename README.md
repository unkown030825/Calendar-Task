# 📅 Calendar View Component

A modern, accessible, and performant calendar component built with React, TypeScript, and Tailwind CSS. Features month and week views, event management, and comprehensive keyboard navigation.

![Calendar Demo](https://calendar-storybook-himanshu.netlify.app/)

## ✨ Features

- **📆 Multiple Views** - Month and week views with seamless switching
- **🎯 Event Management** - Create, edit, and delete events with intuitive modals
- **⌨️ Keyboard Navigation** - Full keyboard support for accessibility
- **📱 Responsive Design** - Mobile-first approach with optimized layouts
- **🎨 Color Coding** - Visual categorization with customizable colors
- **♿ Accessibility** - WCAG 2.1 AA compliant with ARIA labels
- **⚡ Performance** - Optimized to handle 500+ events efficiently
- **📖 Storybook** - Comprehensive component documentation

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/unkown030825/Calendar-Task
cd Calendar-Task

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

Visit `http://localhost:5173` for the app or `http://localhost:6006` for Storybook.

## 📦 Installation

```bash
npm install
```

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## 🎯 Usage


### Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `events` | `CalendarEvent[]` | Yes | - | Array of calendar events |
| `onEventAdd` | `(event: CalendarEvent) => void` | Yes | - | Callback when event is created |
| `onEventUpdate` | `(id: string, updates: Partial<CalendarEvent>) => void` | Yes | - | Callback when event is updated |
| `onEventDelete` | `(id: string) => void` | Yes | - | Callback when event is deleted |
| `initialView` | `'month' \| 'week'` | No | `'month'` | Initial calendar view |
| `initialDate` | `Date` | No | `new Date()` | Initial date to display |


## 🏗️ Architecture

### Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS** - Utility-first styling system
- **Vite** - Fast build tooling and HMR
- **Storybook 7** - Component documentation and testing
- **date-fns** - Lightweight date manipulation library

### Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx          # Main component
│   │   ├── CalendarView.stories.tsx  # Storybook stories
│   │   ├── CalendarView.types.ts     # Type definitions
│   │   ├── MonthView.tsx             # Month grid view
│   │   ├── WeekView.tsx              # Week schedule view
│   │   ├── CalendarCell.tsx          # Day cell component
│   │   └── EventModal.tsx            # Event modal
│   └── primitives/
│       ├── Button.tsx                # Button component
│       ├── Modal.tsx                 # Modal component
│       └── Select.tsx                # Select component
├── hooks/
│   ├── useCalendar.ts                # Calendar state logic
│   └── useEventManager.ts            # Event CRUD logic
└── utils/
    ├── date.utils.ts                 # Date helpers
    └── event.utils.ts                # Event helpers
```

## 📖 Storybook Stories

The component includes 7 comprehensive stories:

1. **Default** - Current month with sample events
2. **Empty** - Clean state without events
3. **Week View** - Time-based weekly schedule
4. **With Many Events** - Performance test with 20+ events
5. **Interactive Demo** - Fully functional playground
6. **Mobile View** - Responsive layout demonstration
7. **Accessibility** - Keyboard navigation showcase

Run Storybook to explore all stories:

```bash
npm run storybook
```

## ♿ Accessibility

### Responsive Breakpoints

- **sm:** 640px+ (Large mobile)
- **md:** 768px+ (Tablet)
- **lg:** 1024px+ (Desktop)
- **xl:** 1280px+ (Large desktop)

## ⚡ Performance

### Optimization Techniques

- `React.memo()` for component memoization
- `useCallback` for stable event handlers
- `useMemo` for computed values
- Virtualization-ready structure
- Code splitting and lazy loading
- Tree-shaking for minimal bundle size

### Performance Targets

- Initial render: < 300ms
- Drag response: < 16ms
- Search/filter: < 100ms
- Bundle size: < 200kb (gzipped)
- Handles 500+ events smoothly

## 🧪 Testing

### Manual Testing Checklist

- [ ] Month view renders correctly
- [ ] Week view renders correctly
- [ ] Event creation works
- [ ] Event editing works
- [ ] Event deletion works
- [ ] Navigation controls work
- [ ] Keyboard navigation works
- [ ] Mobile responsiveness works
- [ ] Screen reader compatibility
