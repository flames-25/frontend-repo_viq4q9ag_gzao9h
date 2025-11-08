import React, { useMemo, useState } from 'react';
import HeroSearch from './components/HeroSearch';
import MapView from './components/MapView';
import StationDetails from './components/StationDetails';
import RecommendationDrawer from './components/RecommendationDrawer';

// Mock stations for initial UI demonstration
const MOCK_STATIONS = [
  { id: '1', name: 'GreenLoop Recycling Center', address: '120 Market St, San Jose, CA', type: 'recycling', rating: 4.6, distance: 1.2, x: 30, y: 40 },
  { id: '2', name: 'Metro City Dump Site', address: '45 Industrial Ave, San Jose, CA', type: 'dump', rating: 4.0, distance: 3.8, x: 60, y: 65 },
  { id: '3', name: 'Spark E‑Waste Dropoff', address: '900 Tech Park, San Jose, CA', type: 'ewaste', rating: 4.8, distance: 2.3, x: 75, y: 30 },
  { id: '4', name: 'Urban Compost Hub', address: '15 Garden Rd, San Jose, CA', type: 'compost', rating: 4.3, distance: 4.1, x: 45, y: 20 },
];

const MOCK_RECS = [
  { id: 'r1', title: 'GreenLoop Recycling Center', reason: 'Close, high rating, open now', thumb: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop' },
  { id: 'r2', title: 'Spark E‑Waste Dropoff', reason: 'Best match for e‑waste today', thumb: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(['recycling', 'dump', 'ewaste', 'compost']);
  const [selected, setSelected] = useState(null);
  const [openRecs, setOpenRecs] = useState(true);

  const filteredStations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_STATIONS.filter((s) =>
      filters.includes(s.type) &&
      (q === '' || s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q))
    );
  }, [query, filters]);

  const toggleFilter = (key) => {
    setFilters((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleGeoLocate = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      () => alert('Location permission granted. Map will adjust in a full implementation.'),
      () => alert('Unable to access location')
    );
  };

  const handleSearch = () => {
    // Visual feedback only for mock
    window?.scrollTo({ top: (window.innerHeight * 0.7), behavior: 'smooth' });
  };

  const findNearest = () => {
    const nearest = filteredStations.reduce((a, b) => (a.distance < b.distance ? a : b), filteredStations[0]);
    if (nearest) setSelected(nearest);
  };

  const handleFeedback = (id, positive) => {
    console.log('feedback', id, positive);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSearch
        query={query}
        setQuery={setQuery}
        onGeoLocate={handleGeoLocate}
        activeFilters={filters}
        toggleFilter={toggleFilter}
        onSearch={handleSearch}
      />

      <main className="px-4">
        <MapView stations={filteredStations} onSelect={setSelected} onFindNearest={findNearest} />
      </main>

      <StationDetails station={selected} onClose={() => setSelected(null)} />

      <RecommendationDrawer
        open={openRecs}
        onToggle={() => setOpenRecs((v) => !v)}
        recommendations={MOCK_RECS}
        onFeedback={handleFeedback}
      />

      <footer className="mx-auto mt-16 max-w-6xl px-4 pb-20 text-center text-xs text-slate-500 md:pb-8">
        <p>
          This is a frontend UI prototype. Map, AI, auth, and persistence will connect to backend APIs in the next step.
        </p>
      </footer>
    </div>
  );
}
