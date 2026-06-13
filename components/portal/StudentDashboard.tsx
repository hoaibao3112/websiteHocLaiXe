import type { Student, ExamSchedule } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Calendar, CreditCard, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface StudentDashboardProps {
  student: Student;
  nextExam: ExamSchedule | null;
}

export function StudentDashboard({ student, nextExam }: StudentDashboardProps) {
  const infoItems = [
    {
      icon: User,
      label: "Họ và tên",
      value: student.full_name,
    },
    {
      icon: Award,
      label: "Hạng xe đào tạo",
      value: `Hạng Bằng ${student.course_class}`,
    },
    {
      icon: Phone,
      label: "Số điện thoại",
      value: student.phone || "Chưa cập nhật",
    },
    {
      icon: Calendar,
      label: "Ngày sinh",
      value: student.dob ? formatDate(student.dob) : "Chưa cập nhật",
    },
    {
      icon: CreditCard,
      label: "Số CMND / CCCD",
      value: student.id_card || "Chưa cập nhật",
    },
    {
      icon: Calendar,
      label: "Ngày khai giảng",
      value: formatDate(student.enrollment_date),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">
          Xin chào, {student.full_name}!
        </h1>
        <p className="text-neutral-500 mt-1">Chào mừng bạn quay lại hệ thống quản lý học viên.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile info cards (left/center) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-100 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-neutral-50 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold text-neutral-900">Thông tin đào tạo cá nhân</CardTitle>
              <Badge variant={student.status === "active" ? "success" : "secondary"}>
                {student.status === "active" ? "Đang học" : student.status === "graduated" ? "Đã tốt nghiệp" : "Tạm ngưng"}
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {infoItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-3.5 items-start">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs text-neutral-400 font-medium block">{item.label}</span>
                        <span className="text-sm font-semibold text-neutral-800 mt-0.5 block truncate">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next exam panel (right) */}
        <div className="space-y-6">
          <Card className="border-brand-100 bg-brand-50/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-100/30 rounded-full blur-xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-brand-700">Lịch thi sắp tới</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {nextExam ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      Thi {nextExam.exam_type === "ly_thuyet" ? "Lý thuyết" : nextExam.exam_type === "thuc_hanh_sa_hinh" ? "Sa hình" : "Đường trường"}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">Được sắp xếp bởi nhà trường</p>
                  </div>
                  <div className="border-t border-brand-100/40 my-3" />
                  <div className="space-y-2.5 text-sm text-neutral-600">
                    <div className="flex justify-between">
                      <span>Thời gian:</span>
                      <strong className="text-neutral-900">{formatDate(nextExam.scheduled_at)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Địa điểm:</span>
                      <strong className="text-neutral-900 text-right max-w-[180px] truncate" title={nextExam.location || ""}>
                        {nextExam.location || "Trường Chiến Thắng"}
                      </strong>
                    </div>
                  </div>
                  <Link href="/dashboard/lich-thi" className="block mt-4">
                    <Button className="w-full inline-flex items-center justify-center gap-1.5" size="sm">
                      Xem chi tiết lịch thi
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <span className="text-4xl block">📅</span>
                  <h4 className="font-bold text-neutral-800 text-sm">Chưa có lịch thi mới</h4>
                  <p className="text-xs text-neutral-400">Bạn sẽ nhận được thông báo khi trường sắp xếp lịch thi.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
