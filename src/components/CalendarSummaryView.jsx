import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  TrendingUp, 
  Clock, 
  Check, 
  X, 
  ShieldCheck, 
  AlertTriangle,
  Award,
  Layers,
  MapPin,
  User,
  Filter
} from 'lucide-react';
import { 
  getMonthStats, 
  getWeekStats, 
  formatDateKey, 
  getDayCodeForDate, 
  getFirstDayOfMonth, 
  getDaysInMonth, 
  getMonthName 
} from '../utils/calendarUtils';
import { SUBJECTS, WEEKLY_TIMETABLE } from '../data/timetableData';
import { calculatePercentage, getStatusCategory } from '../utils/attendanceUtils';

export const CalendarSummaryView = ({
  userGroup,
  attendanceRecords,
  onMarkPeriod,
  onMarkAllToday
}) => {
  // Navigation State
  const [activeSubTab, setActiveSubTab] = useState('calendar'); // 'calendar' | 'weekly' | 'monthly'
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed: 8 is September)
  
  // Selected date on calendar (default: 2026-09-25)
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 25));

  // Selected week for weekly view (start date of Monday)
  const [selectedWeekStart, setSelectedWeekStart] = useState(() => {
    const d = new Date(2026, 8, 21); // Monday Sep 21, 2026
    return d;
  });

  // Calculate current month statistics
  const monthStats = getMonthStats(currentYear, currentMonth, attendanceRecords, userGroup);
  const monthMeta = getStatusCategory(monthStats.percent);

  // Calculate current week statistics
  const weekStats = getWeekStats(selectedWeekStart, attendanceRecords, userGroup);
  const weekMeta = getStatusCategory(weekStats.percent);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Week navigation (step by 7 days)
  const handlePrevWeek = () => {
    setSelectedWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 7);
      return next;
    });
  };

  const handleNextWeek = () => {
    setSelectedWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  // Calendar matrix preparation
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth); // 0 (Sun) - 6 (Sat)
  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const calendarCells = [];

  // Empty leading cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  // Days of month
  for (let d = 1; d <= totalDays; d++) {
    calendarCells.push(d);
  }

  // Selected Date breakdown
  const selectedDateStr = formatDateKey(selectedDate);
  const selectedDayCode = getDayCodeForDate(selectedDate);
  const selectedDaySchedule = WEEKLY_TIMETABLE[selectedDayCode];

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Attendance Intelligence
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Group {userGroup} Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mt-1">
              Calendar & Attendance Summaries
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Interactive calendar check-in, weekly progress cards, and monthly SCTE&VT compliance breakdown.
            </p>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="flex items-center bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'calendar'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Interactive Calendar
            </button>
            <button
              onClick={() => setActiveSubTab('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'weekly'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Weekly Summary
            </button>
            <button
              onClick={() => setActiveSubTab('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'monthly'
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Monthly Summary
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: INTERACTIVE CALENDAR VIEW */}
      {activeSubTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: The Monthly Calendar Grid */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              {/* Calendar Month Navigation Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <span>{monthStats.monthName}</span>
                    <span className="font-mono text-zinc-400 font-normal">{currentYear}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Click any date to inspect and mark period attendance.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-zinc-700"
                    title="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-zinc-700"
                    title="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of Week Header */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-mono font-semibold text-zinc-400">
                <span className="text-rose-400">Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Calendar Days Matrix */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarCells.map((dayNum, index) => {
                  if (!dayNum) {
                    return <div key={`empty-${index}`} className="h-14 sm:h-16 rounded-xl bg-zinc-950/20" />;
                  }

                  const thisDate = new Date(currentYear, currentMonth, dayNum);
                  const dateStr = formatDateKey(thisDate);
                  const isSelected = selectedDateStr === dateStr;
                  const isToday = formatDateKey(new Date()) === dateStr;
                  const daySummary = monthStats.daySummaryMap[dateStr];
                  const isSunday = daySummary?.isSunday;

                  // Color styling based on attendance
                  let badgeBg = "bg-zinc-950/60 border-zinc-800/80 text-zinc-400";
                  let statusDot = null;

                  if (isSunday) {
                    badgeBg = "bg-zinc-950/30 border-zinc-900 text-zinc-600";
                  } else if (daySummary && daySummary.total > 0) {
                    if (daySummary.percent >= 80) {
                      badgeBg = "bg-emerald-950/20 border-emerald-500/30 text-emerald-300";
                      statusDot = <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />;
                    } else if (daySummary.percent >= 60) {
                      badgeBg = "bg-amber-950/20 border-amber-500/30 text-amber-300";
                      statusDot = <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />;
                    } else {
                      badgeBg = "bg-rose-950/20 border-rose-500/30 text-rose-300";
                      statusDot = <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />;
                    }
                  }

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(thisDate)}
                      className={`h-14 sm:h-16 rounded-xl p-1.5 sm:p-2 border transition-all flex flex-col justify-between text-left ${
                        isSelected 
                          ? 'ring-2 ring-emerald-400 border-emerald-400 bg-zinc-900 shadow-md' 
                          : `${badgeBg} hover:border-zinc-600`
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-300 font-extrabold' : ''}`}>
                          {dayNum}
                        </span>
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="Today" />
                        )}
                        {statusDot && !isToday && statusDot}
                      </div>

                      {/* Mini Percentage / Note */}
                      <div className="text-[10px] font-mono leading-none">
                        {isSunday ? (
                          <span className="text-zinc-600">Off</span>
                        ) : daySummary && daySummary.total > 0 ? (
                          <span className="font-semibold">{daySummary.percent}%</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-3 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> &gt;=80%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> 60-79%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> &lt;60%
                </span>
              </div>
              <span className="text-zinc-500">
                Month: {monthStats.attendedClasses}/{monthStats.totalClasses} ({monthStats.percent}%)
              </span>
            </div>
          </div>

          {/* Right Column: Selected Date Schedule & Quick Marking */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
            <div>
              {/* Selected Day Header */}
              <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {selectedDayCode}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {selectedDateStr}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mt-1">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </h3>
                </div>

                {selectedDaySchedule && selectedDayCode !== "SUN" && (
                  <button
                    onClick={() => onMarkAllToday(selectedDayCode, "present")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all active:scale-95"
                  >
                    All Present
                  </button>
                )}
              </div>

              {/* Day Classes List */}
              <div className="mt-4 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {selectedDayCode === "SUN" ? (
                  <div className="py-12 text-center text-zinc-500 text-sm">
                    <CalendarIcon className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
                    <p className="font-semibold text-zinc-400">Sunday - Academic Holiday</p>
                    <p className="text-xs text-zinc-500 mt-1">No classes scheduled at C.V. Raman Polytechnic.</p>
                  </div>
                ) : selectedDaySchedule ? (
                  selectedDaySchedule.periods.map((period, idx) => {
                    if (period.type === "break") {
                      return (
                        <div key={`break-${idx}`} className="py-2 px-3 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/40 text-[11px] font-mono text-zinc-500 flex justify-between">
                          <span>{period.time}</span>
                          <span>LUNCH BREAK</span>
                        </div>
                      );
                    }
                    if (period.type === "free" || period.type === "study") {
                      return (
                        <div key={`free-${idx}`} className="py-2 px-3 rounded-lg border border-zinc-800/60 bg-zinc-950/30 text-[11px] font-mono text-zinc-500 flex justify-between">
                          <span>{period.time}</span>
                          <span>{period.title}</span>
                        </div>
                      );
                    }

                    // Resolve Subject
                    let subjKey = period.subjectKey;
                    let isLab = false;
                    let faculty = period.faculty;
                    let room = period.room;

                    if (period.type === "lab_split") {
                      isLab = true;
                      const lab = userGroup === "GR2" ? period.gr2 : period.gr1;
                      subjKey = lab.subjectKey;
                      faculty = lab.faculty;
                      room = lab.room;
                    }

                    const subject = SUBJECTS[subjKey];
                    const recordKey = `${selectedDateStr}_period_${idx}_${userGroup}`;
                    const currentStatus = attendanceRecords[recordKey] || "unmarked";

                    return (
                      <div
                        key={recordKey}
                        className={`p-3 rounded-xl border transition-all ${
                          currentStatus === 'present'
                            ? 'bg-emerald-950/20 border-emerald-500/30'
                            : currentStatus === 'absent'
                            ? 'bg-rose-950/20 border-rose-500/30'
                            : 'bg-zinc-950/50 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] font-mono font-bold text-zinc-300">
                                {subject?.short || subjKey}
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-[10px] font-mono text-zinc-400">
                                {period.time}
                              </span>
                              {isLab && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                  2h Lab
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                              {faculty} • {room}
                            </div>
                          </div>

                          {/* Quick Toggle Buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => onMarkPeriod(recordKey, subjKey, "present", isLab ? 2 : 1)}
                              className={`p-1.5 rounded-lg transition-all ${
                                currentStatus === 'present'
                                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                                  : 'bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-700'
                              }`}
                              title="Present"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              onClick={() => onMarkPeriod(recordKey, subjKey, "absent", isLab ? 2 : 1)}
                              className={`p-1.5 rounded-lg transition-all ${
                                currentStatus === 'absent'
                                  ? 'bg-rose-500 text-zinc-950 shadow-sm'
                                  : 'bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-700'
                              }`}
                              title="Absent"
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : null}
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
              <span>Date: {selectedDateStr}</span>
              <span className="text-zinc-400">Auto-saved to LocalStorage</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: WEEKLY SUMMARY VIEW */}
      {activeSubTab === 'weekly' && (
        <div className="space-y-6">
          {/* Week Selector Banner */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Weekly Report Card
                </span>
                <h3 className="text-xl font-bold text-zinc-100 mt-1">
                  Week of {selectedWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{' '}
                  {new Date(selectedWeekStart.getTime() + 5 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </h3>
                <p className="text-xs text-zinc-400">
                  Monday to Saturday classes analysis for Group {userGroup}.
                </p>
              </div>

              {/* Week Navigation Stepper */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevWeek}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Week</span>
                </button>
                <button
                  onClick={handleNextWeek}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition-colors"
                >
                  <span>Next Week</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Weekly Overview KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800/80">
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3.5">
                <span className="text-[10px] font-mono uppercase text-zinc-400">Total Classes</span>
                <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">
                  {weekStats.totalClasses}
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3.5">
                <span className="text-[10px] font-mono uppercase text-emerald-400">Attended</span>
                <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                  {weekStats.attendedClasses}
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3.5">
                <span className="text-[10px] font-mono uppercase text-rose-400">Missed</span>
                <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
                  {weekStats.missedClasses}
                </div>
              </div>

              <div className={`rounded-xl p-3.5 border ${weekMeta.bg} ${weekMeta.border}`}>
                <span className={`text-[10px] font-mono uppercase ${weekMeta.color}`}>Week Percentage</span>
                <div className={`text-2xl font-bold font-mono mt-1 ${weekMeta.color}`}>
                  {weekStats.percent}%
                </div>
              </div>
            </div>
          </div>

          {/* Day by Day Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weekStats.days.map((day) => {
              const dayPct = day.total > 0 ? Number(((day.attended / day.total) * 100).toFixed(0)) : 0;
              const meta = getStatusCategory(dayPct);

              return (
                <div
                  key={day.dateStr}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-100">
                        {day.dayName}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 flex items-baseline justify-between text-xs font-mono">
                      <span className="text-zinc-400">Attended: {day.attended}/{day.total}</span>
                      <span className={`font-bold ${meta.color}`}>{dayPct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${meta.barColor}`}
                        style={{ width: `${dayPct}%` }}
                      />
                    </div>

                    {/* Micro Period Tags */}
                    <div className="mt-4 space-y-1.5">
                      {day.periods.map((item, pIdx) => {
                        const subj = SUBJECTS[item.subjectKey];
                        return (
                          <div
                            key={`p-${pIdx}`}
                            className="flex items-center justify-between text-[11px] py-1 px-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80 font-mono"
                          >
                            <span className="text-zinc-300 truncate mr-2">
                              {subj?.short || item.subjectKey}
                            </span>
                            <span className={`font-bold uppercase ${
                              item.status === 'present' ? 'text-emerald-400' :
                              item.status === 'absent' ? 'text-rose-400' : 'text-zinc-500'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subject Performance for the Week */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h4 className="text-base font-bold text-zinc-100 mb-4">
              Subject Attendance For This Week
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(weekStats.subjectBreakdown).map(([k, stat]) => {
                const subj = SUBJECTS[k];
                const pct = calculatePercentage(stat.attended, stat.total);
                const sMeta = getStatusCategory(pct);

                return (
                  <div key={k} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-zinc-200">{subj?.short || k}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{stat.attended} of {stat.total} periods</div>
                    </div>
                    <span className={`font-mono font-bold ${sMeta.color}`}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MONTHLY SUMMARY VIEW */}
      {activeSubTab === 'monthly' && (
        <div className="space-y-6">
          {/* Month Selector Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[6, 7, 8, 9, 10, 11].map((mIdx) => {
              const isSelected = currentMonth === mIdx;
              const mName = getMonthName(mIdx).substring(0, 3);
              const mStat = getMonthStats(currentYear, mIdx, attendanceRecords, userGroup);

              return (
                <button
                  key={mIdx}
                  onClick={() => setCurrentMonth(mIdx)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-xs uppercase font-mono">{mName}</div>
                  <div className="text-sm font-extrabold font-mono mt-1">
                    {mStat.totalClasses > 0 ? `${mStat.percent}%` : '-'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Month Detail Hero */}
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${monthMeta.bg} ${monthMeta.border} ${monthMeta.color}`}>
                  {monthMeta.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight mt-2">
                  {monthStats.monthName} {currentYear} Attendance Audit
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Overall academic attendance report for C.V. Raman Polytechnic 3rd Semester CSE.
                </p>
              </div>

              <div className="flex items-baseline gap-2 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800">
                <span className={`text-4xl sm:text-5xl font-extrabold font-mono ${monthMeta.color}`}>
                  {monthStats.percent}%
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  ({monthStats.attendedClasses}/{monthStats.totalClasses} classes)
                </span>
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-zinc-800/80">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-center">
                <span className="text-xs font-mono uppercase text-zinc-400">Total Lectures Conducted</span>
                <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">
                  {monthStats.totalClasses}
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 text-center">
                <span className="text-xs font-mono uppercase text-emerald-400">Attended Classes</span>
                <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                  {monthStats.attendedClasses}
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 text-center">
                <span className="text-xs font-mono uppercase text-rose-400">Absences / Bunked</span>
                <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
                  {monthStats.missedClasses}
                </div>
              </div>
            </div>
          </div>

          {/* Subject-Wise Performance For The Month */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h4 className="text-base font-bold text-zinc-100 mb-4">
              Subject-Wise Breakdown for {monthStats.monthName}
            </h4>

            <div className="space-y-3">
              {Object.entries(monthStats.subjectBreakdown).map(([k, stat]) => {
                const subj = SUBJECTS[k];
                const pct = calculatePercentage(stat.attended, stat.total);
                const sMeta = getStatusCategory(pct);

                return (
                  <div
                    key={k}
                    className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-300">
                          {subj?.code || k}
                        </span>
                        <span className="text-xs text-zinc-500">•</span>
                        <span className="text-xs text-zinc-400 truncate">
                          {subj?.name}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-500 mt-0.5">
                        Faculty: {subj?.faculty}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono text-zinc-400">
                          {stat.attended} / {stat.total} periods
                        </div>
                        <div className={`text-base font-bold font-mono ${sMeta.color}`}>
                          {pct}%
                        </div>
                      </div>

                      <div className="w-24 sm:w-32 h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${sMeta.barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
