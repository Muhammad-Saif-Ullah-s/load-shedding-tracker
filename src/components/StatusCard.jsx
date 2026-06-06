import { useEffect, useState } from 'react';
import { Zap, ZapOff, Clock } from 'lucide-react';
import { getCurrentStatus } from '../data/scheduleData';

function formatTime(secs) {
  if (secs <= 0) return '00:00:00';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function StatusCard({ slots }) {
  const [status, setStatus] = useState(() => getCurrentStatus(slots));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setStatus(getCurrentStatus(slots));
    const interval = setInterval(() => {
      setStatus(getCurrentStatus(slots));
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [slots]);

  const { isOff, currentSlot, nextSlot, secondsUntilNext, secondsRemaining } = status;

  return (
    <div
      className={`rounded-2xl shadow-md p-5 border-2 transition-all ${
        isOff
          ? 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700'
          : 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700'
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 text-lg font-bold ${isOff ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
          {isOff ? (
            <>
              <ZapOff size={24} />
              <span>Light OFF ❌</span>
            </>
          ) : (
            <>
              <Zap size={24} />
              <span>Light ON ✅</span>
            </>
          )}
        </div>
        {/* Pulse dot */}
        <div className={`w-4 h-4 rounded-full ${isOff ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
      </div>

      {/* Urdu status */}
      <p className={`urdu text-right text-base mb-4 ${isOff ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
        {isOff ? 'ابھی لوڈ شیڈنگ جاری ہے' : 'ابھی بجلی موجود ہے'}
      </p>

      {/* Countdown */}
      <div className={`rounded-xl p-4 text-center ${isOff ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock size={16} className={isOff ? 'text-red-500' : 'text-green-600'} />
          <p className={`text-xs font-medium ${isOff ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
            {isOff
              ? 'بجلی واپس آنے میں — Power returns in'
              : nextSlot
              ? 'اگلی لوڈ شیڈنگ میں — Next outage in'
              : 'آج کی لوڈ شیڈنگ ختم — No more outages today'}
          </p>
        </div>

        {(isOff || nextSlot) ? (
          <p className={`text-3xl font-mono font-bold tracking-wider ${isOff ? 'text-red-600 dark:text-red-300' : 'text-green-700 dark:text-green-400'}`}>
            {isOff ? formatTime(secondsRemaining) : formatTime(secondsUntilNext)}
          </p>
        ) : (
          <p className="text-2xl">🎉</p>
        )}

        {isOff && currentSlot && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            {currentSlot.start} → {currentSlot.end} ({currentSlot.label})
          </p>
        )}
        {!isOff && nextSlot && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Next: {nextSlot.start} – {nextSlot.end}
          </p>
        )}
      </div>
    </div>
  );
}
