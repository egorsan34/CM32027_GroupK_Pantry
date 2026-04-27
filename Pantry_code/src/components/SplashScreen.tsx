import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className="fixed inset-0 w-full h-full z-50 bg-gray-100"
      style={{ 
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 500ms ease-in-out',
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 overflow-hidden">
        <div 
          className="relative shadow-xl overflow-hidden rounded-3xl bg-[#4CAF50] flex items-center justify-center"
          style={{ 
            height: '90vh', 
            width: 'calc(90vh * (9/19.5))',
            maxWidth: '100vw'
          }}
        >
          <img 
            src="/images/SplashScreenIcon.png" 
            alt="Splash Screen Logo" 
            className="w-auto h-auto max-w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}