import React, { useState } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  Check, 
  X, 
  Clock, 
  Filter, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { INITIAL_STUDENTS, SUBJECTS } from '../data/timetableData';

export const ClassRegisterCR = ({ userGroup }) => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('ALL'); // 'ALL' | 'GR1' | 'GR2'
  const [selectedSubjectKey, setSelectedSubjectKey] = useState('CSEPC-205'); // Default DS
  
  // Attendance state: { [rollNumber]: 'present' | 'absent' | 'late' }
  const [rollCall, setRollCall] = useState(() => {
    const initial = {};
    INITIAL_STUDENTS.forEach((s) => {
      initial[s.roll] = 'present'; // Default everyone present
    });
    return initial;
  });

  const selectedSubject = SUBJECTS[selectedSubjectKey] || SUBJECTS['CSEPC-205'];

  // Filter students based on group and search term
  const filteredStudents = students.filter((s) => {
    const matchesGroup = filterGroup === 'ALL' || s.group === filterGroup;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Calculate statistics for the active filtered view
  const presentCount = filteredStudents.filter((s) => rollCall[s.roll] === 'present').length;
  const absentCount = filteredStudents.filter((s) => rollCall[s.roll] === 'absent').length;
  const lateCount = filteredStudents.filter((s) => rollCall[s.roll] === 'late').length;
  const totalCount = filteredStudents.length;
  const presentPercent = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;

  const handleSetStatus = (roll, status) => {
    setRollCall((prev) => ({
      ...prev,
      [roll]: status
    }));
  };

  const handleMarkAll = (status) => {
    setRollCall((prev) => {
      const next = { ...prev };
      filteredStudents.forEach((s) => {
        next[s.roll] = status;
      });
      return next;
    });
  };

  const exportCSV = () => {
    const dateStr = new Date().toISOString().split('T')[0];
    let csv = `C.V. RAMAN POLYTECHNIC - 3RD SEM CSE ATTENDANCE REGISTER\n`;
    csv += `Date: ${dateStr}, Subject: ${selectedSubject.code} - ${selectedSubject.name}, Faculty: ${selectedSubject.faculty}\n`;
    csv += `SL,Roll Number,Student Name,Group,Status\n`;

    filteredStudents.forEach((s, idx) => {
      const status = (rollCall[s.roll] || 'unmarked').toUpperCase();
      csv += `${idx + 1},${s.roll},"${s.name}",${s.group},${status}\n`;
    });

    csv += `\nSUMMARY,Total: ${totalCount},Present: ${presentCount},Absent: ${absentCount},Percentage: ${presentPercent}%\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CVRP_CSE3_RollCall_${selectedSubject.short}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/20">
                CR & Faculty Portal
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Class Register Winter-2026
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 mt-1">
              Class Roster & Batch Roll Call
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Take period roll call, filter by lab groups, and export reports for official records.
            </p>
          </div>

          {/* Export Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Register</span>
            </button>
          </div>
        </div>

        {/* Period & Subject Selector */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              Select Current Subject
            </label>
            <select
              value={selectedSubjectKey}
              onChange={(e) => setSelectedSubjectKey(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-violet-500"
            >
              {Object.entries(SUBJECTS).map(([key, subj]) => (
                <option key={key} value={key}>
                  {subj.code} - {subj.name} ({subj.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              Group Filter
            </label>
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setFilterGroup('ALL')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterGroup === 'ALL'
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All (30)
              </button>
              <button
                onClick={() => setFilterGroup('GR1')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterGroup === 'GR1'
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                GR1 (15)
              </button>
              <button
                onClick={() => setFilterGroup('GR2')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterGroup === 'GR2'
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                GR2 (15)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              Search Student / Roll
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by name or F240..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Counter Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col">
          <span className="text-[11px] font-mono uppercase text-zinc-500">Filtered Total</span>
          <span className="text-xl font-bold font-mono text-zinc-100 mt-1">{totalCount}</span>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3.5 flex flex-col">
          <span className="text-[11px] font-mono uppercase text-emerald-400">Present</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold font-mono text-emerald-300">{presentCount}</span>
            <span className="text-xs font-mono text-emerald-400/80">({presentPercent}%)</span>
          </div>
        </div>

        <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3.5 flex flex-col">
          <span className="text-[11px] font-mono uppercase text-rose-400">Absent</span>
          <span className="text-xl font-bold font-mono text-rose-300 mt-1">{absentCount}</span>
        </div>

        <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 flex flex-col">
          <span className="text-[11px] font-mono uppercase text-amber-400">Late / Leave</span>
          <span className="text-xl font-bold font-mono text-amber-300 mt-1">{lateCount}</span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Bulk Action Header */}
        <div className="p-3.5 bg-zinc-950/90 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-zinc-400 font-mono">
            Showing <strong className="text-zinc-200">{filteredStudents.length}</strong> students
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll('present')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium"
            >
              All Present
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Student Rows */}
        <div className="divide-y divide-zinc-800/80 max-h-[600px] overflow-y-auto">
          {filteredStudents.map((student, idx) => {
            const currentStatus = rollCall[student.roll] || 'present';

            return (
              <div
                key={student.roll}
                className="p-3.5 sm:px-5 flex items-center justify-between gap-3 hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-zinc-500 w-6 text-right">
                    {idx + 1}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-300 shrink-0">
                    {student.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-zinc-200 truncate">
                        {student.name}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                        student.group === 'GR1' 
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {student.group}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                      {student.roll}
                    </span>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSetStatus(student.roll, 'present')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentStatus === 'present'
                        ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    P
                  </button>

                  <button
                    onClick={() => handleSetStatus(student.roll, 'absent')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentStatus === 'absent'
                        ? 'bg-rose-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    A
                  </button>

                  <button
                    onClick={() => handleSetStatus(student.roll, 'late')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentStatus === 'late'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                    title="Late / Leave"
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
