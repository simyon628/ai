import { Job, WorkerProfile, Equipment, RentalHistory } from './types';

export const MOCK_WORKERS: WorkerProfile[] = [
  { id: 'w1', name: 'Ramesh Kumar', skills: ['Harvesting', 'Sowing'], rating: 4.8, distance: 2.5, available: true },
  { id: 'w2', name: 'Suresh Singh', skills: ['Tractor Driving', 'Irrigation'], rating: 4.5, distance: 5.0, available: true },
  { id: 'w3', name: 'Anita Devi', skills: ['Weeding', 'Harvesting'], rating: 4.9, distance: 1.2, available: false },
];

export const MOCK_JOBS: Job[] = [
  { id: 'j1', farmerId: 'f1', farmerName: 'Rajesh Farm', workType: 'Wheat Harvesting', date: '2023-11-20', wage: 500, location: 'North Field, Sector 4', status: 'OPEN', description: 'Need 5 workers for wheat harvesting. Lunch provided.' },
  { id: 'j2', farmerId: 'f2', farmerName: 'Green Valley', workType: 'Pesticide Spraying', date: '2023-11-22', wage: 600, location: 'Valley Road', status: 'OPEN', description: 'Expertise in spraying required.' },
];

export const MOCK_EQUIPMENT: Equipment[] = [
  { id: 'e1', providerId: 'p1', type: 'Tractor', name: 'John Deere 5050D', image: 'https://picsum.photos/300/200?random=1', rentPerDay: 2000, available: true, location: 'Depot A' },
  { id: 'e2', providerId: 'p1', type: 'Harvester', name: 'Combine Harvester X', image: 'https://picsum.photos/300/200?random=2', rentPerDay: 5000, available: false, location: 'Depot B' },
  { id: 'e3', providerId: 'p1', type: 'Seeder', name: 'Rotavator Plus', image: 'https://picsum.photos/300/200?random=3', rentPerDay: 800, available: true, location: 'Depot A' },
];

export const MOCK_RENTALS: RentalHistory[] = [
  { id: 'r1', equipmentName: 'Tractor 5050D', farmerName: 'Rajesh Farm', date: '2023-10-15', amount: 2000 },
  { id: 'r2', equipmentName: 'Harvester X', farmerName: 'Green Valley', date: '2023-10-18', amount: 5000 },
  { id: 'r3', equipmentName: 'Tractor 5050D', farmerName: 'Amit Kite', date: '2023-11-01', amount: 2000 },
];

export const TRANSLATIONS = {
  English: {
    welcome: "Welcome to AgriConnect",
    selectRole: "Select Your Role",
    farmer: "Farmer",
    worker: "Worker",
    provider: "Equipment Provider",
    farmerDesc: "Post jobs, hire workers, and rent equipment.",
    workerDesc: "Find nearby jobs and earn wages.",
    providerDesc: "Rent out your machinery and manage inventory.",
  },
  Hindi: {
    welcome: "एग्रीकनेक्ट में आपका स्वागत है",
    selectRole: "अपनी भूमिका चुनें",
    farmer: "किसान",
    worker: "श्रमिक",
    provider: "उपकरण प्रदाता",
    farmerDesc: "नौकरियां पोस्ट करें, श्रमिकों को काम पर रखें और उपकरण किराए पर लें।",
    workerDesc: "पास की नौकरियां खोजें और वेतन अर्जित करें।",
    providerDesc: "अपनी मशीनरी किराए पर दें और इन्वेंट्री का प्रबंधन करें।",
  },
  Spanish: {
    welcome: "Bienvenido a AgriConnect",
    selectRole: "Seleccione su rol",
    farmer: "Agricultor",
    worker: "Trabajador",
    provider: "Proveedor de Equipos",
    farmerDesc: "Publique trabajos, contrate trabajadores y alquile equipos.",
    workerDesc: "Encuentre trabajos cercanos y gane salarios.",
    providerDesc: "Alquile su maquinaria y gestione el inventario.",
  }
};