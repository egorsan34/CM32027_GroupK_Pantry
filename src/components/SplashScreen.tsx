import { useEffect, useState } from 'react';
import { MobileLayout } from './MobileLayout';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 700ms
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 700);

    // Finish and transition after fade completes (300ms fade duration)
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1000); // 1 second total (700ms visible + 300ms fade)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`transition-opacity duration-300 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <MobileLayout className="bg-[#4CAF50] flex items-center justify-center">
        <img 
          src="/images/SplashScreenIcon.png" 
          alt="Splash Screen Logo" 
          className="w-auto h-auto max-w-[200px]"
        />
      </MobileLayout>
    </div>
  );
}

