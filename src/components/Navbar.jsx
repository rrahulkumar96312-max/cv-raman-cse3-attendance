import React from 'react';
import { Calendar, BookOpen, Clock, ShieldCheck, CheckCircle2, User, Edit3, Percent, Pencil } from 'lucide-react';
import { COLLEGE_INFO } from '../data/timetableData';
import { calculatePercentage, getStatusCategory } from '../utils/attendanceUtils';

export const Navbar = ({
  activeTab,
  setActiveTab,
  userGroup,
  setUserGroup,
  overallPercent,
  statusMeta,
  studentName,
  regNumber,
  onOpenProfileModal,
  workingDaysData,
  onOpenWorkingDaysModal,
  attendanceSource = 'calendar',
  onSelectAttendanceSource
}) => {
  const hasWorkingDays = (workingDaysData?.totalDays || 0) > 0;
  const workingDaysPercent = hasWorkingDays 
    ? calculatePercentage(workingDaysData.attendedDays, workingDaysData.totalDays)
    : 0;
  const workingDaysMeta = getStatusCategory(workingDaysPercent, workingDaysData?.totalDays || 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* User Name & Registration Number Header (Replacing college title) */}
          <div className="flex items-center gap-3 min-w-0">
            {studentName ? (
              <div 
                onClick={onOpenProfileModal}
                className="flex items-center gap-3 min-w-0 cursor-pointer group"
                title="Click to edit Name or Registration Number"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-base shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-100 truncate group-hover:text-emerald-400 transition-colors">
                      {studentName}
                    </span>
                    <span className="p-0.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5 font-mono">
                    <span className="text-emerald-400 font-semibold">{regNumber}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400 font-sans">3rd Sem CSE</span>
                  </p>
                </div>
              </div>
            ) : (
              <button 
                type="button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-3 text-left group cursor-pointer"
                title="Click to set your name and registration number"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-dashed border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      Enter Name & Reg No.
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-zinc-400 truncate font-mono">
                    Click to register student profile
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Quick Group Switcher & Stats Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Group Toggle */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setUserGroup("GR1")}
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
                className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  userGroup === "GR2"
                    ? "bg-emerald-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                GR 2
              </button>
            </div>

            {/* Dual Attendance Percentage Switcher (Option 1: Calendar vs. Option 2: Input) */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 shadow-sm">
              {/* Option 1: Calendar Data */}
              <button
                type="button"
                onClick={() => onSelectAttendanceSource?.('calendar')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  attendanceSource === 'calendar'
                    ? `${statusMeta.bg} ${statusMeta.color} font-bold border ${statusMeta.border} shadow-sm`
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Option 1: Attendance calculated from Calendar / Schedule marks"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium text-zinc-400">Cal:</span>
                <span className="font-mono font-bold">{overallPercent}%</span>
              </button>

              <span className="text-zinc-700 mx-0.5 text-xs font-mono">|</span>

              {/* Option 2: Input Attendance */}
              <button
                type="button"
                onClick={() => onSelectAttendanceSource?.('input')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  attendanceSource === 'input'
                    ? `${workingDaysMeta.bg} ${workingDaysMeta.color} font-bold border ${workingDaysMeta.border} shadow-sm`
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Option 2: Attendance from Manual College Input (Working Days slip)"
              >
                <Edit3 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px] font-medium text-zinc-400">Input:</span>
                <span className="font-mono font-bold">{workingDaysPercent}%</span>
              </button>

              {/* Quick Pencil to Edit Working Days Numbers */}
              <button
                type="button"
                onClick={onOpenWorkingDaysModal}
                className="p-1 text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/80 rounded-md transition-colors ml-0.5 cursor-pointer"
                title="Edit College Working Days & Attended Days"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar border-t border-zinc-900/80">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Calendar & Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'timetable'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Weekly Timetable</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
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
