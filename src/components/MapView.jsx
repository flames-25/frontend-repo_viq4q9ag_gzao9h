import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

// Lightweight mock map: visually represents pins; swap with real Mapbox/Google later
export default function MapView({ stations = [], onSelect, onFindNearest }) {
  return (
    <section className="relative mx-auto -mt-10 w-full max-w-6xl rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
      <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200">
        {/* Mock grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-white/0 via-white/20 to-white/0" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Pins */}
        <div className="relative z-10 h-full w-full">
          {stations.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => onSelect(s)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-label={`Open ${s.name}`}
            >
              <MapPin className={`h-7 w-7 drop-shadow ${
                s.type === 'recycling' ? 'text-emerald-600' : s.type === 'ewaste' ? 'text-sky-500' : s.type === 'compost' ? 'text-lime-600' : 'text-slate-600'
              }`} />
            </motion.button>
          ))}
        </div>

        {/* Find Nearest Floating Button */}
        <button
          onClick={onFindNearest}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-white shadow-lg hover:bg-emerald-700"
        >
          <Compass className="h-4 w-4" />
          Find Nearest
        </button>
      </div>
    </section>
  );
}
