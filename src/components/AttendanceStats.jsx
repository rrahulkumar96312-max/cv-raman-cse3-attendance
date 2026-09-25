import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Minus, 
  Calculator, 
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Flame,
  BookOpen
} from 'lucide-react';
import { SUBJECTS } from '../data/timetableData';
import { 
  calculatePercentage, 
  getSafeBunks, 
  getRequiredCatchup, 
  getStatusCategory 
} from '../utils/attendanceUtils';

export const AttendanceStats = ({
  subjectStats,
  onUpdateStats,
  onResetStats
}) => {
  const [targetPercentage, setTargetPercentage] = useState(75);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'THEORY' | 'PRACTICAL'

  // Calculate overall totals
  let totalAttended = 0;
  let totalConducted = 0;

  Object.keys(SUBJECTS).forEach((key) => {
    const stat = subjectStats[key] || { attended: 0, total: 0 };
    totalAttended += stat.attended;
    totalConducted += stat.total;
  });

  const overallPercent = calculatePercentage(totalAttended, totalConducted);
  const overallMeta = getStatusCategory(overallPercent, totalConducted);
  const overallSafeBunks = getSafeBunks(totalAttended, totalConducted, targetPercentage);
  const overallCatchup = getRequiredCatchup(totalAttended, totalConducted, targetPercentage);

  const subjectsList = Object.entries(SUBJECTS).filter(([key, subj]) => {
    if (filterType === 'THEORY') return subj.type === 'Theory';
    if (filterType === 'PRACTICAL') return subj.type === 'Practical';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Analytics */}
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Main Attendance Gauge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${overallMeta.bg} ${overallMeta.border} ${overallMeta.color}`}>
                {overallMeta.label}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                Mandatory SCTE&VT Criteria: {targetPercentage}%
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className={`text-5xl sm:text-6xl font-extrabold font-mono tracking-tighter ${overallMeta.color}`}>
                {overallPercent}%
              </span>
              <span className="text-zinc-400 text-sm font-mono">
                ({totalAttended} attended of {totalConducted} classes)
              </span>
            </div>

            {/* Smart Bunk / Catchup Insight */}
            <div className="pt-2">
              {totalConducted === 0 ? (
                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Clean Slate: No classes marked yet. Mark your first class in the 'Mark Attendance' tab or use the Steppers below to begin tracking your {targetPercentage}% compliance.
                  </span>
                </div>
              ) : overallPercent >= targetPercentage ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Bunk Cushion: You can safely miss up to{' '}
                    <strong className="font-bold underline decoration-emerald-500/50 font-mono">
                      {overallSafeBunks} classes
                    </strong>{' '}
                    and still stay above {targetPercentage}%.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 animate-bounce" />
                  <span>
                    Attendance Shortfall! You must attend the next{' '}
                    <strong className="font-bold underline decoration-rose-500/50 font-mono">
                      {overallCatchup} consecutive classes
                    </strong>{' '}
                    to regain {targetPercentage}%.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Target Configurator & Quick Actions */}
          <div className="flex flex-col gap-3 w-full lg:w-auto bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Set Compliance Target
            </span>
            <div className="flex items-center gap-1.5">
              {[75, 80, 85, 90].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTargetPercentage(pct)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    targetPercentage === pct
                      ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-800 text-[11px] text-zinc-500">
              <span>Overall Target: {targetPercentage}%</span>
              <button
                onClick={onResetStats}
                className="text-zinc-400 hover:text-zinc-200 underline"
                title="Reset back to default semester figures"
              >
                Reset Numbers
              </button>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
            <span>Semester Progress ({totalAttended}/{totalConducted})</span>
            <span className="text-zinc-300 font-semibold">{overallPercent}% / {targetPercentage}% Target</span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800/80 overflow-hidden relative">
            {/* Target line indicator */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-zinc-400/80 z-10"
              style={{ left: `${targetPercentage}%` }}
              title={`Target ${targetPercentage}%`}
            />
            <div 
              className={`h-full rounded-full transition-all duration-500 ${overallMeta.barColor}`}
              style={{ width: `${Math.min(100, overallPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
            Subject-Wise Attendance Breakdown
          </h3>
          <p className="text-xs text-zinc-400">
            Click + or - to quickly update classes after each lecture or practical.
          </p>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filterType === 'ALL'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All (9)
          </button>
          <button
            onClick={() => setFilterType('THEORY')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filterType === 'THEORY'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Theory (5)
          </button>
          <button
            onClick={() => setFilterType('PRACTICAL')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              filterType === 'PRACTICAL'
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Labs (4)
          </button>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectsList.map(([key, subj]) => {
          const stat = subjectStats[key] || { attended: 0, total: 0 };
          const percent = calculatePercentage(stat.attended, stat.total);
          const meta = getStatusCategory(percent, stat.total);
          const safeBunks = getSafeBunks(stat.attended, stat.total, targetPercentage);
          const catchupNeeded = getRequiredCatchup(stat.attended, stat.total, targetPercentage);

          return (
            <div
              key={key}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Code & Type */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {subj.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                    subj.type === 'Practical' 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                  }`}>
                    {subj.type} ({subj.periodsPerWeek} P/Wk)
                  </span>
                </div>

                {/* Subject Name */}
                <h4 className="text-base font-bold text-zinc-100 tracking-tight mt-1.5 line-clamp-1" title={subj.name}>
                  {subj.name}
                </h4>

                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                  Faculty: <span className="text-zinc-300 font-medium">{subj.faculty}</span>
                </p>

                {/* Big Percentage & Metric */}
                <div className="flex items-baseline justify-between mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-extrabold font-mono tracking-tight ${meta.color}`}>
                      {percent}%
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      ({stat.attended}/{stat.total})
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${meta.bg} ${meta.border} ${meta.color} border`}>
                    {meta.badgeText}
                  </span>
                </div>

                {/* Subject Progress Bar */}
                <div className="w-full h-2 rounded-full bg-zinc-800 mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${meta.barColor}`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>

                {/* Bunk / Catchup Insight Pill */}
                <div className="mt-3 py-2 px-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs">
                  {stat.total === 0 ? (
                    <span className="text-zinc-500 font-medium flex items-center gap-1.5">
                      <span>No classes recorded yet</span>
                    </span>
                  ) : percent >= targetPercentage ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Can safely bunk: <strong className="font-mono font-bold text-emerald-300">{safeBunks} class{safeBunks === 1 ? '' : 'es'}</strong></span>
                    </span>
                  ) : (
                    <span className="text-rose-400 font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Must attend next: <strong className="font-mono font-bold text-rose-300">{catchupNeeded} class{catchupNeeded === 1 ? '' : 'es'}</strong></span>
                    </span>
                  )}
                </div>
              </div>

              {/* Attendance Quick Steppers */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">Quick Stepper:</span>
                <div className="flex items-center gap-2">
                  {/* Attended (+1) */}
                  <button
                    onClick={() => onUpdateStats(key, 1, 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all font-mono font-semibold active:scale-95"
                    title="Mark 1 class attended (+1 Attended, +1 Total)"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Attended</span>
                  </button>

                  {/* Missed / Bunked (+0 Attended, +1 Total) */}
                  <button
                    onClick={() => onUpdateStats(key, 0, 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all font-mono font-semibold active:scale-95"
                    title="Mark 1 class missed (+0 Attended, +1 Total)"
                  >
                    <Minus className="w-3 h-3" />
                    <span>Missed</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
