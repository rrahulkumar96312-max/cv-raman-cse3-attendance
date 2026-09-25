// Calendar and Weekly/Monthly attendance utilities

import { WEEKLY_TIMETABLE, SUBJECTS } from '../data/timetableData';

export const getMonthName = (monthIndex) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthIndex];
};

export const getDaysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay(); // 0 is Sunday
};

export const formatDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getDayCodeForDate = (date) => {
  const mapping = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return mapping[date.getDay()];
};

// Generate realistic pre-populated attendance records from Semester start (01.07.2026) to late September 2026
export const generateInitialDateRecords = (group = "GR1") => {
  const records = {};
  
  // Semester starts July 1, 2026 up to September 25, 2026
  const start = new Date(2026, 6, 1); // July 1
  const end = new Date(2026, 8, 25);   // September 25

  let current = new Date(start);
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (current <= end) {
    const dayCode = getDayCodeForDate(current);
    const dateStr = formatDateKey(current);

    if (dayCode !== "SUN") {
      const dayData = WEEKLY_TIMETABLE[dayCode];
      if (dayData && dayData.periods) {
        dayData.periods.forEach((period, idx) => {
          if (period.type === "theory" || period.type === "lab_split") {
            const key = `${dateStr}_period_${idx}_${group}`;
            const rand = pseudoRandom();
            // 82% chance present, 13% chance absent, 5% holiday
            let status = "present";
            if (rand > 0.87) {
              status = "absent";
            } else if (rand > 0.83) {
              status = "holiday";
            }
            records[key] = status;
          }
        });
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return records;
};

// Compute weekly statistics for a specific week starting on Monday
export const getWeekStats = (weekStartDate, records, group = "GR1") => {
  const days = [];
  let totalClasses = 0;
  let attendedClasses = 0;
  let missedClasses = 0;
  let holidayClasses = 0;
  const subjectBreakdown = {};

  Object.keys(SUBJECTS).forEach((k) => {
    subjectBreakdown[k] = { attended: 0, total: 0 };
  });

  for (let i = 0; i < 6; i++) { // Mon to Sat
    const dayDate = new Date(weekStartDate);
    dayDate.setDate(weekStartDate.getDate() + i);
    const dateStr = formatDateKey(dayDate);
    const dayCode = getDayCodeForDate(dayDate);
    const dayData = WEEKLY_TIMETABLE[dayCode];

    let dayTotal = 0;
    let dayAttended = 0;
    let dayMissed = 0;
    const periodsList = [];

    if (dayData && dayData.periods) {
      dayData.periods.forEach((period, idx) => {
        if (period.type === "theory" || period.type === "lab_split") {
          const key = `${dateStr}_period_${idx}_${group}`;
          const status = records[key] || "unmarked";
          const weight = period.type === "lab_split" ? 2 : 1;
          
          let subjKey = period.subjectKey;
          if (period.type === "lab_split") {
            const lab = group === "GR2" ? period.gr2 : period.gr1;
            subjKey = lab.subjectKey;
          }

          if (status === "present") {
            attendedClasses += weight;
            totalClasses += weight;
            dayAttended += weight;
            dayTotal += weight;
            if (subjectBreakdown[subjKey]) {
              subjectBreakdown[subjKey].attended += weight;
              subjectBreakdown[subjKey].total += weight;
            }
          } else if (status === "absent") {
            missedClasses += weight;
            totalClasses += weight;
            dayMissed += weight;
            dayTotal += weight;
            if (subjectBreakdown[subjKey]) {
              subjectBreakdown[subjKey].total += weight;
            }
          } else if (status === "holiday") {
            holidayClasses += weight;
          }

          periodsList.push({
            period,
            status,
            subjectKey: subjKey,
            weight
          });
        }
      });
    }

    days.push({
      date: new Date(dayDate),
      dateStr,
      dayCode,
      dayName: dayData?.name || dayCode,
      attended: dayAttended,
      total: dayTotal,
      missed: dayMissed,
      periods: periodsList
    });
  }

  const percent = totalClasses > 0 ? Number(((attendedClasses / totalClasses) * 100).toFixed(1)) : 0;

  return {
    days,
    totalClasses,
    attendedClasses,
    missedClasses,
    holidayClasses,
    percent,
    subjectBreakdown
  };
};

// Compute monthly statistics for a given year & month (0-11)
export const getMonthStats = (year, monthIndex, records, group = "GR1") => {
  const daysInMonth = getDaysInMonth(year, monthIndex);
  let totalClasses = 0;
  let attendedClasses = 0;
  let missedClasses = 0;
  let holidayClasses = 0;
  const daySummaryMap = {};
  const subjectBreakdown = {};

  Object.keys(SUBJECTS).forEach((k) => {
    subjectBreakdown[k] = { attended: 0, total: 0 };
  });

  for (let d = 1; d <= daysInMonth; d++) {
    const curDate = new Date(year, monthIndex, d);
    const dateStr = formatDateKey(curDate);
    const dayCode = getDayCodeForDate(curDate);

    let dTotal = 0;
    let dAttended = 0;
    let dMissed = 0;

    if (dayCode !== "SUN") {
      const dayData = WEEKLY_TIMETABLE[dayCode];
      if (dayData && dayData.periods) {
        dayData.periods.forEach((period, idx) => {
          if (period.type === "theory" || period.type === "lab_split") {
            const key = `${dateStr}_period_${idx}_${group}`;
            const status = records[key] || "unmarked";
            const weight = period.type === "lab_split" ? 2 : 1;

            let subjKey = period.subjectKey;
            if (period.type === "lab_split") {
              const lab = group === "GR2" ? period.gr2 : period.gr1;
              subjKey = lab.subjectKey;
            }

            if (status === "present") {
              attendedClasses += weight;
              totalClasses += weight;
              dAttended += weight;
              dTotal += weight;
              if (subjectBreakdown[subjKey]) {
                subjectBreakdown[subjKey].attended += weight;
                subjectBreakdown[subjKey].total += weight;
              }
            } else if (status === "absent") {
              missedClasses += weight;
              totalClasses += weight;
              dMissed += weight;
              dTotal += weight;
              if (subjectBreakdown[subjKey]) {
                subjectBreakdown[subjKey].total += weight;
              }
            } else if (status === "holiday") {
              holidayClasses += weight;
            }
          }
        });
      }
    }

    daySummaryMap[dateStr] = {
      day: d,
      dayCode,
      isSunday: dayCode === "SUN",
      total: dTotal,
      attended: dAttended,
      missed: dMissed,
      percent: dTotal > 0 ? Number(((dAttended / dTotal) * 100).toFixed(0)) : null
    };
  }

  const percent = totalClasses > 0 ? Number(((attendedClasses / totalClasses) * 100).toFixed(1)) : 0;

  return {
    year,
    monthIndex,
    monthName: getMonthName(monthIndex),
    totalClasses,
    attendedClasses,
    missedClasses,
    holidayClasses,
    percent,
    daySummaryMap,
    subjectBreakdown
  };
};
