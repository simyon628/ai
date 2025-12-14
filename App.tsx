import React, { useState } from 'react';
import { UserRole, Language } from './types';
import Layout from './components/Layout';
import RoleSelection from './components/RoleSelection';
import FarmerDashboard from './components/FarmerDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ProviderDashboard from './components/ProviderDashboard';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.NONE);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    // In a real app, we would save this to session/local storage
  };

  const handleLogout = () => {
    setCurrentRole(UserRole.NONE);
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case UserRole.FARMER:
        return <FarmerDashboard />;
      case UserRole.WORKER:
        return <WorkerDashboard />;
      case UserRole.PROVIDER:
        return <ProviderDashboard />;
      default:
        return <RoleSelection language={language} onSelectRole={handleRoleSelect} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Abstract Background Animation - Pastel/Light Mode */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
         {/* Warm Sunlight Orb - Pastel Yellow */}
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         
         {/* Fresh Green Orb - Pastel Green */}
         <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
         
         {/* Teal/Water Orb - Pastel Blue */}
         <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main App Layout */}
      <div className="relative z-10">
        <Layout 
            role={currentRole} 
            language={language} 
            onLanguageChange={setLanguage}
            onLogout={handleLogout}
        >
            {renderDashboard()}
        </Layout>
      </div>
    </div>
  );
};

export default App;