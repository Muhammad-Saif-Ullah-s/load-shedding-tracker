import { CalendarDays, Clock, AlertCircle } from 'lucide-react';

function durationLabel(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const endMins = eh === 0 ? 24 * 60 : eh * 60 + em;
  const mins = endMins - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h}h ${m}m`;
}

export default function TodaySchedule({ slots, area, city }) {
  const totalHours = slots.reduce((acc, s) => {
    const [sh, sm] = s.start.split(':').map(Number);
    const [eh, em] = s.end.split(':').map(Number);
    const endMins = eh === 0 ? 24 * 60 : eh * 60 + em;
    return acc + (endMins - (sh * 60 + sm));
  }, 0) / 60;

  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-pk-green dark:text-pk-green-muted" />
            <h2 className="font-bold text-gray-800 dark:text-white text-base">
              آج کا شیڈول
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{today}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">{city} · {area?.name}</p>
          <span className="inline-block mt-1 bg-pk-green text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            Group {area?.group}
          </span>
        </div>
      </div>

      {/* Total alert */}
      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-2 mb-4">
        <AlertCircle size={14} className="text-amber-500 shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          آج کل لوڈ شیڈنگ: <strong>{totalHours.toFixed(1)} گھنٹے</strong> — Total today: <strong>{totalHours.toFixed(1)} hours</strong>
        </p>
      </div>

      {/* Slots */}
      <div className="space-y-3">
        {slots.map((slot, i) => (
          <SlotRow key={slot.id} slot={slot} index={i} />
        ))}
      </div>
    </div>
  );
}

function SlotRow({ slot, index }) {
  const colors = [
    { bar: 'bg-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-700', text: 'text-red-700 dark:text-red-300' },
    { bar: 'bg-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700', text: 'text-orange-700 dark:text-orange-300' },
  ];
  const c = colors[index % colors.length];

  return (
    <div className={`flex items-center gap-3 rounded-xl border ${c.bg} ${c.border} p-3`}>
      <div className={`w-1 h-10 rounded-full ${c.bar} shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Clock size={13} className={c.text} />
          <span className={`font-bold text-sm ${c.text}`}>
            {slot.start} — {slot.end}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 urdu text-right mt-0.5">
          {slot.label}
        </p>
      </div>
      <div className="text-right shrink-0">
        <span className={`font-semibold text-sm ${c.text}`}>
          {durationLabel(slot.start, slot.end)}
        </span>
        <p className="text-xs text-gray-400">duration</p>
      </div>
    </div>
  );
}
