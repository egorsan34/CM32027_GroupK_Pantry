import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const faqs = [
  { q: 'Is Pantry free to use?', a: 'Yes! Pantry is completely free. We earn a small affiliate commission when you shop via our links, at no cost to you.' },
  { q: 'Which supermarkets are supported?', a: "Tesco, Sainsbury's, Aldi, Lidl and Morrisons. More stores are coming soon." },
  { q: 'How often are prices updated?', a: 'Prices are refreshed daily. The "Updated" timestamp on each screen shows exactly when the data was last pulled.' },
  { q: 'Can I use Pantry offline?', a: 'The app works offline using cached data. Live price updates require an internet connection.' },
  { q: 'How do I convert a recipe into a shopping list?', a: 'Go to Recipe to List, paste a URL from BBC Good Food, Instagram or YouTube, and tap Extract.' },
  { q: 'What is Pantry Pro?', a: 'Pantry Pro is an upcoming premium tier with price alerts, personalised deals and an ad-free experience.' },
  { q: 'How do I delete my account?', a: 'Contact our support team via Contact Support and request full account deletion. We will process it within 7 days.' },
];

export function FAQ({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">FAQ</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-3">
        <p className="text-gray-400 text-sm pb-1">Your most common questions, answered.</p>
        {faqs.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-start gap-3 p-6">
              <span className="w-7 h-7 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm leading-snug mb-2">{item.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
