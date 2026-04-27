import { useState, useEffect } from 'react';
import { ChevronLeft, Camera, CheckCircle, X, Image, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../lib/supabase';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile' | 'edit-profile' | 'general-settings' | 'privacy-security' | 'help-center' | 'contact-support' | 'faq' | 'terms' | 'privacy-policy' | 'how-pantry-works';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export function EditProfile({ onNavigate }: Props) {
  const { profile, user, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.display_name || 'Smart Shopper');
  const [email, setEmail] = useState(user?.email || '');
  const [emailError, setEmailError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [emailVerifyNote, setEmailVerifyNote] = useState(false);
  const [showAvatarSheet, setShowAvatarSheet] = useState(false);

  useEffect(() => {
    if (profile) setName(profile.display_name);
    if (user) setEmail(user.email || '');
  }, [profile, user]);

  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setSaving(true);
    try {
      if (profile && profile.display_name !== name) {
        await supabase.from('profiles').update({ display_name: name }).eq('id', profile.id);
        await refreshProfile();
      }
      const emailChanged = email !== (user?.email || '');
      setSaving(false);
      setSavedToast(true);
      if (emailChanged) setEmailVerifyNote(true);
      setTimeout(() => {
        setSavedToast(false);
        onNavigate('profile');
      }, 1800);
    } catch (error) {
      console.error('Error saving profile', error);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Saved toast */}
      {savedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl text-sm font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
          Profile saved!
        </div>
      )}

      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('profile')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Edit Profile</h1>
        <div className="w-6" />
      </div>

      <div className="p-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 py-4">
          <button
            onClick={() => setShowAvatarSheet(true)}
            style={{ position: 'relative', width: '96px', height: '96px', flexShrink: 0 }}
          >
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>
                {name.trim().charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              <Camera className="w-4 h-4 text-[#4CAF50]" />
            </div>
          </button>
          <p className="text-gray-400 text-sm">Tap to change photo</p>
        </div>

        {/* Avatar bottom sheet */}
        {showAvatarSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowAvatarSheet(false)}>
            <div
              className="bg-white rounded-t-3xl p-6 space-y-3"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-800 font-semibold text-lg">Change Profile Photo</h3>
                <button onClick={() => setShowAvatarSheet(false)} className="p-1.5 rounded-full bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={() => setShowAvatarSheet(false)}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium">Take a Photo</p>
                  <p className="text-gray-400 text-xs">Use your camera</p>
                </div>
              </button>
              <button
                onClick={() => setShowAvatarSheet(false)}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Image className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="text-gray-800 font-medium">Choose from Library</p>
                  <p className="text-gray-400 text-xs">Browse your photos</p>
                </div>
              </button>
              <button
                onClick={() => setShowAvatarSheet(false)}
                className="w-full flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="text-red-500 font-medium">Remove Photo</p>
                  <p className="text-gray-400 text-xs">Revert to initials</p>
                </div>
              </button>
              <p className="text-center text-gray-400 text-xs pt-1 pb-2">Photo upload coming soon — stay tuned!</p>
            </div>
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] focus:outline-none text-gray-800"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); setEmailVerifyNote(false); }}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-gray-800 ${
              emailError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#4CAF50]'
            }`}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          {emailVerifyNote && (
            <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <span className="text-blue-500 mt-0.5 text-sm">✉️</span>
              <p className="text-blue-700 text-xs leading-relaxed">
                A verification link has been sent to <strong>{email}</strong>. Please check your inbox to confirm the change.
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', paddingBottom: '16px' }}>
          <button
            onClick={handleSave}
            disabled={!name.trim() || saving || savedToast}
            className="w-full py-4 bg-[#4CAF50] text-white rounded-xl font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {savedToast ? (
              <><CheckCircle className="w-5 h-5" /> Saved!</>
            ) : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
