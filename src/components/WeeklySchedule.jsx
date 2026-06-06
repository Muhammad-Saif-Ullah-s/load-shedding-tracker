import { CalendarRange } from 'lucide-react';
import { getWeeklySchedule } from '../data/scheduleData';

export default function WeeklySchedule({ area }) {
  const week = getWeeklySchedule(area.group);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <CalendarRange size={18} className="text-pk-green dark:text-pk-green-muted" />
        <h2 className="font-bold text-gray-800 dark:text-white text-base">
          ہفتہ وار شیڈول — Weekly Schedule
        </h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-pk-green text-white">
              <th className="px-3 py-2.5 text-left rounded-tl-lg font-semibold">Day</th>
              <th className="px-3 py-2.5 text-left font-semibold">Date</th>
              <th className="px-3 py-2.5 text-left font-semibold">Slot 1</th>
              <th className="px-3 py-2.5 text-left font-semibold">Slot 2</th>
              <th className="px-3 py-2.5 text-center rounded-tr-lg font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {week.map((day) => (
              <tr
                key={day.dateStr}
                className={`${
                  day.isToday
                    ? 'bg-green-50 dark:bg-green-900/20 font-medium'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    {day.isToday && (
                      <span className="w-2 h-2 bg-pk-green-muted rounded-full inline-block" />
                    )}
                    <span className="text-gray-800 dark:text-white">{day.dayEn}</span>
                    <span className="urdu text-xs text-gray-500 dark:text-gray-400">{day.dayUrdu}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-600 dark:text-gray-300">{day.dateStr}</td>
                <td className="px-3 py-3">
                  <SlotBadge slot={day.slots[0]} color="red" />
                </td>
                <td className="px-3 py-3">
                  <SlotBadge slot={day.slots[1]} color="orange" />
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-2 py-0.5 rounded-full text-xs">
                    {day.totalHours}h
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {week.map((day) => (
          <div
            key={day.dateStr}
            className={`rounded-xl border p-3 ${
              day.isToday
                ? 'border-pk-green bg-green-50 dark:bg-green-900/20 dark:border-green-700'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {day.isToday && (
                  <span className="text-xs bg-pk-green text-white px-2 py-0.5 rounded-full font-bold">Today</span>
                )}
                <span className="font-semibold text-gray-800 dark:text-white text-sm">{day.dayEn}</span>
                <span className="urdu text-xs text-gray-500">{day.dayUrdu}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{day.dateStr}</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {day.totalHours}h
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {day.slots.map((s) => (
                <span key={s.id} className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-2.5 py-1 rounded-lg font-medium">
                  {s.start}–{s.end}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlotBadge({ slot, color }) {
  const cls = color === 'red'
    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
  return (
    <span className={`inline-block text-xs px-2.5 py-1 rounded-lg font-medium ${cls}`}>
      {slot.start}–{slot.end}
    </span>
  );
}
