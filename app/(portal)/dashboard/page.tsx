import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudentDashboard } from "@/components/portal/StudentDashboard";
import type { Student, ExamSchedule, UserProfile } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Cổng học viên | Trường Lái Xe Chiến Thắng",
};

// Live student portal views
export const revalidate = 0;

async function getStudentData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  // Fetch student profile info
  const { data: student } = (await supabase
    .from("students")
    .select("*")
    .eq("id", user.id)
    .single()) as { data: Student | null };

  if (!student) {
    // Check if the user is admin/staff rather than student
    const { data: profile } = (await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single()) as { data: UserProfile | null };

    if (profile && profile.role !== "student") {
      redirect("/admin/dashboard");
    }

    notFound();
  }

  // Fetch next upcoming pending exam schedule
  const { data: exams } = await supabase
    .from("exam_schedules")
    .select("*")
    .eq("student_id", student.id)
    .or("result.is.null,result.eq.pending")
    .order("scheduled_at", { ascending: true })
    .limit(1);

  const nextExam = exams && exams.length > 0 ? (exams[0] as ExamSchedule) : null;

  return {
    student: student as Student,
    nextExam,
  };
}

export default async function StudentDashboardPage() {
  const { student, nextExam } = await getStudentData();

  return <StudentDashboard student={student} nextExam={nextExam} />;
}
