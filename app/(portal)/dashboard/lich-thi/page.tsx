import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Calendar, CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";
import type { ExamSchedule } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Lịch thi & Kết quả | Trường Lái Xe Chiến Thắng",
};

// Disable cache for live portal info
export const revalidate = 0;

async function getExamSchedules(): Promise<ExamSchedule[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap");
  }

  const { data } = await supabase
    .from("exam_schedules")
    .select("*")
    .eq("student_id", user.id)
    .order("scheduled_at", { ascending: false });

  return (data as ExamSchedule[]) ?? [];
}

export default async function ExamSchedulesPage() {
  const exams = await getExamSchedules();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">Lịch thi & Kết quả</h1>
        <p className="text-neutral-500 mt-1">Theo dõi lịch thi chi tiết và kết quả thi các hạng mục đào tạo.</p>
      </div>

      {/* Main content */}
      <Card className="border-neutral-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-neutral-50 pb-4">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-neutral-400" />
            Lịch sử thi cử
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {exams.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-400 text-xs font-bold uppercase">
                    <th className="py-4 px-6">Hạng mục thi</th>
                    <th className="py-4 px-6">Ngày thi</th>
                    <th className="py-4 px-6">Địa điểm</th>
                    <th className="py-4 px-6">Điểm số</th>
                    <th className="py-4 px-6">Kết quả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                  {exams.map((exam) => {
                    const typeLabel =
                      exam.exam_type === "ly_thuyet"
                        ? "Lý thuyết"
                        : exam.exam_type === "thuc_hanh_sa_hinh"
                        ? "Thực hành Sa hình"
                        : "Thực hành Đường trường";

                    return (
                      <tr key={exam.id} className="hover:bg-neutral-55/40 transition-colors">
                        <td className="py-4 px-6 font-semibold text-neutral-900">{typeLabel}</td>
                        <td className="py-4 px-6 text-neutral-500">{formatDate(exam.scheduled_at)}</td>
                        <td className="py-4 px-6">{exam.location || "Trường Chiến Thắng"}</td>
                        <td className="py-4 px-6 font-mono font-bold text-neutral-800">
                          {exam.score !== null && exam.score !== undefined ? exam.score : "—"}
                        </td>
                        <td className="py-4 px-6">
                          {exam.result === "passed" ? (
                            <Badge variant="success" className="inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Đậu
                            </Badge>
                          ) : exam.result === "failed" ? (
                            <Badge variant="destructive" className="inline-flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              Trượt
                            </Badge>
                          ) : (
                            <Badge variant="warning" className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              Chờ thi
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-2xl border border-neutral-100 text-neutral-400">
                📚
              </div>
              <h4 className="font-bold text-neutral-850 text-base">Bạn chưa có lịch thi nào</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Hiện tại hệ thống chưa cập nhật lịch thi nào cho tài khoản của bạn.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
