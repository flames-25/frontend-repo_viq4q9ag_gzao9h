import React from 'react';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecommendationDrawer({ open, recommendations = [], onFeedback, onToggle }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-6xl px-4 md:inset-auto md:right-6 md:top-24 md:w-[360px] md:px-0">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur md:rounded-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold">Smart Suggestions</h4>
              </div>
              <button onClick={onToggle} className="text-sm text-slate-500 hover:text-slate-700">Hide</button>
            </div>
            <ul className="space-y-3">
              {recommendations.map((r) => (
                <li key={r.id} className="flex items-center gap-3 rounded-xl border p-2">
                  <img src={r.thumb} alt="thumb" className="h-14 w-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-500">{r.reason}</p>
                    <div className="mt-1 flex gap-1">
                      <button onClick={() => onFeedback(r.id, true)} className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                        <ThumbsUp className="h-3 w-3" />
                        Helpful
                      </button>
                      <button onClick={() => onFeedback(r.id, false)} className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600">
                        <ThumbsDown className="h-3 w-3" />
                        Not now
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <button
          onClick={onToggle}
          className="pointer-events-auto mt-2 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-slate-700 shadow ring-1 ring-black/5 backdrop-blur hover:bg-white"
        >
          <Sparkles className="h-4 w-4 text-emerald-600" /> Show suggestions
        </button>
      )}
    </div>
  );
}
