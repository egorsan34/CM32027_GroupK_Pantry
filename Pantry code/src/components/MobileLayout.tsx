import { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div 
        id="app-root"
        className={`w-full max-w-md bg-white shadow-xl rounded-3xl flex flex-col my-auto ${className}`}
        style={{ 
          minHeight: '90vh',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
}
