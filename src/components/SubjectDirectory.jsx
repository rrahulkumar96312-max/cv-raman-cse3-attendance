import React, { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  User, 
  Clock, 
  Layers, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { SUBJECTS, COLLEGE_INFO } from '../data/timetableData';

export const SubjectDirectory = () => {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'Theory' | 'Practical'

  const subjects = Object.values(SUBJECTS).filter((s) => {
    if (filter === 'ALL') return true;
    return s.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Curriculum & Faculty
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                SCTE&VT Odisha Scheme
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mt-1">
              3rd Semester CSE Subject Directory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Complete subject codes, period allocation, allotted faculty, and designated labs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'ALL'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Subjects (9)
            </button>
            <button
              onClick={() => setFilter('Theory')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'Theory'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Theory (5)
            </button>
            <button
              onClick={() => setFilter('Practical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'Practical'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Practical (4)
            </button>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subj) => (
          <div
            key={subj.code}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Tag Row */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {subj.code}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                  subj.type === 'Practical' 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                }`}>
                  {subj.type}
                </span>
              </div>

              {/* Subject Title */}
              <h3 className="text-lg font-bold text-zinc-100 tracking-tight mt-2">
                {subj.name}
              </h3>
              <div className="text-xs font-mono text-zinc-500 mt-0.5">
                Abbreviation: <span className="text-zinc-300 font-semibold">{subj.short}</span>
              </div>

              {/* Info Details */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-zinc-400">
                  <User className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500">Faculty In-charge:</span>
                    <p className="text-zinc-200 font-medium">{subj.faculty}</p>
                    <span className="text-[10px] text-zinc-500 font-mono">({subj.facultyShort})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>
                    Weekly Load: <strong className="text-zinc-200 font-mono">{subj.periodsPerWeek} Periods / Week</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>
                    Designated Venue: <strong className="text-zinc-200 font-mono">{subj.room}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom SCTE&VT Tag */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>SCTE&VT Winter-2026</span>
              <span className="text-emerald-400/80">Min 75% Req.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Polytechnic Department Info Footnote */}
      <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <Building className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-semibold text-zinc-200">{COLLEGE_INFO.department}</div>
            <div className="text-zinc-500">{COLLEGE_INFO.name}, {COLLEGE_INFO.city}</div>
          </div>
        </div>
        <div className="text-zinc-500 font-mono">
          Head of Department (HOD) Approved Routine
        </div>
      </div>
    </div>
  );
};
