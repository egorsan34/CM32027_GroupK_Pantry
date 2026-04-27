import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const sections = [
  { title: 'Acceptance of Terms', body: 'By using Pantry, you agree to these Terms & Conditions. If you do not agree, please do not use the app.' },
  { title: 'Use of the App', body: 'Pantry is for personal, non-commercial use only. You must not misuse or attempt to reverse-engineer any part of the app.' },
  { title: 'Price Accuracy', body: 'While we strive to display accurate prices, we cannot guarantee they are always current. Always verify the final price at checkout.' },
  { title: 'Affiliate Links', body: 'Some links in Pantry are affiliate links. We may earn a small commission when you make a purchase through them, at no extra cost to you.' },
  { title: 'Intellectual Property', body: 'All content, design and code within Pantry is owned by Pantry Ltd. You may not copy or reproduce any part without written permission.' },
  { title: 'Limitation of Liability', body: 'Pantry is provided "as is". We are not liable for any losses arising from the use of pricing information displayed in the app.' },
  { title: 'Changes to Terms', body: 'We may update these Terms at any time. Continued use of the app after changes constitutes your acceptance of the new Terms.' },
];

export function TermsConditions({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">Terms & Conditions</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-3">
        {/* Header card */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 mb-2">
          <p className="text-blue-900 font-semibold text-sm">Pantry Ltd</p>
          <p className="text-blue-400 text-xs mt-0.5">Last updated: 10 March 2026</p>
        </div>

        {sections.map((s, i) => (
          <div key={s.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-bold flex items-center justify-center flex-none"
                style={{ width: '1.75rem', height: '1.75rem', minWidth: '1.75rem' }}
              >
                {i + 1}
              </span>
              <p className="text-gray-900 font-semibold text-sm">{s.title}</p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-10">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
