import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Save, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  TrendingUp,
  Percent
} from 'lucide-react';
import { SUBJECTS } from '../data/timetableData';
import { calculatePercentage, getStatusCategory, getSafeBunks, getRequiredCatchup } from '../utils/attendanceUtils';

export const WorkingDaysModal = ({
  isOpen,
  onClose,
  workingDaysData,
  onSaveWorkingDays,
  subjectStats,
  onSaveSubjectStats
}) => {
  const [activeMode, setActiveMode] = useState('working_days'); // 'working_days' | 'subject_classes'
  
  // Working days state
  const [totalDays, setTotalDays] = useState(workingDaysData?.totalDays || 0);
  const [attendedDays, setAttendedDays] = useState(workingDaysData?.attendedDays || 0);
  const [semesterTargetDays, setSemesterTargetDays] = useState(workingDaysData?.semesterTargetDays || 90);
  const [useAsPrimary, setUseAsPrimary] = useState(workingDaysData?.useWorkingDaysAsPrimary !== false);

  // Subject classes state
  const [editableSubjects, setEditableSubjects] = useState({});

  useEffect(() => {
    if (workingDaysData) {
      setTotalDays(workingDaysData.totalDays || 0);
      setAttendedDays(workingDaysData.attendedDays || 0);
      setSemesterTargetDays(workingDaysData.semesterTargetDays || 90);
      setUseAsPrimary(workingDaysData.useWorkingDaysAsPrimary !== false);
    }
    if (subjectStats) {
      setEditableSubjects(JSON.parse(JSON.stringify(subjectStats)));
    }
  }, [workingDaysData, subjectStats, isOpen]);

  if (!isOpen) return null;

  // Real-time calculations for working days
  const currentTotal = Math.max(0, Number(totalDays) || 0);
  const currentAttended = Math.min(currentTotal, Math.max(0, Number(attendedDays) || 0));
  const currentAbsent = Math.max(0, currentTotal - currentAttended);
  const currentPercent = calculatePercentage(currentAttended, currentTotal);
  const statusMeta = getStatusCategory(currentPercent, currentTotal);
  const safeBunks = getSafeBunks(currentAttended, currentTotal, 75);
  const catchupNeeded = getRequiredCatchup(currentAttended, currentTotal, 75);

  // Calculations for remaining semester target
  const targetDays = Math.max(currentTotal, Number(semesterTargetDays) || 90);
  const remainingDays = Math.max(0, targetDays - currentTotal);
  const neededForSemester75 = Math.ceil(0.75 * targetDays);
  const additionalAttendedNeeded = Math.max(0, neededForSemester75 - currentAttended);

  // Handlers for subject classes editing
  const handleSubjectChange = (key, field, val) => {
    const num = Math.max(0, Number(val) || 0);
    setEditableSubjects((prev) => {
      const existing = prev[key] || { attended: 0, total: 0 };
      const updated = { ...existing, [field]: num };
      // Ensure attended doesn't exceed total
      if (field === 'attended' && num > updated.total) {
        updated.total = num;
      }
      return {
        ...prev,
        [key]: updated
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeMode === 'working_days') {
      onSaveWorkingDays({
        totalDays: currentTotal,
        attendedDays: currentAttended,
        semesterTargetDays: targetDays,
        useWorkingDaysAsPrimary: useAsPrimary
      });
    } else {
      onSaveSubjectStats(editableSubjects);
    }
    onClose();
  };

  const handleReset = () => {
    if (window.confirm("Reset working days details back to 0?")) {
      setTotalDays(0);
      setAttendedDays(0);
      setSemesterTargetDays(90);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Percent className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
              Attendance Details & Working Days
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Input official college attendance data to compute live percentages and 75% compliance.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 mb-6">
          <button
            type="button"
            onClick={() => setActiveMode('working_days')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeMode === 'working_days'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Total Working Days (Official Slip)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('subject_classes')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeMode === 'subject_classes'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Subject-wise Classes</span>
          </button>
        </div>

        {/* MODE 1: WORKING DAYS */}
        {activeMode === 'working_days' && (
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Live Percentage Banner Card */}
            <div className={`p-5 rounded-2xl border ${statusMeta.bg} ${statusMeta.border} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${statusMeta.border} ${statusMeta.color}`}>
                  {statusMeta.label}
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tight ${statusMeta.color}`}>
                    {currentPercent}%
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    ({currentAttended} / {currentTotal} Working Days)
                  </span>
                </div>
              </div>

              {/* Quick Insight */}
              <div className="text-xs font-medium text-zinc-300 max-w-xs text-left sm:text-right">
                {currentTotal === 0 ? (
                  <span className="text-zinc-400">Enter your total working days and attended days below to calculate percentage.</span>
                ) : currentPercent >= 75 ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 sm:justify-end">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>You can miss up to <strong className="font-bold text-emerald-300 underline font-mono">{safeBunks} days</strong> and remain &gt;= 75%.</span>
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5 sm:justify-end">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Need to attend next <strong className="font-bold text-rose-300 underline font-mono">{catchupNeeded} consecutive days</strong> to hit 75%.</span>
                  </span>
                )}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Working Days Conducted */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Total Working Days (Conducted) <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="300"
                    placeholder="e.g. 45"
                    value={totalDays === 0 ? '' : totalDays}
                    onChange={(e) => setTotalDays(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">
                    Days
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">Total college working days held so far.</p>
              </div>

              {/* Total Days Attended */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                  Days Attended (Present) <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max={currentTotal || 300}
                    placeholder="e.g. 38"
                    value={attendedDays === 0 ? '' : attendedDays}
                    onChange={(e) => setAttendedDays(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">
                    Days
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Days Absent: <strong className="text-rose-400 font-mono">{currentAbsent} days</strong>
                </p>
              </div>
            </div>

            {/* Optional Semester Target Days */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-zinc-200">Semester Total Target Days</span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">SCTE&VT semester standard is typically 90 working days.</p>
                </div>
                <div className="w-28 shrink-0">
                  <input
                    type="number"
                    min={currentTotal || 1}
                    value={semesterTargetDays}
                    onChange={(e) => setSemesterTargetDays(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-200 text-center"
                  />
                </div>
              </div>

              {currentTotal > 0 && (
                <div className="mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between flex-wrap gap-2">
                  <span>Remaining in Semester: <strong className="text-zinc-200 font-mono">{remainingDays} days</strong></span>
                  <span>Must Attend out of remaining: <strong className="text-emerald-400 font-mono">{additionalAttendedNeeded} days</strong></span>
                </div>
              )}
            </div>

            {/* Checkbox: Use Working Days as Primary Header Display */}
            <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useAsPrimary}
                onChange={(e) => setUseAsPrimary(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Display this official working days percentage in top navigation badge</span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Numbers</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Working Days</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MODE 2: SUBJECT-WISE CLASSES DIRECT EDIT */}
        {activeMode === 'subject_classes' && (
          <form onSubmit={handleSave} className="space-y-5">
            <p className="text-xs text-zinc-400">
              Directly type the exact number of classes attended and conducted for each subject from your slip:
            </p>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {Object.entries(SUBJECTS).map(([key, subj]) => {
                const current = editableSubjects[key] || { attended: 0, total: 0 };
                const pct = calculatePercentage(current.attended, current.total);
                const sMeta = getStatusCategory(pct, current.total);

                return (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-300">{subj.code}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 truncate">{subj.name}</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {subj.type} ({subj.periodsPerWeek} P/Wk)
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-[11px] text-zinc-500">Attended:</span>
                        <input
                          type="number"
                          min="0"
                          value={current.attended}
                          onChange={(e) => handleSubjectChange(key, 'attended', e.target.value)}
                          className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-center font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-[11px] text-zinc-500">Total:</span>
                        <input
                          type="number"
                          min="0"
                          value={current.total}
                          onChange={(e) => handleSubjectChange(key, 'total', e.target.value)}
                          className="w-16 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-center font-bold text-zinc-200 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className={`w-14 text-right font-mono font-bold ${sMeta.color}`}>
                        {pct}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Subject Classes</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
