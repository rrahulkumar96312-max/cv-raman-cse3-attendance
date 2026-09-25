# C.V. Raman Polytechnic - 3rd Sem CSE Attendance & Timetable Portal

A modern, high-agency web application designed for students, Class Representatives (CR), and faculty of **C.V. Raman Polytechnic, Bhubaneswar** for tracking, marking, and managing attendance and schedules according to the official **3rd Semester CSE Winter-2026 Timetable** (w.e.f. 01.07.2026).

---

## 🚀 Features

- **Daily Attendance Marking**:
  - Live weekday detection (Mon - Sat) and period highlights.
  - One-tap **Present**, **Absent**, or **No Class / Holiday** status.
  - Support for **Group 1 (GR1)** and **Group 2 (GR2)** lab rotations.
  - "Mark All Present" batch action with celebratory confetti.
- **75% SCTE&VT Bunk Planner & Compliance Advisor**:
  - Real-time calculation of **Safe Bunk Margin** (how many classes you can skip while remaining above 75%).
  - **Deficit Recovery Calculator** (consecutive classes needed to regain 75% attendance).
  - Quick subject steppers (`+` / `-`) for manual syncing.
  - Configurable target compliance (75%, 80%, 85%, 90%).
- **Interactive Master Timetable**:
  - Full-fidelity replica of the official C.V. Raman Polytechnic routine sheet.
  - Toggle between **Combined Master View** and **My Group View**.
  - Built-in print/export styling.
- **Class Representative (CR) / Faculty Roll Call**:
  - 30-student cohort roster with Odisha roll numbers (`F24045001` to `F24045030`).
  - Fast roll call screen (Present / Absent / Late) with live strength metrics.
  - **One-click CSV Register Export** for official college submission.
- **Subject & Faculty Directory**:
  - Complete curriculum cards with course codes, weekly loads, faculty in-charge, and assigned labs/rooms.

---

## 🏛️ Subjects & Faculty Mapping (Winter-2026)

| Code | Subject Name | Type | Periods / Wk | Faculty In-Charge | Venue |
|---|---|---|---|---|---|
| `CSEPC 201` | Programming with C++ | Theory | 3 | Pradeep Ranjan Dhal (PRD) | Room RN-13 |
| `CSEPC 203` | Programming with Python | Theory | 3 | Jagadish Mahanta (JM) | Room RN-13 |
| `CSEPC 205` | Data Structures | Theory | 3 | Sambhu Prasad Panda (SPP) | Room RN-13 |
| `CSEPC 207` | Digital Electronics & Computer Organization | Theory | 3 | Sambhu Prasad Panda (SPP) | Room RN-13 |
| `CSEPC 209` | Algorithms | Theory | 3 | Dr. Kshyamasagar Mahanta (KSM) | Room RN-13 |
| `CSEPC 211` | Programming with C++ Lab | Practical | 4 | Pradeep Ranjan Dhal (PRD), Tilattama Patra (TP) | ACL |
| `CSEPC 213` | Programming with Python Lab | Practical | 4 | Jagadish Mahanta (JM), Tilattama Patra (TP) | ACL |
| `CSEPC 215` | Data Structures Lab | Practical | 4 | Sambhu Prasad Panda (SPP), Monalisha Mohapatra (MM), Arnada Palatasingh (AP) | CCL |
| `CSEPC 217` | Digital Electronics Lab | Practical | 4 | Sabyasachi Patra (SP), Bhagabati Jena (BJ) | DE Lab |

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Canvas-Confetti
- **Storage**: LocalStorage with automatic state persistence

---

## 📦 Setup & Development

```bash
# Clone the repository
git clone <your-repo-url>
cd cv-raman-cse3-attendance

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License. Designed for C.V. Raman Polytechnic, Bhubaneswar.
