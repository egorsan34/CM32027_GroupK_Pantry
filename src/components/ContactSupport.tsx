import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export function ContactSupport({ onNavigate }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setError(null);
    setSending(true);
    try {
      if (!FORMSPREE_ID) throw new Error('Formspree not configured');
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Anonymous',
          _replyto: email.trim() || undefined,
          message,
          _subject: `Pantry Support Message from ${name.trim() || 'a user'}`,
        }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
    } catch (err: any) {
      setError('Failed to send — please try again or email ipoliver0812@gmail.com directly.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <button onClick={() => onNavigate('profile')}>
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-gray-800">Contact Support</h1>
          <div className="w-6" />
        </div>
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-gray-800 font-bold text-xl mb-3">Message Sent!</h2>
          <p className="text-gray-500 mb-8">We'll get back to you within 24 hours at <span className="text-gray-800 font-medium">ipoliver0812@gmail.com</span>.</p>
          <button
            onClick={() => onNavigate('profile')}
            className="w-full py-4 bg-[#4CAF50] text-white rounded-xl font-medium text-base"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Contact Support</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-5">
        <div className="p-4 bg-blue-50 rounded-xl">
          <p className="text-gray-600 text-sm">We typically respond within 24 hours to <span className="text-gray-800 font-medium">ipoliver0812@gmail.com</span>.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your email (so we can reply)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">What can we help with?</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue or question..."
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none text-gray-800 resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || sending}
          className="w-full py-4 bg-[#4CAF50] text-white rounded-xl font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </div>
  );
}
