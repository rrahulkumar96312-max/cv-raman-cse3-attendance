import React, { useState } from 'react';
import { 
  Printer, 
  Sparkles, 
  MapPin, 
  User, 
  Clock, 
  Layers, 
  Eye, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { SUBJECTS, COLLEGE_INFO } from '../data/timetableData';

export const TimetableView = ({ userGroup, setUserGroup }) => {
  const [viewMode, setViewMode] = useState('combined'); // 'combined' | 'personal'
  const [selectedCell, setSelectedCell] = useState(null);

  const days = [
    { id: "MON", label: "Monday" },
    { id: "TUE", label: "Tuesday" },
    { id: "WED", label: "Wednesday" },
    { id: "THU", label: "Thursday" },
    { id: "FRI", label: "Friday" },
    { id: "SAT", label: "Saturday" },
  ];

  return (
    <div className="space-y-6">
      {/* View Header & Action Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Official Routine
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Room {COLLEGE_INFO.defaultRoom}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mt-1">
              3rd Semester CSE Master Timetable
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Session {COLLEGE_INFO.session} • C.V. Raman Polytechnic, Bhubaneswar
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('combined')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'combined'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Official Master View
              </button>
              <button
                onClick={() => setViewMode('personal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'personal'
                    ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                My Group ({userGroup})
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition-all"
              title="Print timetable"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Timetable Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-zinc-950/90 border-b border-zinc-800 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 w-24 border-r border-zinc-800 text-center font-bold text-zinc-200">
                  Day / Time
                </th>
                <th className="py-3.5 px-3 border-r border-zinc-800 text-center">
                  10:00 - 11:00
                </th>
                <th className="py-3.5 px-3 border-r border-zinc-800 text-center">
                  11:00 - 12:00
                </th>
                <th className="py-3.5 px-3 border-r border-zinc-800 text-center">
                  12:00 - 01:00
                </th>
                <th className="py-3.5 px-2 border-r border-zinc-800 text-center w-16 bg-zinc-900/60 font-semibold text-zinc-400">
                  01:00-02:00
                </th>
                <th className="py-3.5 px-3 border-r border-zinc-800 text-center">
                  02:00 - 03:00
                </th>
                <th className="py-3.5 px-3 border-r border-zinc-800 text-center">
                  03:00 - 04:00
                </th>
                <th className="py-3.5 px-3 text-center">
                  04:00 - 05:00
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/80">
              {/* MONDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-emerald-400 font-mono">
                  MON
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DS (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 (2 cols spanned) */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-cyan-950/20 border border-cyan-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-cyan-300">C++ LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(PRD, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-rose-950/20 border border-rose-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-rose-300">DE LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SP, BJ) • DE Lab</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-rose-400 font-medium text-[11px]">
                        DE LAB (GR1) (SP, BJ)
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-cyan-400 font-medium text-[11px]">
                        C++ LAB (GR2) (PRD, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                {/* BREAK */}
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                {/* 2:00 - 3:00 */}
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">PYTHON (JM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 3:00 - 4:00 */}
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-violet-950/20 border border-violet-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">ALGORITHM (KSM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 4:00 - 5:00 */}
                <td className="py-3 px-3 text-center text-zinc-600 font-mono">
                  XXXXX
                </td>
              </tr>

              {/* TUESDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-sky-400 font-mono">
                  TUE
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">PYTHON (JM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-cyan-950/20 border border-cyan-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-cyan-300">C++ LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(PRD, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-rose-950/20 border border-rose-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-rose-300">DE LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SP, BJ) • DE Lab</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-rose-400 font-medium text-[11px]">
                        DE LAB (GR2) (SP, BJ)
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-cyan-400 font-medium text-[11px]">
                        C++ LAB (GR1) (PRD, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DE & CO (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-violet-950/20 border border-violet-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">ALGORITHM (KSM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-zinc-600 font-mono">
                  XXXXX
                </td>
              </tr>

              {/* WEDNESDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-amber-400 font-mono">
                  WED
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DE & CO (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-cyan-950/20 border border-cyan-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-cyan-300">C++ LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(PRD, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-rose-950/20 border border-rose-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-rose-300">DE LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SP, BJ) • DE Lab</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-rose-400 font-medium text-[11px]">
                        DE LAB (GR1) (SP, BJ)
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-cyan-400 font-medium text-[11px]">
                        C++ LAB (GR2) (PRD, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DS (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-sky-950/20 border border-sky-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">C++ (PRD)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-zinc-600 font-mono">
                  XXXXX
                </td>
              </tr>

              {/* THURSDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-indigo-400 font-mono">
                  THU
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DE & CO (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-cyan-950/20 border border-cyan-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-cyan-300">C++ LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(PRD, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-rose-950/20 border border-rose-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-rose-300">DE LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SP, BJ) • DE Lab</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-rose-400 font-medium text-[11px]">
                        DE LAB (GR2) (SP, BJ)
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-cyan-400 font-medium text-[11px]">
                        C++ LAB (GR1) (PRD, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">PYTHON (JM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">DS (SPP)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-zinc-300 text-[11px] font-mono">
                    LIBRARY STUDY
                  </div>
                </td>
              </tr>

              {/* FRIDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-teal-400 font-mono">
                  FRI
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-violet-950/20 border border-violet-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">ALGORITHM (KSM)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-orange-950/20 border border-orange-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-orange-300">PYTHON LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(JM, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-teal-950/20 border border-teal-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-teal-300">DS LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SPP, MM) • CCL</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-teal-400 font-medium text-[11px]">
                        DS LAB (GR2) (SPP, MM) CCL
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-orange-400 font-medium text-[11px]">
                        PYTHON LAB (GR1) (JM, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-sky-950/20 border border-sky-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">C++ (PRD)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 3:00 - 5:00 (2 cols spanned) */}
                <td colSpan={2} className="py-3 px-3">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-teal-950/20 border border-teal-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-teal-300">DS LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SPP, MM, AP) • CCL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-orange-950/20 border border-orange-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-orange-300">PYTHON LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(JM, TP) • ACL</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-teal-400 font-medium text-[11px]">
                        DS LAB (GR1) (SPP, MM, AP) CCL
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-orange-400 font-medium text-[11px]">
                        PYTHON LAB (GR2) (JM, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
              </tr>

              {/* SATURDAY */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-4 px-4 font-bold text-center border-r border-zinc-800 text-orange-400 font-mono">
                  SAT
                </td>
                <td className="py-3 px-3 border-r border-zinc-800">
                  <div className="bg-sky-950/20 border border-sky-500/30 rounded-lg p-2.5 text-center">
                    <div className="font-bold text-zinc-100">C++ (PRD)</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">RN-13</div>
                  </div>
                </td>
                {/* 11:00 - 1:00 */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-teal-950/20 border border-teal-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-teal-300">DS LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SPP, MM) • CCL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-orange-950/20 border border-orange-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-orange-300">PYTHON LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(JM, TP) • ACL</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-teal-400 font-medium text-[11px]">
                        DS LAB (GR1) (SPP, MM) CCL
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-orange-400 font-medium text-[11px]">
                        PYTHON LAB (GR2) (JM, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-1 border-r border-zinc-800 text-center bg-zinc-950/40 font-mono text-[10px] text-zinc-500 tracking-wider">
                  BREAK
                </td>
                {/* 2:00 - 4:00 (2 cols spanned) */}
                <td colSpan={2} className="py-3 px-3 border-r border-zinc-800">
                  {viewMode === 'personal' && userGroup === 'GR1' ? (
                    <div className="bg-orange-950/20 border border-orange-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-orange-300">PYTHON LAB (GR1)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(JM, TP) • ACL</div>
                    </div>
                  ) : viewMode === 'personal' && userGroup === 'GR2' ? (
                    <div className="bg-teal-950/20 border border-teal-500/40 rounded-lg p-2.5 text-center">
                      <div className="font-bold text-teal-300">DS LAB (GR2)</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">(SPP, MM, AP) • CCL</div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-2 text-center space-y-1">
                      <div className="text-teal-400 font-medium text-[11px]">
                        DS LAB (GR2) (SPP, MM, AP) CCL
                      </div>
                      <div className="border-t border-zinc-800 pt-1 text-orange-400 font-medium text-[11px]">
                        PYTHON LAB (GR1) (JM, TP) ACL
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-3 text-center text-zinc-600 font-mono">
                  XXXXX
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend Footer */}
        <div className="bg-zinc-950 p-4 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-4 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Theory Classes (RN-13)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Practical Labs (ACL / CCL / DE Lab)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600"></span> Free Periods / Study
            </span>
          </div>
          <span className="text-zinc-500">
            Signatures: HOD • PRINCIPAL (Approved 25/06/2026)
          </span>
        </div>
      </div>
    </div>
  );
};
