import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Check, 
  X, 
  MinusCircle, 
  CheckCircle2, 
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SUBJECTS, WEEKLY_TIMETABLE } from '../data/timetableData';

export const TodaySchedule = ({
  selectedDay,
  setSelectedDay,
  userGroup,
  attendanceRecords,
  onMarkPeriod,
  onMarkAllToday,
  subjectStats,
  currentLiveDay,
  currentLiveSlot
}) => {
  const daysOfWeek = [
    { code: "MON", label: "Mon" },
    { code: "TUE", label: "Tue" },
    { code: "WED", label: "Wed" },
    { code: "THU", label: "Thu" },
    { code: "FRI", label: "Fri" },
    { code: "SAT", label: "Sat" }
  ];

  const currentDayData = WEEKLY_TIMETABLE[selectedDay] || WEEKLY_TIMETABLE.MON;

  return (
    <div className="space-y-6">
      {/* Top Banner / Day Selector */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Group: {userGroup}
              </span>
              {selectedDay === currentLiveDay && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Today
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mt-2">
              {currentDayData.fullDay} Schedule
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Review and record your attendance for 3rd Sem classes at C.V. Raman Polytechnic.
            </p>
          </div>

          {/* Quick Mark All Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onMarkAllToday(selectedDay, "present")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={() => onMarkAllToday(selectedDay, "absent")}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 font-medium text-xs sm:text-sm border border-zinc-700 transition-all active:scale-95"
              title="Mark all as absent"
            >
              <X className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Mark All Absent</span>
            </button>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="grid grid-cols-6 gap-2 mt-6 pt-5 border-t border-zinc-800/80">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDay === day.code;
            const isToday = currentLiveDay === day.code;

            return (
              <button
                key={day.code}
                onClick={() => setSelectedDay(day.code)}
                className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-xl text-center transition-all ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md'
                    : 'bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800/60'
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-mono">
                  {day.label}
                </span>
                {isToday && (
                  <span className={`text-[9px] mt-1 px-1.5 rounded-full font-mono font-medium ${
                    isSelected ? 'bg-zinc-900 text-emerald-300' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Periods List */}
      <div className="space-y-3">
        {currentDayData.periods.map((period, index) => {
          // If break
          if (period.type === "break") {
            return (
              <div 
                key={`break-${index}`}
                className="py-3 px-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 flex items-center justify-between text-zinc-500 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{period.time}</span>
                </div>
                <span className="font-semibold tracking-wide text-zinc-400">
                  LUNCH BREAK (1:00 PM - 2:00 PM)
                </span>
                <span className="text-[11px] text-zinc-600">60 mins</span>
              </div>
            );
          }

          // If free / study
          if (period.type === "free") {
            return (
              <div 
                key={`free-${index}`}
                className="py-3 px-4 rounded-xl border border-zinc-800/60 bg-zinc-950/30 flex items-center justify-between text-zinc-500 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{period.time}</span>
                </div>
                <span className="text-zinc-500 italic">No Academic Period Scheduled (XXXXX)</span>
                <span>-</span>
              </div>
            );
          }

          if (period.type === "study") {
            return (
              <div 
                key={`study-${index}`}
                className="py-3.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-zinc-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{period.time}</span>
                </div>
                <div className="font-medium text-zinc-300 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px]">
                    LIBRARY STUDY
                  </span>
                  <span className="text-zinc-500 text-[11px]">Central Library Reading Hall</span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">Period 7</span>
              </div>
            );
          }

          // Resolve Subject & Details
          let subjectKey = "";
          let facultyDisplay = "";
          let roomDisplay = "";
          let isLab = false;
          let durationNotice = "";

          if (period.type === "lab_split") {
            isLab = true;
            const groupLab = userGroup === "GR2" ? period.gr2 : period.gr1;
            subjectKey = groupLab.subjectKey;
            facultyDisplay = groupLab.faculty;
            roomDisplay = groupLab.room;
            durationNotice = "2-Hour Practical Lab Session";
          } else {
            subjectKey = period.subjectKey;
            facultyDisplay = period.faculty;
            roomDisplay = period.room;
          }

          const subject = SUBJECTS[subjectKey];
          const periodRecordKey = `${selectedDay}_period_${index}_${userGroup}`;
          const currentStatus = attendanceRecords[periodRecordKey] || "unmarked";

          return (
            <div
              key={periodRecordKey}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                currentStatus === 'present'
                  ? 'bg-emerald-950/15 border-emerald-500/30'
                  : currentStatus === 'absent'
                  ? 'bg-rose-950/15 border-rose-500/30'
                  : currentStatus === 'holiday'
                  ? 'bg-amber-950/10 border-amber-500/20'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left Info Column */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border ${
                    subject?.badgeColor || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {isLab ? "LAB" : "TH"}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-semibold text-zinc-400">
                        {subject?.code || subjectKey}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {period.time}
                      </span>
                      {isLab && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {durationNotice}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight mt-1 truncate">
                      {subject?.name || period.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-zinc-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Faculty: <strong className="text-zinc-300 font-medium">{facultyDisplay}</strong></span>
                      </div>
                      <span className="text-zinc-700">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Venue: <strong className="text-zinc-300 font-medium">{roomDisplay}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Attendance Controls */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t border-zinc-800/60 lg:border-t-0 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-xs text-zinc-400 lg:hidden">
                    Status: <strong className="uppercase font-mono text-zinc-200">{currentStatus}</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Mark Present */}
                    <button
                      onClick={() => onMarkPeriod(periodRecordKey, subjectKey, "present", isLab ? 2 : 1)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentStatus === "present"
                          ? "bg-emerald-500 text-zinc-950 shadow-md ring-2 ring-emerald-500/30 font-bold"
                          : "bg-zinc-800/80 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400 border border-zinc-700"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Present</span>
                    </button>

                    {/* Mark Absent */}
                    <button
                      onClick={() => onMarkPeriod(periodRecordKey, subjectKey, "absent", isLab ? 2 : 1)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        currentStatus === "absent"
                          ? "bg-rose-500 text-zinc-950 shadow-md ring-2 ring-rose-500/30 font-bold"
                          : "bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 border border-zinc-700"
                      }`}
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Absent</span>
                    </button>

                    {/* Mark Cancelled / Holiday */}
                    <button
                      onClick={() => onMarkPeriod(periodRecordKey, subjectKey, "holiday", 0)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        currentStatus === "holiday"
                          ? "bg-amber-500 text-zinc-950 font-bold shadow-md"
                          : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                      }`}
                      title="Class cancelled or holiday"
                    >
                      <MinusCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">No Class</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
