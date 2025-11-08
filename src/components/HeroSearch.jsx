import React from 'react';
import Spline from '@splinetool/react-spline';
import { LocateFixed, Search, Recycle, Trash2, Zap, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const filters = [
  { key: 'recycling', label: 'Recycling', icon: Recycle, color: 'text-emerald-500' },
  { key: 'dump', label: 'Dump', icon: Trash2, color: 'text-slate-500' },
  { key: 'ewaste', label: 'E-waste', icon: Zap, color: 'text-sky-500' },
  { key: 'compost', label: 'Compost', icon: Leaf, color: 'text-lime-600' },
];

export default function HeroSearch({ query, setQuery, onGeoLocate, activeFilters, toggleFilter, onSearch }) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-b-3xl bg-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/g5OaHmrKTDxRI7Ig/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-5xl"
        >
          Smart Waste Finder
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 max-w-2xl text-sm text-slate-200 md:text-base"
        >
          Locate nearby recycling, dump, e‑waste, and compost stations with intelligent recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-3xl"
        >
          <div className="flex items-center gap-2 rounded-2xl bg-white/90 p-2 shadow-xl backdrop-blur">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2">
              <Search className="h-5 w-5 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
                placeholder="Search by city, ZIP, or place name"
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none"
              />
            </div>
            <button
              onClick={onGeoLocate}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white hover:bg-slate-800 active:scale-[0.98]"
            >
              <LocateFixed className="h-5 w-5" />
              <span className="hidden sm:inline">Use My Location</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {filters.map(({ key, label, icon: Icon, color }) => {
            const active = activeFilters.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-emerald-600' : color}`} />
                {label}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
