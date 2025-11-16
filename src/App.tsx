import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { MobileLayout } from './components/MobileLayout';
import { Home } from './components/Home';
import { BasketComparison } from './components/BasketComparison';
import { RecipeToList } from './components/RecipeToList';
import { DietaryFilters } from './components/DietaryFilters';
import { SocialRecipes } from './components/SocialRecipes';
import { PriceHistory } from './components/PriceHistory';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Home as HomeIcon, ShoppingCart, Utensils, Bell, User } from 'lucide-react';

type AppState = 'splash' | 'onboarding' | 'app';
type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications' | 'profile';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleSplashFinish = () => {
    // Show onboarding before hiding splash
    setShowOnboarding(true);
    // Hide splash after a brief moment
    setTimeout(() => {
      setShowSplash(false);
      setAppState('onboarding');
    }, 100);
  };

  const handleGetStarted = () => {
    setAppState('app');
    setShowOnboarding(false);
  };

  // Show splash screen with onboarding
  if (appState === 'splash') {
    return (
      <div className="relative w-full min-h-screen">
        {showOnboarding && (
          <div className="fixed inset-0 w-full h-full z-0">
            <Onboarding onGetStarted={handleGetStarted} />
          </div>
        )}
        {showSplash && (
          <div className="fixed inset-0 w-full h-full z-10">
            <SplashScreen onFinish={handleSplashFinish} />
          </div>
        )}
      </div>
    );
  }

  // Show onboarding
  if (appState === 'onboarding') {
    return <Onboarding onGetStarted={handleGetStarted} />;
  }

  // Main app

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'basket':
        return <BasketComparison onNavigate={setCurrentScreen} />;
      case 'recipe':
        return <RecipeToList onNavigate={setCurrentScreen} />;
      case 'dietary':
        return <DietaryFilters onNavigate={setCurrentScreen} />;
      case 'social':
        return <SocialRecipes onNavigate={setCurrentScreen} />;
      case 'price-history':
        return <PriceHistory onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <Notifications onNavigate={setCurrentScreen} />;
      case 'profile':
        return <Profile onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <MobileLayout className="bg-white pb-20">
      {renderScreen()}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex flex-col items-center gap-1"
          >
            <HomeIcon className={`w-6 h-6 ${currentScreen === 'home' ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
            <span className={`text-xs ${currentScreen === 'home' ? 'text-[#4CAF50]' : 'text-gray-400'}`}>Home</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('basket')}
            className="flex flex-col items-center gap-1"
          >
            <ShoppingCart className={`w-6 h-6 ${currentScreen === 'basket' ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
            <span className={`text-xs ${currentScreen === 'basket' ? 'text-[#4CAF50]' : 'text-gray-400'}`}>Basket</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('social')}
            className="flex flex-col items-center gap-1"
          >
            <Utensils className={`w-6 h-6 ${currentScreen === 'social' ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
            <span className={`text-xs ${currentScreen === 'social' ? 'text-[#4CAF50]' : 'text-gray-400'}`}>Recipes</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="flex flex-col items-center gap-1"
          >
            <User className={`w-6 h-6 ${currentScreen === 'profile' ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
            <span className={`text-xs ${currentScreen === 'profile' ? 'text-[#4CAF50]' : 'text-gray-400'}`}>Profile</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}