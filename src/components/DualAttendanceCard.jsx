import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Pencil, 
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { calculatePercentage, getStatusCategory, getSafeBunks, getRequiredCatchup } from '../utils/attendanceUtils';

export const DualAttendanceCard = ({
  attendanceSource,
  onSelectSource,
  calendarStats,
  workingDaysData,
  onOpenEditInputModal
}) => {
  // Calendar data calculations
  const calAttended = calendarStats?.attended || 0;
  const calTotal = calendarStats?.total || 0;
  const calPercent = calculatePercentage(calAttended, calTotal);
  const calMeta = getStatusCategory(calPercent, calTotal);
  const calSafeBunks = getSafeBunks(calAttended, calTotal, 75);
  const calCatchup = getRequiredCatchup(calAttended, calTotal, 75);

  // Input working days calculations
  const inputAttended = workingDaysData?.attendedDays || 0;
  const inputTotal = workingDaysData?.totalDays || 0;
  const inputAbsent = Math.max(0, inputTotal - inputAttended);
  const inputPercent = calculatePercentage(inputAttended, inputTotal);
  const inputMeta = getStatusCategory(inputPercent, inputTotal);
  const inputSafeBunks = getSafeBunks(inputAttended, inputTotal, 75);
  const inputCatchup = getRequiredCatchup(inputAttended, inputTotal, 75);

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-md space-y-5">
      
      {/* Top Header & Switcher Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Dual Attendance Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Choose Percentage Source
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 mt-1">
            Attendance Percentage Options
          </h3>
          <p className="text-xs text-zinc-400">
            Compare attendance calculated from daily calendar markings vs. manual college working days input.
          </p>
        </div>

        {/* Source Toggle Pills */}
        <div className="flex items-center bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onSelectSource('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              attendanceSource === 'calendar'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar Data</span>
            {attendanceSource === 'calendar' && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectSource('input')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              attendanceSource === 'input'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Input Attendance</span>
            {attendanceSource === 'input' && <Check className="w-3 h-3 stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* Two Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* OPTION 1: THROUGH CALENDAR DATA */}
        <div
          onClick={() => onSelectSource('calendar')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
            attendanceSource === 'calendar'
              ? 'bg-zinc-900 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-lg'
              : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          {/* Top Title & Indicator */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">Option 1</span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-100">Through Calendar Data</h4>
                </div>
              </div>

              {attendanceSource === 'calendar' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Source
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-400 mt-2">
              Calculated dynamically from the periods & classes you mark in your daily schedule.
            </p>

            {/* Big Percentage & Metric */}
            <div className="mt-4 pt-3 border-t border-zinc-800/60">
              <div className="flex items-baseline gap-2.5">
                <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${calMeta.color}`}>
                  {calPercent}%
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  ({calAttended} / {calTotal} Classes Marked)
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-zinc-800 mt-2 overflow-hidden relative">
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10" 
                  style={{ left: '75%' }} 
                  title="75% Target Line" 
                />
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${calMeta.barColor}`}
                  style={{ width: `${Math.min(100, calPercent)}%` }}
                />
              </div>

              {/* Status Note */}
              <div className="mt-3 text-xs">
                {calTotal === 0 ? (
                  <span className="text-zinc-500 font-medium">No classes marked yet in calendar.</span>
                ) : calPercent >= 75 ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>75% Met! Safe buffer: <strong className="font-mono text-emerald-300">{calSafeBunks} classes</strong></span>
                  </span>
                ) : (
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Shortfall! Attend next: <strong className="font-mono text-rose-300">{calCatchup} classes</strong></span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-mono">Routine Marks</span>
            <span className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
              <span>{attendanceSource === 'calendar' ? 'Selected' : 'Click to Select'}</span>
            </span>
          </div>
        </div>

        {/* OPTION 2: INPUT ATTENDANCE (OFFICIAL SLIP) */}
        <div
          onClick={() => onSelectSource('input')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
            attendanceSource === 'input'
              ? 'bg-zinc-900 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-lg'
              : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          {/* Top Title & Indicator */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Option 2</span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-100">Through Input Attendance</h4>
                </div>
              </div>

              {attendanceSource === 'input' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Source
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-400 mt-2">
              Directly input official working days and attended days provided by the college.
            </p>

            {/* Big Percentage & Metric */}
            <div className="mt-4 pt-3 border-t border-zinc-800/60">
              <div className="flex items-baseline gap-2.5">
                <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${inputMeta.color}`}>
                  {inputPercent}%
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  ({inputAttended} / {inputTotal} Working Days)
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-zinc-800 mt-2 overflow-hidden relative">
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10" 
                  style={{ left: '75%' }} 
                  title="75% Target Line" 
                />
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${inputMeta.barColor}`}
                  style={{ width: `${Math.min(100, inputPercent)}%` }}
                />
              </div>

              {/* Status Note */}
              <div className="mt-3 text-xs">
                {inputTotal === 0 ? (
                  <span className="text-zinc-500 font-medium">Click "Edit Input" below to enter working days.</span>
                ) : inputPercent >= 75 ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>75% Met! Safe buffer: <strong className="font-mono text-emerald-300">{inputSafeBunks} days</strong></span>
                  </span>
                ) : (
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Shortfall! Attend next: <strong className="font-mono text-rose-300">{inputCatchup} days</strong></span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenEditInputModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3 text-emerald-400" />
              <span>{inputTotal > 0 ? 'Edit Input Numbers' : 'Enter Numbers'}</span>
            </button>

            <span className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
              <span>{attendanceSource === 'input' ? 'Selected' : 'Click to Select'}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
