// Attendance calculation utilities for 3rd Sem CSE

export const calculatePercentage = (attended, total) => {
  if (!total || total === 0) return 0;
  return Number(((attended / total) * 100).toFixed(1));
};

export const getSafeBunks = (attended, total, targetPercent = 75) => {
  if (!total || total === 0) return 0;
  const target = targetPercent / 100;
  const currentRatio = attended / total;
  if (currentRatio < target) return 0;
  
  // (attended) / (total + x) >= target
  // attended >= target * total + target * x
  // x <= (attended - target * total) / target
  const maxBunks = Math.floor((attended - target * total) / target);
  return Math.max(0, maxBunks);
};

export const getRequiredCatchup = (attended, total, targetPercent = 75) => {
  if (!total || total === 0) return 0;
  const target = targetPercent / 100;
  const currentRatio = attended / total;
  if (currentRatio >= target) return 0;
  
  // (attended + y) / (total + y) >= target
  // attended + y >= target * total + target * y
  // y * (1 - target) >= target * total - attended
  // y = ceil((target * total - attended) / (1 - target))
  const needed = Math.ceil((target * total - attended) / (1 - target));
  return Math.max(0, needed);
};

export const getStatusCategory = (percent) => {
  if (percent >= 80) {
    return {
      label: "Safe & On Track",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      glow: "border-emerald-500/40",
      barColor: "bg-emerald-500",
      status: "safe",
      badgeText: "Safe",
    };
  } else if (percent >= 75) {
    return {
      label: "Borderline (Meets 75%)",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      glow: "border-cyan-500/40",
      barColor: "bg-cyan-500",
      status: "borderline",
      badgeText: "Borderline",
    };
  } else if (percent >= 65) {
    return {
      label: "Low Attendance (Need Condonation)",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      glow: "border-amber-500/40",
      barColor: "bg-amber-500",
      status: "warning",
      badgeText: "Condonation Zone",
    };
  } else {
    return {
      label: "Critical (Exam Debarred Risk)",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      glow: "border-rose-500/40",
      barColor: "bg-rose-500",
      status: "danger",
      badgeText: "Debarred Risk",
    };
  }
};

export const getDayCodeFromDate = (date) => {
  const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const mapping = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return mapping[dayIndex];
};

export const formatDisplayDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export const getClassesForGroup = (daySchedule, group = "GR1") => {
  if (!daySchedule || !daySchedule.periods) return [];
  
  return daySchedule.periods.map((period, idx) => {
    if (period.type === "lab_split") {
      const selectedLab = group === "GR2" ? period.gr2 : period.gr1;
      return {
        ...period,
        uniqueId: `${daySchedule.name}-${idx}-${group}`,
        isLab: true,
        subjectKey: selectedLab.subjectKey,
        displayTitle: selectedLab.name,
        faculty: selectedLab.faculty,
        room: selectedLab.room,
        groupLabel: group,
      };
    } else if (period.type === "theory") {
      return {
        ...period,
        uniqueId: `${daySchedule.name}-${idx}-common`,
        isLab: false,
        displayTitle: period.subjectKey,
      };
    } else {
      return {
        ...period,
        uniqueId: `${daySchedule.name}-${idx}-${period.type}`,
        isNonAcademic: true,
      };
    }
  });
};
