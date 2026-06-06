import { MapPin } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-pk-green/10 dark:bg-pk-green/20 rounded-full p-6 mb-5">
        <MapPin size={40} className="text-pk-green dark:text-pk-green-muted" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
        اپنا شہر اور علاقہ منتخب کریں
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
        Select your city and area above to see the load shedding schedule for your location.
      </p>
      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        {['🇵🇰 Pakistan', '⚡ Real-time', '📅 Weekly View', '🌙 Dark Mode'].map((tag) => (
          <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
