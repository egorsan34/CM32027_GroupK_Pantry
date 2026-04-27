import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const sections = [
  { title: 'What We Collect', body: 'We collect your name, email address, dietary preferences, and shopping list data solely to provide and improve the Pantry service.' },
  { title: 'How We Use It', body: 'Your data is used to personalise your experience and improve price comparisons. We do not sell your personal data to any third party.' },
  { title: 'Cookies', body: 'We use only essential cookies required for the app to function. No tracking or advertising cookies are used.' },
  { title: 'Data Retention', body: 'Your data is retained for as long as your account is active. You can request deletion at any time via Contact Support.' },
  { title: 'Third Parties', body: 'We share only anonymised, aggregated data with supermarket partners to improve price accuracy. No personally identifiable information is ever shared.' },
  { title: 'Your Rights', body: 'Under UK GDPR you have the right to access, correct, or delete your personal data at any time. Contact us via the Contact Support page to exercise these rights.' },
  { title: 'Contact', body: 'For privacy queries, contact us via the Contact Support page in your profile.' },
];

export function PrivacyPolicy({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900 font-semibold">Privacy Policy</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 space-y-3">
        {/* Header card */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 mb-2">
          <p className="text-emerald-900 font-semibold text-sm">UK GDPR Compliant</p>
          <p className="text-emerald-500 text-xs mt-0.5">Last updated: 10 March 2026</p>
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
