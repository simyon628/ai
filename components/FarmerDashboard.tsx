import React, { useState } from 'react';
import { Users, Tractor, PlusCircle, MapPin, Phone, Star, Sparkles } from 'lucide-react';
import { MOCK_WORKERS, MOCK_EQUIPMENT } from '../constants';
import { WorkerProfile, Equipment } from '../types';
import { generateJobDescription } from '../services/geminiService';

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'workers' | 'equipment'>('jobs');
  const [jobForm, setJobForm] = useState({ type: '', date: '', workers: 1, wage: 0, location: '', description: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!jobForm.type || !jobForm.location) {
      alert("Please enter Work Type and Location first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateJobDescription(jobForm.type, jobForm.location);
    setJobForm(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const renderPostJob = () => (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto border-t-4 border-agri-green">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        <PlusCircle className="mr-2 text-agri-green" /> Post New Requirement
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
            <input 
              type="text" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none"
              placeholder="e.g. Harvesting"
              value={jobForm.type}
              onChange={e => setJobForm({...jobForm, type: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none"
              value={jobForm.date}
              onChange={e => setJobForm({...jobForm, date: e.target.value})}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workers Needed</label>
            <input 
              type="number" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none"
              value={jobForm.workers}
              onChange={e => setJobForm({...jobForm, workers: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage (₹)</label>
            <input 
              type="number" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none"
              value={jobForm.wage}
              onChange={e => setJobForm({...jobForm, wage: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
           <div className="relative">
             <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
             <input 
               type="text" 
               className="w-full border rounded-lg p-2 pl-10 focus:ring-2 focus:ring-agri-green outline-none"
               placeholder="Farm location..."
               value={jobForm.location}
               onChange={e => setJobForm({...jobForm, location: e.target.value})}
             />
           </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button 
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="text-xs flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {isGenerating ? "AI Writing..." : "AI Auto-Fill"}
                </button>
            </div>
            <textarea 
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-agri-green outline-none h-24"
                placeholder="Details about the job..."
                value={jobForm.description}
                onChange={e => setJobForm({...jobForm, description: e.target.value})}
            />
        </div>

        <button className="w-full bg-agri-green hover:bg-agri-dark text-white font-bold py-3 rounded-lg transition-all shadow-lg transform active:scale-95">
          Post Job
        </button>
      </div>
    </div>
  );

  const renderWorkers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_WORKERS.map((worker) => (
        <div key={worker.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-amber-500 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{worker.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {worker.distance} km away
              </p>
            </div>
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="font-bold text-sm">{worker.rating}</span>
            </div>
          </div>
          
          <div className="mb-4">
             <div className="flex flex-wrap gap-1">
                {worker.skills.map(skill => (
                    <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{skill}</span>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${worker.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {worker.available ? 'AVAILABLE' : 'BUSY'}
            </span>
            <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 shadow-lg">
                <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-700">Available Equipment Nearby</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_EQUIPMENT.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow overflow-hidden flex flex-col md:flex-row">
                    <img src={item.image} alt={item.name} className="h-48 md:h-auto md:w-1/3 object-cover" />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                            <div className="flex justify-between">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.type}</span>
                                <span className={`h-2 w-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{item.location}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">₹{item.rentPerDay}</span>
                                <span className="text-gray-500 text-sm">/day</span>
                            </div>
                            <button disabled={!item.available} className={`px-4 py-2 rounded-lg font-medium text-white ${item.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                                {item.available ? 'Book Now' : 'Rented'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm overflow-x-auto">
        {[
          { id: 'jobs', icon: PlusCircle, label: 'Post Job' },
          { id: 'workers', icon: Users, label: 'Find Workers' },
          { id: 'equipment', icon: Tractor, label: 'Book Equipment' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-1 justify-center ${
              activeTab === tab.id 
                ? 'bg-agri-green text-white shadow' 
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'jobs' && renderPostJob()}
        {activeTab === 'workers' && renderWorkers()}
        {activeTab === 'equipment' && renderEquipment()}
      </div>
    </div>
  );
};

export default FarmerDashboard;