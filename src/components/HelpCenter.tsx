import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const articles = [
  { icon: '🛒', title: 'How does price comparison work?', body: "Pantry pulls live prices from Tesco, Sainsbury's, Aldi, Lidl and Morrisons. We compare them side by side so you always know where to shop cheapest for your basket." },
  { icon: '➕', title: 'How do I add items to my basket?', body: 'Go to Basket Comparison and tap "Add Item". Search for any product and it will be added to your list for comparison.' },
  { icon: '💳', title: 'What is loyalty pricing?', body: "Toggle on Loyalty Cards in your profile to see Clubcard (Tesco) and Nectar (Sainsbury's) member prices included in comparisons." },
  { icon: '🔔', title: 'How do I set up price alerts?', body: 'Go to Notifications and tap "Watch" on any item to receive a notification when its price drops.' },
  { icon: '🔒', title: 'Is my data safe?', body: 'Yes. All data is encrypted and we never sell your personal information. Visit Privacy & Security for full details.' },
  { icon: '📱', title: 'Can I use Pantry offline?', body: 'The app works offline using cached data. Some features like live price updates require an internet connection.' },
];

export function HelpCenter({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Help Center</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-4">
        {articles.map((a) => (
          <div key={a.title} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{a.icon}</span>
              <p className="text-gray-800 font-medium">{a.title}</p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
