import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Pencil, 
  Percent, 
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { calculatePercentage, getStatusCategory, getSafeBunks, getRequiredCatchup } from '../utils/attendanceUtils';

export const WorkingDaysCard = ({
  workingDaysData,
  onOpenEditModal
}) => {
  const totalDays = workingDaysData?.totalDays || 0;
  const attendedDays = workingDaysData?.attendedDays || 0;
  const absentDays = Math.max(0, totalDays - attendedDays);
  const percent = calculatePercentage(attendedDays, totalDays);
  const statusMeta = getStatusCategory(percent, totalDays);
  const safeBunks = getSafeBunks(attendedDays, totalDays, 75);
  const catchupNeeded = getRequiredCatchup(attendedDays, totalDays, 75);

  return (
    <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-md transition-all hover:border-zinc-700/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Info: Working Days & Percentage */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Calendar className="w-6 h-6 stroke-[2]" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                Official College Attendance
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusMeta.bg} ${statusMeta.border} ${statusMeta.color}`}>
                {statusMeta.badgeText}
              </span>
            </div>

            {totalDays > 0 ? (
              <div className="flex items-baseline gap-3 mt-1.5 flex-wrap">
                <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${statusMeta.color}`}>
                  {percent}%
                </span>
                <span className="text-xs sm:text-sm font-mono text-zinc-300">
                  <strong className="text-emerald-400 font-bold">{attendedDays}</strong> Attended / <strong className="text-zinc-100 font-bold">{totalDays}</strong> Total Working Days
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  ({absentDays} Days Absent)
                </span>
              </div>
            ) : (
              <div className="mt-1">
                <h4 className="text-base sm:text-lg font-bold text-zinc-200">
                  Total Working Days Not Configured
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Received your attendance details from college? Enter your total working days and attended days to calculate verified percentage.
                </p>
              </div>
            )}

            {/* Smart Insight row */}
            {totalDays > 0 && (
              <div className="mt-2 text-xs font-medium">
                {percent >= 75 ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>75% Met! You can safely take <strong className="font-bold underline decoration-emerald-500/50 font-mono">{safeBunks} more working days off</strong> without falling below 75%.</span>
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                    <span>Attendance Shortfall! Must attend the next <strong className="font-bold underline decoration-rose-500/50 font-mono">{catchupNeeded} working days consecutively</strong> to reach 75%.</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Action: Edit Button */}
        <div className="self-end md:self-center shrink-0">
          <button
            type="button"
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 hover:text-white text-xs sm:text-sm font-semibold border border-zinc-700/80 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-emerald-400" />
            <span>{totalDays > 0 ? 'Edit Working Days' : 'Enter Working Days'}</span>
          </button>
        </div>

      </div>

      {/* Progress Bar (when days > 0) */}
      {totalDays > 0 && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80">
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 mb-1.5">
            <span>Working Days Attendance Ratio ({attendedDays}/{totalDays})</span>
            <span className="text-zinc-300 font-bold">{percent}% / 75% Criteria</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10" 
              style={{ left: '75%' }} 
              title="75% Target Line" 
            />
            <div 
              className={`h-full rounded-full transition-all duration-500 ${statusMeta.barColor}`}
              style={{ width: `${Math.min(100, percent)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
