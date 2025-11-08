import React from 'react';
import { Star, ExternalLink, MapPin, Recycle, Trash2, Zap, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeIcon = (type) => {
  switch (type) {
    case 'recycling':
      return <Recycle className="h-5 w-5 text-emerald-600" />;
    case 'ewaste':
      return <Zap className="h-5 w-5 text-sky-500" />;
    case 'compost':
      return <Leaf className="h-5 w-5 text-lime-600" />;
    default:
      return <Trash2 className="h-5 w-5 text-slate-600" />;
  }
};

export default function StationDetails({ station, onClose }) {
  return (
    <AnimatePresence>
      {station && (
        <motion.aside
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border bg-white/95 p-4 shadow-2xl backdrop-blur md:inset-auto md:right-6 md:top-20 md:mx-0 md:w-[380px]"
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-xl bg-slate-100 p-2">
              {typeIcon(station.type)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-slate-800">{station.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-600">
                <MapPin className="h-4 w-4" /> {station.address}
              </p>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {station.rating.toFixed(1)}</span>
                <span>• {station.distance.toFixed(1)} km away</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">{station.type}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
                >
                  Get Directions <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  className="rounded-xl border px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
