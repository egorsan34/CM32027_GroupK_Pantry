import { ChevronLeft, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">Help Center</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-3">
        <p className="text-gray-400 text-sm pb-1">Answers to the most common questions.</p>
        {articles.map((a) => (
          <div key={a.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                <span className="text-2xl leading-none">{a.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm leading-snug mb-1.5">{a.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{a.body}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <button
          onClick={() => onNavigate('contact-support')}
          className="w-full mt-2 flex items-center justify-center gap-2 p-4 bg-[#4CAF50]/10 rounded-2xl border border-[#4CAF50]/20 text-[#4CAF50] font-semibold text-sm transition-colors hover:bg-[#4CAF50]/20"
        >
          <MessageCircle className="w-4 h-4" />
          Still need help? Contact Support
        </button>
      </div>
    </div>
  );
}
