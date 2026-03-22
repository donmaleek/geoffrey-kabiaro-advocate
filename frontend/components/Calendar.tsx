'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'hearing' | 'meeting' | 'deadline' | 'other';
  time?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const eventColors = {
  hearing: 'bg-red-500/20 border-red-500/40 text-red-300',
  meeting: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
  deadline: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  other: 'bg-gray-500/20 border-gray-500/40 text-gray-300',
};

const eventDots = {
  hearing: 'bg-red-400',
  meeting: 'bg-blue-400',
  deadline: 'bg-amber-400',
  other: 'bg-gray-400',
};

const sampleEvents: CalendarEvent[] = [
  { id: '1', title: 'Court Hearing – ELC', date: format(new Date(), 'yyyy-MM-dd'), type: 'hearing', time: '9:00 AM' },
  { id: '2', title: 'Client Meeting', date: format(addMonths(new Date(), 0), 'yyyy-MM-') + '15', type: 'meeting', time: '2:00 PM' },
  { id: '3', title: 'Filing Deadline', date: format(addMonths(new Date(), 0), 'yyyy-MM-') + '20', type: 'deadline', time: '4:00 PM' },
  { id: '4', title: 'Negotiation Session', date: format(addMonths(new Date(), 0), 'yyyy-MM-') + '22', type: 'meeting', time: '10:00 AM' },
];

export function Calendar({ events = sampleEvents, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(new Date(e.date), day));

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          ←
        </button>
        <h3 className="font-serif text-lg font-semibold text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          →
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-500 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          const inMonth = isSameMonth(day, currentDate);
          const today = isToday(day);

          return (
            <motion.button
              key={day.toISOString()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(isSameDay(day, selectedDay!) ? null : day)}
              className={`relative aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition-all text-xs font-medium
                ${!inMonth ? 'opacity-25' : ''}
                ${today ? 'ring-1 ring-gold' : ''}
                ${isSelected ? 'bg-gold text-navy' : today ? 'bg-gold/10 text-white' : 'hover:bg-white/5 text-gray-300'}
              `}
            >
              <span>{format(day, 'd')}</span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      className={`w-1 h-1 rounded-full ${isSelected ? 'bg-navy' : eventDots[e.type]}`}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-2">
        {Object.entries(eventDots).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Selected Day Events */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-2"
        >
          <h4 className="text-sm font-semibold text-white">
            {format(selectedDay, 'MMMM d, yyyy')}
          </h4>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-gray-500">No events scheduled.</p>
          ) : (
            selectedEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ x: 4 }}
                onClick={() => onEventClick?.(event)}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${eventColors[event.type]}`}
              >
                <div className={`w-2 h-2 rounded-full flex-none ${eventDots[event.type]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{event.title}</div>
                  {event.time && <div className="text-xs opacity-70">{event.time}</div>}
                </div>
                <span className="text-xs capitalize opacity-70">{event.type}</span>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
