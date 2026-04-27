import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const items = [
  { icon: '🛒', title: 'Price Comparison', desc: "We pull live prices from Tesco, Sainsbury's, Aldi, Lidl and Morrisons so you always know where to shop cheapest.", comingSoon: false },
  { icon: '🔗', title: 'How We Make Money', desc: 'When you click through to a store, we may earn a small affiliate commission at no extra cost to you. This keeps Pantry free.', comingSoon: false },
  { icon: '🔒', title: 'Your Data', desc: 'We never sell your personal data. Your shopping habits stay completely private.', comingSoon: false },
  { icon: '📖', title: 'Recipe to List', desc: 'Paste any recipe URL and we automatically extract the ingredients and find the cheapest place to buy them.', comingSoon: false },
  { icon: '🔔', title: 'Price Alerts', desc: 'Watch items in your basket and get notified the moment their price drops at any of our supported stores.', comingSoon: false },
  { icon: '⭐', title: 'Pantry Pro', desc: 'Unlock advanced features like personalised deals, price trend analytics, and an ad-free experience.', comingSoon: true },
];

export function HowPantryWorks({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">How Pantry Works</h1>
        <div className="w-9" />
      </div>

      {/* Green header banner */}
      <div className="mx-6 mt-6 mb-1 bg-gradient-to-r from-[#4CAF50] to-[#43A047] rounded-2xl p-5 text-white">
        <p className="font-bold text-base leading-snug">Built on transparency.</p>
        <p className="text-white/80 text-sm mt-1">Here's exactly how Pantry works and how we keep it free for everyone.</p>
      </div>

      <div className="px-6 pt-4 pb-8 space-y-3">
        {items.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl leading-none">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                  {item.comingSoon && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
