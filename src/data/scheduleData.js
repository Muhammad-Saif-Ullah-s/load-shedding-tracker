/**
 * Load Shedding Schedule Data for Pakistan
 * Groups A–F rotate schedules so each group gets a different slot each day.
 * Slots shift by one position each day of the week (0=Sun … 6=Sat).
 */

export const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
];

// Six base time-slots (each ~2 hrs). Groups rotate through these daily.
export const TIME_SLOTS = [
  { id: 'S1', start: '06:00', end: '08:00', label: 'صبح سویرے' },
  { id: 'S2', start: '10:00', end: '12:00', label: 'صبح' },
  { id: 'S3', start: '13:00', end: '15:00', label: 'دوپہر' },
  { id: 'S4', start: '16:00', end: '18:00', label: 'شام' },
  { id: 'S5', start: '19:00', end: '21:00', label: 'رات' },
  { id: 'S6', start: '22:00', end: '00:00', label: 'رات گئے' },
];

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Areas per city, each assigned to a group
export const AREAS = {
  Lahore: [
    { name: 'Gulberg', group: 'A' },
    { name: 'DHA Phase 1', group: 'B' },
    { name: 'DHA Phase 5', group: 'C' },
    { name: 'Model Town', group: 'D' },
    { name: 'Johar Town', group: 'E' },
    { name: 'Garden Town', group: 'F' },
    { name: 'Bahria Town', group: 'A' },
    { name: 'Wapda Town', group: 'B' },
    { name: 'Iqbal Town', group: 'C' },
    { name: 'Shadman', group: 'D' },
    { name: 'Faisal Town', group: 'E' },
    { name: 'Green Town', group: 'F' },
    { name: 'Township', group: 'A' },
    { name: 'Samanabad', group: 'B' },
    { name: 'Islampura', group: 'C' },
  ],
  Karachi: [
    { name: 'Clifton', group: 'A' },
    { name: 'Defence (DHA)', group: 'B' },
    { name: 'Gulshan-e-Iqbal', group: 'C' },
    { name: 'North Nazimabad', group: 'D' },
    { name: 'Saddar', group: 'E' },
    { name: 'Korangi', group: 'F' },
    { name: 'Landhi', group: 'A' },
    { name: 'Malir', group: 'B' },
    { name: 'Federal B Area', group: 'C' },
    { name: 'Liaquatabad', group: 'D' },
    { name: 'SITE Area', group: 'E' },
    { name: 'Orangi Town', group: 'F' },
  ],
  Islamabad: [
    { name: 'F-6', group: 'A' },
    { name: 'F-7', group: 'B' },
    { name: 'F-8', group: 'C' },
    { name: 'F-10', group: 'D' },
    { name: 'G-9', group: 'E' },
    { name: 'G-10', group: 'F' },
    { name: 'G-11', group: 'A' },
    { name: 'I-8', group: 'B' },
    { name: 'I-10', group: 'C' },
    { name: 'Bahria Town', group: 'D' },
    { name: 'DHA Islamabad', group: 'E' },
    { name: 'PWD Colony', group: 'F' },
  ],
  Peshawar: [
    { name: 'Hayatabad', group: 'A' },
    { name: 'University Town', group: 'B' },
    { name: 'Cantt', group: 'C' },
    { name: 'Saddar', group: 'D' },
    { name: 'Tehkal', group: 'E' },
    { name: 'Gulbahar', group: 'F' },
    { name: 'Warsak Road', group: 'A' },
    { name: 'Budni', group: 'B' },
    { name: 'Nasir Bagh', group: 'C' },
  ],
  Quetta: [
    { name: 'Satellite Town', group: 'A' },
    { name: 'Jinnah Town', group: 'B' },
    { name: 'Cantt', group: 'C' },
    { name: 'Brewary Road', group: 'D' },
    { name: 'Airport Road', group: 'E' },
    { name: 'Sariab Road', group: 'F' },
    { name: 'Kuchlak Road', group: 'A' },
    { name: 'Samungli Road', group: 'B' },
  ],
  Multan: [
    { name: 'Cantt', group: 'A' },
    { name: 'Gulgasht Colony', group: 'B' },
    { name: 'Shah Rukn-e-Alam', group: 'C' },
    { name: 'Bosan Road', group: 'D' },
    { name: 'Vehari Road', group: 'E' },
    { name: 'Qasim Bela', group: 'F' },
    { name: 'New Multan', group: 'A' },
    { name: 'Askari Colony', group: 'B' },
  ],
  Faisalabad: [
    { name: 'Susan Road', group: 'A' },
    { name: 'Peoples Colony', group: 'B' },
    { name: 'Batala Colony', group: 'C' },
    { name: 'Ghulam Muhammad Abad', group: 'D' },
    { name: 'Millat Road', group: 'E' },
    { name: 'Sitiana Road', group: 'F' },
    { name: 'Samanabad', group: 'A' },
    { name: 'Madina Town', group: 'B' },
    { name: 'D-Ground', group: 'C' },
  ],
};

/**
 * Returns today's outage slots for a given group.
 * Groups rotate: on day 0 group A gets slot 0, B gets slot 1, etc.
 * Each group gets 2 slots per day (morning + evening) — ~4 hrs total.
 */
export function getScheduleForGroup(group, dayOffset = 0) {
  const groupIndex = GROUPS.indexOf(group);
  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  const dayOfWeek = today.getDay(); // 0-6

  const slotCount = TIME_SLOTS.length;
  // Primary slot rotates with day
  const primarySlotIndex = (groupIndex + dayOfWeek) % slotCount;
  // Secondary slot is 3 positions away (opposite part of day)
  const secondarySlotIndex = (primarySlotIndex + 3) % slotCount;

  return [TIME_SLOTS[primarySlotIndex], TIME_SLOTS[secondarySlotIndex]].sort(
    (a, b) => a.start.localeCompare(b.start)
  );
}

/**
 * Returns a 7-day weekly schedule for a group.
 */
export function getWeeklySchedule(group) {
  const days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const slots = getScheduleForGroup(group, i);
    const totalMinutes = slots.reduce((acc, s) => {
      const [sh, sm] = s.start.split(':').map(Number);
      const [eh, em] = s.end.split(':').map(Number);
      const endMins = eh === 0 ? 24 * 60 : eh * 60 + em;
      return acc + (endMins - (sh * 60 + sm));
    }, 0);

    return {
      date,
      dayUrdu: days[date.getDay()],
      dayEn: daysEn[date.getDay()],
      dateStr: date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }),
      slots,
      totalHours: (totalMinutes / 60).toFixed(1),
      isToday: i === 0,
    };
  });
}

/**
 * Determines current status given today's outage slots.
 * Returns { isOff, currentSlot, nextSlot, secondsUntilNext, secondsRemaining }
 */
export function getCurrentStatus(slots) {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const slot of slots) {
    const [sh, sm] = slot.start.split(':').map(Number);
    const [eh, em] = slot.end.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh === 0 ? 24 * 60 : eh * 60 + em;

    if (nowMins >= startMins && nowMins < endMins) {
      const secsRemaining = (endMins - nowMins) * 60 - now.getSeconds();
      return { isOff: true, currentSlot: slot, nextSlot: null, secondsUntilNext: 0, secondsRemaining: secsRemaining };
    }
  }

  // Find next slot
  for (const slot of slots) {
    const [sh, sm] = slot.start.split(':').map(Number);
    const startMins = sh * 60 + sm;
    if (startMins > nowMins) {
      const secsUntilNext = (startMins - nowMins) * 60 - now.getSeconds();
      return { isOff: false, currentSlot: null, nextSlot: slot, secondsUntilNext: secsUntilNext, secondsRemaining: 0 };
    }
  }

  // All slots passed today — next is tomorrow's first slot
  return { isOff: false, currentSlot: null, nextSlot: null, secondsUntilNext: 0, secondsRemaining: 0 };
}
