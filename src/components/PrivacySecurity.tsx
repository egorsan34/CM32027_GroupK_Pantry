import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const items = [
  { icon: '🔒', title: 'Data Encryption', desc: 'All your data is encrypted end-to-end using industry-standard protocols.' },
  { icon: '👁️', title: 'Data Sharing', desc: 'We never sell your personal data to third parties. Your information stays private.' },
  { icon: '🍪', title: 'Cookies', desc: 'We only use essential cookies required for the app to function correctly.' },
  { icon: '🗑️', title: 'Delete My Data', desc: 'You can request full deletion of your account and associated data at any time by contacting support.' },
  { icon: '🔑', title: 'Password Security', desc: 'Use a strong, unique password and enable two-factor authentication when available.' },
];

export function PrivacySecurity({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Privacy & Security</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
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
