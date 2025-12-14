import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Sprout, HardHat, Tractor, MapPin, Loader2, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface RoleSelectionProps {
  language: Language;
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ language, onSelectRole }) => {
  const t = TRANSLATIONS[language];
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);
  
  // Login Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    otp: ''
  });

  const handleRoleClick = (role: UserRole) => {
    setSelectedRole(role);
    setLoginStep('details');
    setFormData({ name: '', phone: '', location: '', otp: '' });
    setShowLogin(true);
  };

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mocking reverse geocoding or just using coordinates
          setFormData(prev => ({ 
            ...prev, 
            location: `Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}` 
          }));
          setLoading(false);
        },
        (error) => {
          alert('Unable to retrieve location.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location) {
        alert("Please fill all fields");
        return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setLoginStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length !== 4) {
        alert("Please enter a valid 4-digit OTP");
        return;
    }
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
        setLoading(false);
        if (selectedRole) {
            onSelectRole(selectedRole);
        }
    }, 1000);
  };

  const RoleCard = ({ role, icon: Icon, title, desc, color }: { role: UserRole, icon: any, title: string, desc: string, color: string }) => (
    <button
      onClick={() => handleRoleClick(role)}
      className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border border-gray-100"
    >
      <div className={`p-4 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110 ${color} bg-opacity-10 group-hover:bg-opacity-20`}>
        <Icon className={`h-12 w-12 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16 relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {t.welcome}
        </h1>
        <p className="text-xl text-gray-600 font-medium">{t.selectRole}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RoleCard 
          role={UserRole.FARMER}
          icon={Sprout}
          title={t.farmer}
          desc={t.farmerDesc}
          color="bg-agri-green"
        />
        <RoleCard 
          role={UserRole.WORKER}
          icon={HardHat}
          title={t.worker}
          desc={t.workerDesc}
          color="bg-amber-500"
        />
        <RoleCard 
          role={UserRole.PROVIDER}
          icon={Tractor}
          title={t.provider}
          desc={t.providerDesc}
          color="bg-blue-600"
        />
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="bg-agri-dark p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center">
                        <ShieldCheck className="mr-2 h-5 w-5" /> Login as {selectedRole}
                    </h3>
                    <button onClick={() => setShowLogin(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <div className="p-6">
                    {loginStep === 'details' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-agri-green outline-none"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        +91
                                    </span>
                                    <input 
                                        required
                                        type="tel" 
                                        maxLength={10}
                                        className="flex-1 w-full border border-gray-300 rounded-r-lg p-3 focus:ring-2 focus:ring-agri-green outline-none"
                                        placeholder="Mobile Number"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g,'')})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="relative">
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-agri-green outline-none"
                                        placeholder="City, Village or GPS"
                                        value={formData.location}
                                        onChange={e => setFormData({...formData, location: e.target.value})}
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleDetectLocation}
                                        className="absolute right-2 top-2 p-1 text-agri-green hover:bg-green-50 rounded"
                                        title="Detect Location"
                                    >
                                        <MapPin className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-agri-green text-white py-3 rounded-lg font-bold shadow-lg hover:bg-agri-dark transition-all flex justify-center items-center"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Send OTP <ArrowRight className="ml-2 h-4 w-4" /></>}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
                            <div>
                                <p className="text-sm text-gray-500 mb-4">
                                    We sent a 4-digit code to <span className="font-bold text-gray-800">+91 {formData.phone}</span>
                                </p>
                                <input 
                                    type="text" 
                                    maxLength={4}
                                    autoFocus
                                    className="w-40 text-center text-3xl tracking-widest border-b-2 border-agri-green focus:border-agri-dark outline-none py-2 mx-auto block"
                                    placeholder="XXXX"
                                    value={formData.otp}
                                    onChange={e => setFormData({...formData, otp: e.target.value.replace(/\D/g,'')})}
                                />
                                <p className="text-xs text-gray-400 mt-2">Mock OTP: Any 4 digits</p>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-agri-green text-white py-3 rounded-lg font-bold shadow-lg hover:bg-agri-dark transition-all flex justify-center items-center"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify & Login"}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => setLoginStep('details')}
                                className="text-sm text-gray-500 hover:text-agri-green underline"
                            >
                                Change Number
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelection;