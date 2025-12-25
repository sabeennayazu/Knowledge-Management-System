export interface StudentAttendance {
  id: number;
  name: string;
  status: "present" | "absent";
  totalPresentDays: number;
  totalAbsentDays: number;
  schoolName: string;
  grade: string;
  date: string;
}

export const studentAttendanceData: StudentAttendance[] = [
  // 🌟 Starlight Academy
  { id: 1, name: "Aarav Sharma", status: "present", totalPresentDays: 50, totalAbsentDays: 5, schoolName: "Starlight Academy", grade: "Grade 1", date: "11/13/2025" },
  { id: 2, name: "Anika Patel", status: "absent", totalPresentDays: 47, totalAbsentDays: 8, schoolName: "Starlight Academy", grade: "Grade 1", date: "11/13/2025" },
  { id: 3, name: "Rohit Das", status: "present", totalPresentDays: 52, totalAbsentDays: 3, schoolName: "Starlight Academy", grade: "Grade 1", date: "11/13/2025" },
  { id: 4, name: "Meera Nair", status: "present", totalPresentDays: 48, totalAbsentDays: 7, schoolName: "Starlight Academy", grade: "Grade 1", date: "11/13/2025" },
  { id: 5, name: "Kabir Khan", status: "present", totalPresentDays: 55, totalAbsentDays: 2, schoolName: "Starlight Academy", grade: "Grade 1", date: "11/13/2025" },

  // Grade 2
  { id: 6, name: "Isha Gupta", status: "present", totalPresentDays: 53, totalAbsentDays: 4, schoolName: "Starlight Academy", grade: "Grade 2", date: "11/13/2025" },
  { id: 7, name: "Dev Mehta", status: "absent", totalPresentDays: 46, totalAbsentDays: 9, schoolName: "Starlight Academy", grade: "Grade 2", date: "11/13/2025" },
  { id: 8, name: "Tara Joshi", status: "present", totalPresentDays: 49, totalAbsentDays: 6, schoolName: "Starlight Academy", grade: "Grade 2", date: "11/13/2025" },
  { id: 9, name: "Kunal Reddy", status: "present", totalPresentDays: 54, totalAbsentDays: 3, schoolName: "Starlight Academy", grade: "Grade 2", date: "11/13/2025" },
  { id: 10, name: "Riya Banerjee", status: "present", totalPresentDays: 51, totalAbsentDays: 5, schoolName: "Starlight Academy", grade: "Grade 2", date: "11/13/2025" },

  // 🌿 Green Valley School
  { id: 11, name: "Saanvi Iyer", status: "present", totalPresentDays: 52, totalAbsentDays: 4, schoolName: "Green Valley School", grade: "Grade 1", date: "11/13/2025" },
  { id: 12, name: "Arjun Singh", status: "present", totalPresentDays: 48, totalAbsentDays: 6, schoolName: "Green Valley School", grade: "Grade 1", date: "11/13/2025" },
  { id: 13, name: "Neha Bhat", status: "absent", totalPresentDays: 47, totalAbsentDays: 7, schoolName: "Green Valley School", grade: "Grade 1", date: "11/13/2025" },
  { id: 14, name: "Vikram Kapoor", status: "present", totalPresentDays: 55, totalAbsentDays: 2, schoolName: "Green Valley School", grade: "Grade 1", date: "11/13/2025" },
  { id: 15, name: "Diya Rai", status: "present", totalPresentDays: 53, totalAbsentDays: 4, schoolName: "Green Valley School", grade: "Grade 1", date: "11/13/2025" },

  // Grade 2
  { id: 16, name: "Manav Pillai", status: "absent", totalPresentDays: 45, totalAbsentDays: 10, schoolName: "Green Valley School", grade: "Grade 2", date: "11/13/2025" },
  { id: 17, name: "Kriti Desai", status: "present", totalPresentDays: 50, totalAbsentDays: 5, schoolName: "Green Valley School", grade: "Grade 2", date: "11/13/2025" },
  { id: 18, name: "Rajiv Ghosh", status: "present", totalPresentDays: 49, totalAbsentDays: 6, schoolName: "Green Valley School", grade: "Grade 2", date: "11/13/2025" },
  { id: 19, name: "Sneha Menon", status: "present", totalPresentDays: 52, totalAbsentDays: 3, schoolName: "Green Valley School", grade: "Grade 2", date: "11/13/2025" },
  { id: 20, name: "Aditya Jain", status: "present", totalPresentDays: 54, totalAbsentDays: 4, schoolName: "Green Valley School", grade: "Grade 2", date: "11/13/2025" },

  // 🏫 Vidya Niketan
  { id: 21, name: "Aarav Sharma", status: "present", totalPresentDays: 51, totalAbsentDays: 5, schoolName: "Vidya Niketan", grade: "Grade 1", date: "11/13/2025" },
  { id: 22, name: "Anika Patel", status: "present", totalPresentDays: 50, totalAbsentDays: 6, schoolName: "Vidya Niketan", grade: "Grade 1", date: "11/13/2025" },
  { id: 23, name: "Rohit Das", status: "absent", totalPresentDays: 48, totalAbsentDays: 8, schoolName: "Vidya Niketan", grade: "Grade 1", date: "11/13/2025" },
  { id: 24, name: "Meera Nair", status: "present", totalPresentDays: 52, totalAbsentDays: 4, schoolName: "Vidya Niketan", grade: "Grade 1", date: "11/13/2025" },
  { id: 25, name: "Kabir Khan", status: "present", totalPresentDays: 54, totalAbsentDays: 3, schoolName: "Vidya Niketan", grade: "Grade 1", date: "11/13/2025" },
];
