import { Sun, Moon, Zap } from 'lucide-react';

export default function Header({ darkMode, onToggleDark }) {
  return (
    <header className="bg-pk-green dark:bg-gray-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <Zap size={22} className="text-yellow-300" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              Load Shedding Tracker
            </h1>
            <p className="text-green-200 text-xs hidden sm:block">
              پاکستان لوڈ شیڈنگ ٹریکر
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Pakistan flag badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
            <span>🇵🇰</span>
            <span>Pakistan</span>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
