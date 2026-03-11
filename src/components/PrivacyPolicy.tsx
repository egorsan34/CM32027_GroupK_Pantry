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
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Privacy Policy</h1>
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
