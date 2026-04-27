import { useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export function GeneralSettings({ onNavigate }: Props) {
  const [distanceUnit, setDistanceUnit] = useState<'miles' | 'km'>('miles');
  const [currency, setCurrency] = useState('GBP');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNavigate('profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Saved toast */}
      {saved && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl text-sm font-medium">
          <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
          Settings saved!
        </div>
      )}

      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">General Settings</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-6">
        {/* Distance Unit */}
        <div>
          <h3 className="text-gray-800 font-medium mb-3">Distance Unit</h3>
          <div className="flex gap-3">
            {(['miles', 'km'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setDistanceUnit(u)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                  distanceUnit === u
                    ? 'border-[#4CAF50] bg-green-50 text-[#4CAF50]'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {u === 'miles' ? 'Miles' : 'Kilometres'}
              </button>
            ))}
          </div>
        </div>

        {/* Currency */}
        <div style={{ paddingBottom: '8px' }}>
          <h3 className="text-gray-800 font-medium mb-3">Currency</h3>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none text-gray-800"
          >
            <option value="GBP">GBP – British Pound</option>
            <option value="EUR">EUR – Euro</option>
            <option value="USD">USD – US Dollar</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saved}
          className="w-full py-4 bg-[#4CAF50] text-white rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          {saved ? (
            <><CheckCircle className="w-5 h-5" /> Saved!</>
          ) : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
