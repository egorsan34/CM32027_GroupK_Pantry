import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const items = [
  { icon: '🛒', title: 'Price Comparison', desc: "We pull live prices from Tesco, Sainsbury's, Aldi, Lidl and Morrisons so you always know where to shop cheapest." },
  { icon: '🔗', title: 'How We Make Money', desc: 'When you click through to a store, we may earn a small affiliate commission at no extra cost to you. This keeps Pantry free.' },
  { icon: '🔒', title: 'Your Data', desc: 'We never sell your personal data. Your shopping habits stay completely private.' },
  { icon: '📖', title: 'Recipe to List', desc: 'Paste any recipe URL and we automatically extract the ingredients and find the cheapest place to buy them.' },
  { icon: '🔔', title: 'Price Alerts', desc: 'Watch items in your basket and get notified the moment their price drops at any of our supported stores.' },
  { icon: '⭐', title: 'Pantry Pro — Coming Soon', desc: 'Unlock advanced features like personalised deals, price trend analytics, and an ad-free experience.' },
];

export function HowPantryWorks({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">How Pantry Works</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-500 text-sm">Pantry is built on transparency. Here's exactly how it works.</p>
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-11 h-11 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div>
              <p className="text-gray-800 font-medium mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
