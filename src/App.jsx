import { useState, useEffect } from 'react';
import Header from './components/Header';
import CityAreaSelector from './components/CityAreaSelector';
import StatusCard from './components/StatusCard';
import TodaySchedule from './components/TodaySchedule';
import WeeklySchedule from './components/WeeklySchedule';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { getScheduleForGroup } from './data/scheduleData';

const LS_KEY = 'pk_load_shedding_prefs';

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { city: '', area: null, darkMode: false };
  } catch {
    return { city: '', area: null, darkMode: false };
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(prefs));
  } catch { /* ignore */ }
}

export default function App() {
  const prefs = loadPrefs();

  const [city, setCity] = useState(prefs.city || '');
  const [area, setArea] = useState(prefs.area || null);
  const [darkMode, setDarkMode] = useState(prefs.darkMode || false);

  // Persist preferences
  useEffect(() => {
    savePrefs({ city, area, darkMode });
  }, [city, area, darkMode]);

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const todaySlots = area ? getScheduleForGroup(area.group, 0) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* City + Area Selector */}
        <CityAreaSelector
          city={city}
          area={area}
          onCityChange={(c) => { setCity(c); setArea(null); }}
          onAreaChange={setArea}
        />

        {/* Content: show schedule if area selected */}
        {area ? (
          <>
            {/* Status + Today side by side on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <StatusCard slots={todaySlots} />
              <TodaySchedule slots={todaySlots} area={area} city={city} />
            </div>

            {/* Weekly schedule full width */}
            <WeeklySchedule area={area} />
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <EmptyState />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
