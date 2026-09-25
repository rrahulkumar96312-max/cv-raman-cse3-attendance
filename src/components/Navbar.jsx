import React from 'react';
import { Calendar, Users, BookOpen, Clock, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { COLLEGE_INFO } from '../data/timetableData';

export const Navbar = ({
  activeTab,
  setActiveTab,
  userGroup,
  setUserGroup,
  overallPercent,
  statusMeta
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand & Polytechnic Header */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <BookOpen className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-100 truncate">
                  {COLLEGE_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {COLLEGE_INFO.session}
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 border border-zinc-800">
                  Room {COLLEGE_INFO.defaultRoom}
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5">
                <span>{COLLEGE_INFO.semester}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500 hidden sm:inline">w.e.f {COLLEGE_INFO.wef}</span>
              </p>
            </div>
          </div>

          {/* Quick Group Switcher & Stats Badge */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Group Toggle */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setUserGroup("GR1")}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  userGroup === "GR1"
                    ? "bg-emerald-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                GR 1
              </button>
              <button
                type="button"
                onClick={() => setUserGroup("GR2")}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  userGroup === "GR2"
                    ? "bg-emerald-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                GR 2
              </button>
            </div>

            {/* Attendance Percentage Badge */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusMeta.bg} ${statusMeta.border}`}>
              <ShieldCheck className={`w-4 h-4 ${statusMeta.color}`} />
              <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Total Attendance</span>
                <span className={`text-sm font-bold font-mono leading-none ${statusMeta.color}`}>
                  {overallPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar border-t border-zinc-900/80">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'daily'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'timetable'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Weekly Timetable</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'analytics'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>75% Bunk Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'roster'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Users className="w-4 h-4 text-violet-400" />
            <span>Batch Roll Call (CR)</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === 'subjects'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Subjects & Faculty</span>
          </button>
        </div>
      </div>
    </header>
  );
};
