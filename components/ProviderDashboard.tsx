import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tractor, TrendingUp, Plus } from 'lucide-react';
import { MOCK_EQUIPMENT, MOCK_RENTALS } from '../constants';
import { suggestEquipmentMaintenance } from '../services/geminiService';

const ProviderDashboard: React.FC = () => {
  const [tips, setTips] = useState<string | null>(null);

  // Transform rental data for the chart
  const data = MOCK_RENTALS.map(r => ({
    name: r.equipmentName,
    income: r.amount
  }));

  const handleGetMaintenanceTips = async (name: string) => {
    setTips("Loading AI suggestions...");
    const result = await suggestEquipmentMaintenance(name);
    setTips(result);
  };

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-blue-500" /> Recent Earnings
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: 10}} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center items-center text-center">
            <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-900">Add New Equipment</h3>
            <p className="text-blue-600 mb-4 text-sm">List your tractor, harvester, or tools for rent.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors">
                Add to Inventory
            </button>
        </div>
      </div>

      {/* Inventory List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Tractor className="mr-2" /> Your Fleet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EQUIPMENT.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded font-bold ${item.available ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {item.available ? 'IDLE' : 'RENTED'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Depot: {item.location}</p>
                        <div className="flex space-x-2">
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded transition-colors">
                                Edit Details
                            </button>
                            <button 
                                onClick={() => handleGetMaintenanceTips(item.type)}
                                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium py-2 rounded transition-colors"
                            >
                                AI Tips
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* AI Tips Modal/Display */}
      {tips && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <h4 className="text-lg font-bold text-blue-800 mb-2">Maintenance Assistant</h4>
                <div className="prose prose-sm text-gray-600 bg-blue-50 p-4 rounded-lg mb-4">
                    {tips === "Loading AI suggestions..." ? (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                       <pre className="whitespace-pre-wrap font-sans text-sm">{tips}</pre>
                    )}
                </div>
                <button 
                    onClick={() => setTips(null)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;