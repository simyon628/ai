import React from 'react';
import { LogOut, Globe, Sprout } from 'lucide-react';
import { UserRole, Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, language, onLanguageChange, onLogout }) => {
  const getHeaderStyle = () => {
    switch (role) {
      case UserRole.FARMER: return 'bg-emerald-600 text-white';
      case UserRole.WORKER: return 'bg-amber-600 text-white';
      case UserRole.PROVIDER: return 'bg-blue-600 text-white';
      default: return 'bg-agri-green text-white shadow-md'; // Default solid green header for Home
    }
  };

  const getMainClass = () => {
    // Standard layout for all pages
    return "flex-grow container mx-auto px-4 py-6 min-h-[calc(100vh-140px)]"; 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`${getHeaderStyle()} backdrop-blur-md border-b-0 sticky top-0 z-50 transition-all duration-300 shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-full">
                <Sprout className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-wide drop-shadow-sm">AgriConnect</h1>
            {role !== UserRole.NONE && (
              <span className="hidden sm:inline-block text-xs bg-black/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/10">
                {role}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-black/10 rounded-full px-3 py-1 border border-white/10">
                <Globe className="h-4 w-4 text-white/90" />
                <select 
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    className="bg-transparent text-sm border-none focus:ring-0 cursor-pointer text-white font-medium outline-none"
                >
                    {Object.values(Language).map((lang) => (
                        <option key={lang} value={lang} className="text-gray-900">{lang}</option>
                    ))}
                </select>
            </div>

            {role !== UserRole.NONE && (
              <button 
                onClick={onLogout}
                className="flex items-center space-x-1 hover:bg-white/10 px-3 py-1 rounded-full transition-colors text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={getMainClass()}>
        {children}
      </main>

      {role === UserRole.NONE && (
        <footer className="text-gray-500 py-6 text-center text-xs mt-auto">
            <p>&copy; {new Date().getFullYear()} AgriConnect. Connecting the roots of agriculture.</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;