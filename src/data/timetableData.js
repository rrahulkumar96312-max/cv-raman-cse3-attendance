// C.V. RAMAN POLYTECHNIC, BHUBANESWAR
// TIME TABLE FOR 3RD SEMESTER CSE FOR THE ACADEMIC SESSION WINTER-2026 (W.E.F. 01.07.2026)

export const COLLEGE_INFO = {
  name: "C.V. Raman Polytechnic",
  city: "Bhubaneswar, Odisha",
  department: "Department of Computer Science & Engineering",
  semester: "3rd Semester CSE",
  session: "Winter-2026",
  wef: "01.07.2026",
  defaultRoom: "RN-13",
  minAttendancePercent: 75,
};

export const TIME_SLOTS = [
  { id: "slot-1", label: "10:00 - 11:00", start: "10:00", end: "11:00", isBreak: false },
  { id: "slot-2", label: "11:00 - 12:00", start: "11:00", end: "12:00", isBreak: false },
  { id: "slot-3", label: "12:00 - 01:00", start: "12:00", end: "13:00", isBreak: false },
  { id: "slot-break", label: "01:00 - 02:00", start: "13:00", end: "14:00", isBreak: true, title: "LUNCH BREAK" },
  { id: "slot-4", label: "02:00 - 03:00", start: "14:00", end: "15:00", isBreak: false },
  { id: "slot-5", label: "03:00 - 04:00", start: "15:00", end: "16:00", isBreak: false },
  { id: "slot-6", label: "04:00 - 05:00", start: "16:00", end: "17:00", isBreak: false },
];

export const SUBJECTS = {
  // Theory Subjects (3 Periods each)
  "CSEPC-201": {
    code: "CSEPC 201",
    name: "Programming with C++",
    short: "C++",
    type: "Theory",
    periodsPerWeek: 3,
    faculty: "Pradeep Ranjan Dhal",
    facultyShort: "PRD",
    room: "RN-13",
    color: "from-sky-500/20 to-sky-600/10 border-sky-500/40 text-sky-400",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    accentHex: "#0284c7"
  },
  "CSEPC-203": {
    code: "CSEPC 203",
    name: "Programming with Python",
    short: "PYTHON",
    type: "Theory",
    periodsPerWeek: 3,
    faculty: "Jagadish mahanta",
    facultyShort: "JM",
    room: "RN-13",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-400",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    accentHex: "#d97706"
  },
  "CSEPC-205": {
    code: "CSEPC 205",
    name: "Data Structures",
    short: "DS",
    type: "Theory",
    periodsPerWeek: 3,
    faculty: "Sambhu Prasad Panda",
    facultyShort: "SPP",
    room: "RN-13",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accentHex: "#059669"
  },
  "CSEPC-207": {
    code: "CSEPC 207",
    name: "Digital Electronics and Computer Organization",
    short: "DE & CO",
    type: "Theory",
    periodsPerWeek: 3,
    faculty: "Sambhu Prasad Panda",
    facultyShort: "SPP",
    room: "RN-13",
    color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/40 text-indigo-400",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    accentHex: "#6366f1"
  },
  "CSEPC-209": {
    code: "CSEPC 209",
    name: "Algorithms",
    short: "ALGORITHM",
    type: "Theory",
    periodsPerWeek: 3,
    faculty: "Dr. Kshyamasagar Mahanta",
    facultyShort: "KSM",
    room: "RN-13",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/40 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    accentHex: "#7c3aed"
  },

  // Practical Labs (4 Periods each)
  "CSEPC-211": {
    code: "CSEPC 211",
    name: "Programming with C++ Lab",
    short: "C++ LAB",
    type: "Practical",
    periodsPerWeek: 4,
    faculty: "Pradeep Ranjan Dhal (PRD), Tilattama patra (TP)",
    facultyShort: "PRD, TP",
    room: "ACL",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-400",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    accentHex: "#0891b2"
  },
  "CSEPC-213": {
    code: "CSEPC 213",
    name: "Programming with Python Lab",
    short: "PYTHON LAB",
    type: "Practical",
    periodsPerWeek: 4,
    faculty: "Jagadish mahanta (JM), Tilattama patra (TP)",
    facultyShort: "JM, TP",
    room: "ACL",
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/40 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    accentHex: "#ea580c"
  },
  "CSEPC-215": {
    code: "CSEPC 215",
    name: "Data Structures Lab",
    short: "DS LAB",
    type: "Practical",
    periodsPerWeek: 4,
    faculty: "Sambhu Prasad Panda (SPP), Monalisha mohapatra (MM), Arnada Palatasingh (AP)",
    facultyShort: "SPP, MM, AP",
    room: "CCL",
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/40 text-teal-400",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    accentHex: "#0d9488"
  },
  "CSEPC-217": {
    code: "CSEPC 217",
    name: "Digital Electronics Lab",
    short: "DE LAB",
    type: "Practical",
    periodsPerWeek: 4,
    faculty: "Sabyasachi patra (SP), Bhagabati Jena (BJ)",
    facultyShort: "SP, BJ",
    room: "DE Lab",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/40 text-rose-400",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    accentHex: "#e11d48"
  },
};

// Weekly Timetable Grid
// Note: 11:00-1:00 is a 2-hour lab block (periods 2 & 3).
// On Friday 3:00-5:00 and Saturday 2:00-4:00 are also 2-hour lab blocks!
export const WEEKLY_TIMETABLE = {
  MON: {
    name: "Monday",
    fullDay: "Monday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-205", // DS (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 1, // Spans 11:00 - 01:00 (2 hours)
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-217", // DE LAB (GR1)(SP,BJ)
          name: "DE LAB",
          faculty: "SP, BJ",
          room: "DE Lab"
        },
        gr2: {
          subjectKey: "CSEPC-211", // C++ LAB (GR2)(PRD,TP) ACL
          name: "C++ LAB",
          faculty: "PRD, TP",
          room: "ACL"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4,
        time: "02:00 - 03:00",
        type: "theory",
        subjectKey: "CSEPC-203", // PYTHON (JM) RN-13
        room: "RN-13",
        faculty: "JM"
      },
      {
        slotIndex: 5,
        time: "03:00 - 04:00",
        type: "theory",
        subjectKey: "CSEPC-209", // ALGORITHM (KSM) RN-13
        room: "RN-13",
        faculty: "KSM"
      },
      {
        slotIndex: 6,
        time: "04:00 - 05:00",
        type: "free",
        title: "XXXXX (Free)"
      }
    ]
  },
  TUE: {
    name: "Tuesday",
    fullDay: "Tuesday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-203", // PYTHON (JM) RN-13
        room: "RN-13",
        faculty: "JM"
      },
      {
        slotIndex: 1,
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-211", // C++ LAB (GR1)(PRD,TP) ACL
          name: "C++ LAB",
          faculty: "PRD, TP",
          room: "ACL"
        },
        gr2: {
          subjectKey: "CSEPC-217", // DE LAB (GR2)(SP,BJ)
          name: "DE LAB",
          faculty: "SP, BJ",
          room: "DE Lab"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4,
        time: "02:00 - 03:00",
        type: "theory",
        subjectKey: "CSEPC-207", // DE&CO (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 5,
        time: "03:00 - 04:00",
        type: "theory",
        subjectKey: "CSEPC-209", // ALGORITHM (KSM) RN-13
        room: "RN-13",
        faculty: "KSM"
      },
      {
        slotIndex: 6,
        time: "04:00 - 05:00",
        type: "free",
        title: "XXXXX (Free)"
      }
    ]
  },
  WED: {
    name: "Wednesday",
    fullDay: "Wednesday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-207", // DE & CO (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 1,
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-217", // DE LAB (GR1)(SP,BJ)
          name: "DE LAB",
          faculty: "SP, BJ",
          room: "DE Lab"
        },
        gr2: {
          subjectKey: "CSEPC-211", // C++ LAB (GR2)(PRD,TP) ACL
          name: "C++ LAB",
          faculty: "PRD, TP",
          room: "ACL"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4,
        time: "02:00 - 03:00",
        type: "theory",
        subjectKey: "CSEPC-205", // DS (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 5,
        time: "03:00 - 04:00",
        type: "theory",
        subjectKey: "CSEPC-201", // C++ (PRD) RN-13
        room: "RN-13",
        faculty: "PRD"
      },
      {
        slotIndex: 6,
        time: "04:00 - 05:00",
        type: "free",
        title: "XXXXX (Free)"
      }
    ]
  },
  THU: {
    name: "Thursday",
    fullDay: "Thursday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-207", // DE & CO (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 1,
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-211", // C++ LAB (GR1)(PRD,TP) ACL
          name: "C++ LAB",
          faculty: "PRD, TP",
          room: "ACL"
        },
        gr2: {
          subjectKey: "CSEPC-217", // DE LAB (GR2)(SP,BJ)
          name: "DE LAB",
          faculty: "SP, BJ",
          room: "DE Lab"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4,
        time: "02:00 - 03:00",
        type: "theory",
        subjectKey: "CSEPC-203", // PYTHON (JM) RN-13
        room: "RN-13",
        faculty: "JM"
      },
      {
        slotIndex: 5,
        time: "03:00 - 04:00",
        type: "theory",
        subjectKey: "CSEPC-205", // DS (SPP) RN-13
        room: "RN-13",
        faculty: "SPP"
      },
      {
        slotIndex: 6,
        time: "04:00 - 05:00",
        type: "study",
        title: "LIBRARY STUDY",
        room: "Library",
        faculty: "Staff"
      }
    ]
  },
  FRI: {
    name: "Friday",
    fullDay: "Friday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-209", // ALGORITHM (KSM) RN-13
        room: "RN-13",
        faculty: "KSM"
      },
      {
        slotIndex: 1,
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-213", // PYTHON LAB (GR1)(JM,TP) ACL
          name: "PYTHON LAB",
          faculty: "JM, TP",
          room: "ACL"
        },
        gr2: {
          subjectKey: "CSEPC-215", // DS LAB (GR2)(SPP,MM) CCL
          name: "DS LAB",
          faculty: "SPP, MM",
          room: "CCL"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4,
        time: "02:00 - 03:00",
        type: "theory",
        subjectKey: "CSEPC-201", // C++ (PRD) RN-13
        room: "RN-13",
        faculty: "PRD"
      },
      {
        slotIndex: 5, // 03:00 - 05:00 2-hour lab slot
        time: "03:00 - 05:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-215", // DS LAB (GR1)(SPP,MM,AP) CCL
          name: "DS LAB",
          faculty: "SPP, MM, AP",
          room: "CCL"
        },
        gr2: {
          subjectKey: "CSEPC-213", // PYTHON LAB (GR2)(JM,TP) ACL
          name: "PYTHON LAB",
          faculty: "JM, TP",
          room: "ACL"
        }
      }
    ]
  },
  SAT: {
    name: "Saturday",
    fullDay: "Saturday",
    periods: [
      {
        slotIndex: 0,
        time: "10:00 - 11:00",
        type: "theory",
        subjectKey: "CSEPC-201", // C++ (PRD) RN-13
        room: "RN-13",
        faculty: "PRD"
      },
      {
        slotIndex: 1,
        time: "11:00 - 01:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-215", // DS LAB (GR1)(SPP,MM) CCL
          name: "DS LAB",
          faculty: "SPP, MM",
          room: "CCL"
        },
        gr2: {
          subjectKey: "CSEPC-213", // PYTHON LAB (GR2)(JM,TP) ACL
          name: "PYTHON LAB",
          faculty: "JM, TP",
          room: "ACL"
        }
      },
      {
        slotIndex: 3,
        time: "01:00 - 02:00",
        type: "break",
        title: "BREAK"
      },
      {
        slotIndex: 4, // 02:00 - 04:00 (2 hrs)
        time: "02:00 - 04:00",
        durationHours: 2,
        type: "lab_split",
        gr1: {
          subjectKey: "CSEPC-213", // PYTHON LAB (GR1)(JM,TP) ACL
          name: "PYTHON LAB",
          faculty: "JM, TP",
          room: "ACL"
        },
        gr2: {
          subjectKey: "CSEPC-215", // DS LAB (GR2)(SPP,MM,AP) CCL
          name: "DS LAB",
          faculty: "SPP, MM, AP",
          room: "CCL"
        }
      },
      {
        slotIndex: 6,
        time: "04:00 - 05:00",
        type: "free",
        title: "XXXXX (Free)"
      }
    ]
  }
};

// Realistic student cohort for C.V. Raman Polytechnic CSE 3rd Semester
export const INITIAL_STUDENTS = [
  { roll: "F24045001", name: "Abhilash Mohanty", group: "GR1" },
  { roll: "F24045002", name: "Ananya Priyadarshini Dash", group: "GR1" },
  { roll: "F24045003", name: "Ayush Kumar Sahoo", group: "GR1" },
  { roll: "F24045004", name: "Bishal Patnaik", group: "GR1" },
  { roll: "F24045005", name: "Debabrata Nayak", group: "GR1" },
  { roll: "F24045006", name: "Ipsita Tripathy", group: "GR1" },
  { roll: "F24045007", name: "Jyoti Ranjan Barik", group: "GR1" },
  { roll: "F24045008", name: "Kunal Pradhan", group: "GR1" },
  { roll: "F24045009", name: "Manas Ranjan Rout", group: "GR1" },
  { roll: "F24045010", name: "Om Prakash Swain", group: "GR1" },
  { roll: "F24045011", name: "Pooja Mohapatra", group: "GR1" },
  { roll: "F24045012", name: "Pritam Jena", group: "GR1" },
  { roll: "F24045013", name: "Rakesh Kumar Behera", group: "GR1" },
  { roll: "F24045014", name: "Rudra Narayan Mishra", group: "GR1" },
  { roll: "F24045015", name: "Sagarika Sethi", group: "GR1" },
  { roll: "F24045016", name: "Sameer Panda", group: "GR2" },
  { roll: "F24045017", name: "Sandhya Rani Biswal", group: "GR2" },
  { roll: "F24045018", name: "Satya Prakash Das", group: "GR2" },
  { roll: "F24045019", name: "Shibani Parida", group: "GR2" },
  { roll: "F24045020", name: "Smruti Ranjan Padhi", group: "GR2" },
  { roll: "F24045021", name: "Soubhagya Nayak", group: "GR2" },
  { roll: "F24045022", name: "Subhankar Mahapatra", group: "GR2" },
  { roll: "F24045023", name: "Suchismita Mohanty", group: "GR2" },
  { roll: "F24045024", name: "Sujeet Kumar Tarai", group: "GR2" },
  { roll: "F24045025", name: "Suraj Kumar Mallik", group: "GR2" },
  { roll: "F24045026", name: "Swagatika Dhal", group: "GR2" },
  { roll: "F24045027", name: "Tanmay Kar", group: "GR2" },
  { roll: "F24045028", name: "Tushar Kanta Samal", group: "GR2" },
  { roll: "F24045029", name: "Umakanta Sahu", group: "GR2" },
  { roll: "F24045030", name: "Vikash Kumar Nayak", group: "GR2" },
];

// Fresh clean initial baseline for a new user
export const DEFAULT_PERSONAL_STATS = {
  "CSEPC-201": { attended: 0, total: 0 },
  "CSEPC-203": { attended: 0, total: 0 },
  "CSEPC-205": { attended: 0, total: 0 },
  "CSEPC-207": { attended: 0, total: 0 },
  "CSEPC-209": { attended: 0, total: 0 },
  "CSEPC-211": { attended: 0, total: 0 },
  "CSEPC-213": { attended: 0, total: 0 },
  "CSEPC-215": { attended: 0, total: 0 },
  "CSEPC-217": { attended: 0, total: 0 },
};
