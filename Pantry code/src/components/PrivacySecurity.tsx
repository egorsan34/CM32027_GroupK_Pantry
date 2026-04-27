import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const items = [
  { icon: '🔒', title: 'Data Encryption', desc: 'All your data is encrypted end-to-end using industry-standard protocols.', bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
  { icon: '👁️', title: 'Data Sharing', desc: 'We never sell your personal data to third parties. Your information stays private.', bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100' },
  { icon: '🍪', title: 'Cookies', desc: 'We only use essential cookies required for the app to function correctly.', bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100' },
  { icon: '🗑️', title: 'Delete My Data', desc: 'You can request full deletion of your account and associated data at any time by contacting support.', bg: 'bg-red-50', border: 'border-red-100', iconBg: 'bg-red-100' },
  { icon: '🔑', title: 'Password Security', desc: 'Use a strong, unique password and enable two-factor authentication when available.', bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-purple-100' },
];

export function PrivacySecurity({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">Privacy & Security</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-3">
        <p className="text-gray-400 text-sm pb-1">How we keep your data safe and under your control.</p>
        {items.map((item) => (
          <div key={item.title} className={`flex items-start gap-4 p-6 ${item.bg} rounded-2xl border ${item.border}`}>
            <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <span className="text-2xl leading-none">{item.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
