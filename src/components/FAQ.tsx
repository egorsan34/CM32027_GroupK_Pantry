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
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">FAQ</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-800 font-medium mb-2">{item.q}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
