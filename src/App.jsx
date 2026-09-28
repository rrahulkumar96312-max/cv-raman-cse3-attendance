import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { TodaySchedule } from './components/TodaySchedule';
import { TimetableView } from './components/TimetableView';
import { SubjectDirectory } from './components/SubjectDirectory';
import { CalendarSummaryView } from './components/CalendarSummaryView';
import { ProfileModal } from './components/ProfileModal';
import { WorkingDaysModal } from './components/WorkingDaysModal';
import { 
  DEFAULT_PERSONAL_STATS, 
  SUBJECTS, 
  WEEKLY_TIMETABLE 
} from './data/timetableData';
import { 
  calculatePercentage, 
  getStatusCategory, 
  getDayCodeFromDate 
} from './utils/attendanceUtils';

export function App() {
  // 1. Persistent User Group (GR1 / GR2)
  const [userGroup, setUserGroup] = useState(() => {
    return localStorage.getItem('cvrp_cse3_user_group') || 'GR1';
  });

  // 2. Student Identification (Name & Registration Number)
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('cvrp_student_name') || '';
  });
  const [regNumber, setRegNumber] = useState(() => {
    return localStorage.getItem('cvrp_reg_number') || '';
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(() => {
    const n = localStorage.getItem('cvrp_student_name');
    const r = localStorage.getItem('cvrp_reg_number');
    return !n || !r; // automatically open on first visit
  });

  // 3. Official Working Days & Attendance Detail
  const [workingDaysData, setWorkingDaysData] = useState(() => {
    const saved = localStorage.getItem('cvrp_working_days_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse working days data", e);
      }
    }
    return {
      totalDays: 0,
      attendedDays: 0,
      semesterTargetDays: 90,
      useWorkingDaysAsPrimary: true
    };
  });
  const [isWorkingDaysModalOpen, setIsWorkingDaysModalOpen] = useState(false);

  // 3b. Attendance Source Toggle ('calendar' | 'input')
  const [attendanceSource, setAttendanceSource] = useState(() => {
    return localStorage.getItem('cvrp_attendance_source') || 'calendar';
  });

  // 4. Active Tab
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'calendar' | 'timetable' | 'subjects'

  // 5. Current Live Day Detection
  const todayCode = getDayCodeFromDate(new Date());
  const initialDay = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].includes(todayCode) ? todayCode : 'MON';
  const [selectedDay, setSelectedDay] = useState(initialDay);

  // 6. Persistent Subject Attendance Stats (Fresh clean start)
  const [subjectStats, setSubjectStats] = useState(() => {
    const saved = localStorage.getItem('cvrp_cse3_clean_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved subject stats", e);
      }
    }
    return DEFAULT_PERSONAL_STATS;
  });

  // 7. Daily Attendance Marking Records (keyed by date and period, starts clean)
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem('cvrp_cse3_clean_records');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch (e) {
        console.error("Failed to parse saved records", e);
      }
    }
    return {};
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cvrp_cse3_user_group', userGroup);
  }, [userGroup]);

  useEffect(() => {
    localStorage.setItem('cvrp_cse3_clean_stats', JSON.stringify(subjectStats));
  }, [subjectStats]);

  useEffect(() => {
    localStorage.setItem('cvrp_cse3_clean_records', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('cvrp_working_days_data', JSON.stringify(workingDaysData));
  }, [workingDaysData]);

  useEffect(() => {
    localStorage.setItem('cvrp_attendance_source', attendanceSource);
  }, [attendanceSource]);

  const handleSaveProfile = (name, reg) => {
    setStudentName(name);
    setRegNumber(reg);
    localStorage.setItem('cvrp_student_name', name);
    localStorage.setItem('cvrp_reg_number', reg);
    setIsProfileModalOpen(false);
  };

  const handleSaveWorkingDays = (newData) => {
    setWorkingDaysData(newData);
    triggerConfetti();
  };

  const handleSaveSubjectStats = (newStats) => {
    setSubjectStats(newStats);
    triggerConfetti();
  };

  // Overall Class-based Attendance Calculation (Calendar Data)
  let totalAttended = 0;
  let totalConducted = 0;
  Object.keys(SUBJECTS).forEach((key) => {
    const stat = subjectStats[key] || { attended: 0, total: 0 };
    totalAttended += stat.attended;
    totalConducted += stat.total;
  });
  const overallPercent = calculatePercentage(totalAttended, totalConducted);
  const statusMeta = getStatusCategory(overallPercent, totalConducted);

  const calendarStats = {
    attended: totalAttended,
    total: totalConducted
  };

  // Trigger Confetti Celebration
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#38bdf8', '#fbbf24', '#a855f7']
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Handler for marking a single period
  const handleMarkPeriod = (recordKey, subjectKey, status, weight = 1) => {
    const prevStatus = attendanceRecords[recordKey] || 'unmarked';
    if (prevStatus === status) return; // already in this state

    // Adjust subject stats accordingly
    setSubjectStats((prev) => {
      const currentSubj = prev[subjectKey] || { attended: 0, total: 0 };
      let newAttended = currentSubj.attended;
      let newTotal = currentSubj.total;

      // Revert previous effect
      if (prevStatus === 'present') {
        newAttended -= weight;
        newTotal -= weight;
      } else if (prevStatus === 'absent') {
        newTotal -= weight;
      }

      // Apply new effect
      if (status === 'present') {
        newAttended += weight;
        newTotal += weight;
      } else if (status === 'absent') {
        newTotal += weight;
      }

      return {
        ...prev,
        [subjectKey]: {
          attended: Math.max(0, newAttended),
          total: Math.max(0, newTotal)
        }
      };
    });

    setAttendanceRecords((prev) => ({
      ...prev,
      [recordKey]: status
    }));

    if (status === 'present') {
      triggerConfetti();
    }
  };

  // Handler to mark all periods for a given day
  const handleMarkAllToday = (dayCode, status) => {
    const dayData = WEEKLY_TIMETABLE[dayCode];
    if (!dayData) return;

    dayData.periods.forEach((period, idx) => {
      if (period.type === 'theory') {
        const key = `${dayCode}_period_${idx}_${userGroup}`;
        handleMarkPeriod(key, period.subjectKey, status, 1);
      } else if (period.type === 'lab_split') {
        const key = `${dayCode}_period_${idx}_${userGroup}`;
        const lab = userGroup === 'GR2' ? period.gr2 : period.gr1;
        handleMarkPeriod(key, lab.subjectKey, status, 2);
      }
    });

    if (status === 'present') {
      triggerConfetti();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Navbar with Student Name, Registration Number, and Dual Attendance Options */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userGroup={userGroup}
        setUserGroup={setUserGroup}
        overallPercent={overallPercent}
        statusMeta={statusMeta}
        studentName={studentName}
        regNumber={regNumber}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        workingDaysData={workingDaysData}
        onOpenWorkingDaysModal={() => setIsWorkingDaysModalOpen(true)}
        attendanceSource={attendanceSource}
        onSelectAttendanceSource={setAttendanceSource}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'daily' && (
          <TodaySchedule
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            userGroup={userGroup}
            attendanceRecords={attendanceRecords}
            onMarkPeriod={handleMarkPeriod}
            onMarkAllToday={handleMarkAllToday}
            subjectStats={subjectStats}
            currentLiveDay={todayCode}
            workingDaysData={workingDaysData}
            onOpenWorkingDaysModal={() => setIsWorkingDaysModalOpen(true)}
            attendanceSource={attendanceSource}
            onSelectAttendanceSource={setAttendanceSource}
            calendarStats={calendarStats}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarSummaryView
            userGroup={userGroup}
            attendanceRecords={attendanceRecords}
            onMarkPeriod={handleMarkPeriod}
            onMarkAllToday={handleMarkAllToday}
            workingDaysData={workingDaysData}
            onOpenWorkingDaysModal={() => setIsWorkingDaysModalOpen(true)}
            attendanceSource={attendanceSource}
            onSelectAttendanceSource={setAttendanceSource}
            calendarStats={calendarStats}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView
            userGroup={userGroup}
            setUserGroup={setUserGroup}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectDirectory />
        )}
      </main>

      {/* Student Identification Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialName={studentName}
        initialReg={regNumber}
        userGroup={userGroup}
        setUserGroup={setUserGroup}
        onSave={handleSaveProfile}
      />

      {/* Working Days & Official Attendance Editor Modal */}
      <WorkingDaysModal
        isOpen={isWorkingDaysModalOpen}
        onClose={() => setIsWorkingDaysModalOpen(false)}
        workingDaysData={workingDaysData}
        onSaveWorkingDays={handleSaveWorkingDays}
        subjectStats={subjectStats}
        onSaveSubjectStats={handleSaveSubjectStats}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500 font-mono">
        <p>
          C.V. Raman Polytechnic, Bhubaneswar • CSE Department • 3rd Semester Winter-2026
        </p>
        <p className="mt-1 text-zinc-600">
          Compliant with SCTE&VT Odisha 75% Mandatory Attendance Norms
        </p>
      </footer>
    </div>
  );
}

export default App;
