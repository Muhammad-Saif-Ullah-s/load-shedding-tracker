# 🇵🇰 Pakistan Load Shedding Tracker
### لوڈ شیڈنگ ٹریکر

A modern, mobile-responsive React web application to track electricity load shedding schedules across major Pakistani cities.

## ✨ Features

- **7 Cities** — Lahore, Karachi, Islamabad, Peshawar, Quetta, Multan, Faisalabad
- **Area Search** — Find your feeder/area by name
- **Live Status** — Real-time Light ON ✅ / Light OFF ❌ indicator
- **Countdown Timer** — Time until next outage or power restoration
- **Today's Schedule** — All outage slots with durations and Urdu labels
- **Weekly View** — 7-day schedule table (desktop) / cards (mobile)
- **Dark Mode** — Toggle with persistence
- **localStorage** — Remembers your city, area, and theme preference
- **Pakistani Flag Theme** — Green (#01411C) and white color scheme
- **Urdu Labels** — Schedule times shown with Urdu time-of-day labels

## 🚀 Setup & Run

### Prerequisites
- Node.js 18+
- npm 8+

### Install & Start

```bash
# Navigate to project folder
cd load-shedding-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
load-shedding-tracker/
├── .kiro/
│   └── specs/load-shedding-tracker/
│       ├── requirements.md
│       └── design.md
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── CityAreaSelector.jsx
│   │   ├── StatusCard.jsx
│   │   ├── TodaySchedule.jsx
│   │   ├── WeeklySchedule.jsx
│   │   ├── EmptyState.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── scheduleData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🔧 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool / dev server |
| Tailwind CSS 3 | Styling |
| Lucide React | Icons |
| Google Fonts | Inter + Noto Nastaliq Urdu |

## 📊 Mock Data

Schedules are generated algorithmically:
- 6 groups (A–F), each area assigned to a group
- 6 daily time-slots (2 hrs each)
- Groups rotate slots daily — no group always gets the same time
- Each area gets ~4 hrs of load shedding per day (2 slots)

## 📱 Mobile Support

Full functionality on mobile. Weekly schedule switches from table to cards on small screens.

---

*This is a demo application using mock data for educational/demonstration purposes.*
