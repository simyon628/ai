import React from 'react';
import { Briefcase, MapPin, Phone, CheckCircle, Clock } from 'lucide-react';
import { MOCK_JOBS } from '../constants';

const WorkerDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-amber-100 rounded-xl p-6 mb-8 flex items-center justify-between border-l-4 border-amber-500 shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-amber-900">Hello, Ramesh!</h2>
            <p className="text-amber-700">You have 3 new job matches nearby.</p>
        </div>
        <div className="text-center bg-white p-3 rounded-lg shadow-sm">
            <span className="block text-xs text-gray-500 uppercase">My Rating</span>
            <span className="text-xl font-bold text-amber-500 flex items-center justify-center">
                4.8 <StarIcon className="h-4 w-4 ml-1 fill-current" />
            </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Briefcase className="mr-2 text-amber-600" /> Jobs Near You
      </h3>

      <div className="space-y-4">
        {MOCK_JOBS.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all border border-transparent hover:border-amber-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">{job.workType}</h4>
                        <p className="text-sm font-medium text-amber-600">{job.farmerName}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        ₹{job.wage}/day
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {job.date}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {job.location}
                    </div>
                </div>

                <p className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    {job.description}
                </p>

                <div className="mt-5 flex space-x-3">
                    <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold shadow transition-colors flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" /> Apply Now
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors border border-gray-300">
                        <Phone className="h-5 w-5" />
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

export default WorkerDashboard;