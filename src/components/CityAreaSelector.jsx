import { useState, useMemo } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { CITIES, AREAS } from '../data/scheduleData';

export default function CityAreaSelector({ city, area, onCityChange, onAreaChange }) {
  const [areaQuery, setAreaQuery] = useState('');

  const cityAreas = useMemo(() => {
    if (!city) return [];
    const all = AREAS[city] || [];
    if (!areaQuery.trim()) return all;
    return all.filter((a) =>
      a.name.toLowerCase().includes(areaQuery.toLowerCase())
    );
  }, [city, areaQuery]);

  const handleCityChange = (e) => {
    onCityChange(e.target.value);
    onAreaChange(null);
    setAreaQuery('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
        اپنا علاقہ منتخب کریں — Select Your Area
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <MapPin size={14} className="inline mr-1 text-pk-green" />
            شہر — City
          </label>
          <div className="relative">
            <select
              value={city || ''}
              onChange={handleCityChange}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pk-green focus:border-transparent"
            >
              <option value="">-- Select City --</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Area Search + Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <Search size={14} className="inline mr-1 text-pk-green" />
            علاقہ — Area / Feeder
          </label>
          {city ? (
            <div className="space-y-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search area..."
                  value={areaQuery}
                  onChange={(e) => setAreaQuery(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pk-green focus:border-transparent"
                />
              </div>
              <div className="max-h-36 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-600 divide-y divide-gray-100 dark:divide-gray-700">
                {cityAreas.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-3">No areas found</p>
                ) : (
                  cityAreas.map((a) => (
                    <button
                      key={a.name}
                      onClick={() => onAreaChange(a)}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                        area?.name === a.name
                          ? 'bg-pk-green text-white font-medium'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{a.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        area?.name === a.name
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                      }`}>
                        Group {a.group}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
              Please select a city first
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
