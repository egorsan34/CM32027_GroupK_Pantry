import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const sections = [
  { title: '1. Acceptance of Terms', body: 'By using Pantry, you agree to these Terms & Conditions. If you do not agree, please do not use the app.' },
  { title: '2. Use of the App', body: 'Pantry is for personal, non-commercial use only. You must not misuse or attempt to reverse-engineer any part of the app.' },
  { title: '3. Price Accuracy', body: 'While we strive to display accurate prices, we cannot guarantee they are always current. Always verify the final price at checkout.' },
  { title: '4. Affiliate Links', body: 'Some links in Pantry are affiliate links. We may earn a small commission when you make a purchase through them, at no extra cost to you.' },
  { title: '5. Intellectual Property', body: 'All content, design and code within Pantry is owned by Pantry Ltd. You may not copy or reproduce any part without written permission.' },
  { title: '6. Limitation of Liability', body: 'Pantry is provided "as is". We are not liable for any losses arising from the use of pricing information displayed in the app.' },
  { title: '7. Changes to Terms', body: 'We may update these Terms at any time. Continued use of the app after changes constitutes your acceptance of the new Terms.' },
];

export function TermsConditions({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Terms & Conditions</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-5">
        <p className="text-gray-400 text-sm">Last updated: 10 March 2026</p>
        {sections.map((s) => (
          <div key={s.title}>
            <p className="text-gray-800 font-medium mb-1">{s.title}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
