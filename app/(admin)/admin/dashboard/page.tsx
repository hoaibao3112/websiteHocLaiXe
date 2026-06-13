import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Mail, GraduationCap, CheckCircle2, Clock, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import type { Contact } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Admin Dashboard | Trường Lái Xe Chiến Thắng",
};

// Disable caching for admin dashboard to display live data
export const revalidate = 0;

async function getStats() {
  const supabase = await createClient();

  // News counts
  const { count: totalNews } = await supabase
    .from("news")
    .select("*", { count: "exact", head: true });

  const { count: publishedNews } = await supabase
    .from("news")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true);

  // Contacts counts
  const { count: totalContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  const { count: newContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  // Students counts
  const { count: totalStudents } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Recent 5 contacts
  const { data: recentContacts } = (await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)) as { data: Contact[] | null };

  return {
    news: {
      total: totalNews ?? 0,
      published: publishedNews ?? 0,
      drafts: (totalNews ?? 0) - (publishedNews ?? 0),
    },
    contacts: {
      total: totalContacts ?? 0,
      new: newContacts ?? 0,
    },
    students: {
      active: totalStudents ?? 0,
    },
    recentContacts: recentContacts ?? [],
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      title: "Tin tức & Sự kiện",
      value: stats.news.total,
      description: `${stats.news.published} đã đăng • ${stats.news.drafts} bản nháp`,
      icon: Newspaper,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Yêu cầu liên hệ mới",
      value: stats.contacts.new,
      description: `Tổng số ${stats.contacts.total} liên hệ nhận được`,
      icon: Mail,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Học viên đang học",
      value: stats.students.active,
      description: "Học viên đang hoạt động trên hệ thống",
      icon: GraduationCap,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">Tổng quan hệ thống</h1>
        <p className="text-neutral-500 mt-1">Thông số và các thông tin cập nhật mới nhất từ website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="border-neutral-100 shadow-sm hover:shadow transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-neutral-500">{card.title}</CardTitle>
                <div className={`p-2.5 rounded-xl border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neutral-900 font-display">{card.value}</div>
                <p className="text-xs text-neutral-400 mt-1.5">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent submissions table */}
      <div className="grid gap-6">
        <Card className="border-neutral-100 shadow-sm">
          <CardHeader className="border-b border-neutral-50 pb-4">
            <CardTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neutral-400" />
              Yêu cầu tư vấn mới nhận
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentContacts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 text-neutral-400 text-xs font-bold uppercase border-b border-neutral-100">
                      <th className="py-4 px-6">Họ tên</th>
                      <th className="py-4 px-6">Số điện thoại</th>
                      <th className="py-4 px-6">Nội dung yêu cầu</th>
                      <th className="py-4 px-6">Ngày gửi</th>
                      <th className="py-4 px-6">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                    {stats.recentContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-neutral-50/55 transition-colors">
                        <td className="py-4 px-6 font-semibold text-neutral-900">{contact.full_name}</td>
                        <td className="py-4 px-6">
                          <a href={`tel:${contact.phone}`} className="text-brand-600 hover:underline">
                            {contact.phone}
                          </a>
                        </td>
                        <td className="py-4 px-6 max-w-xs truncate">{contact.message || "Không có nội dung"}</td>
                        <td className="py-4 px-6 text-neutral-400">
                          {formatDate(contact.created_at)}
                        </td>
                        <td className="py-4 px-6">
                          {contact.status === "new" ? (
                            <Badge variant="warning">Mới</Badge>
                          ) : contact.status === "contacted" ? (
                            <Badge variant="secondary">Đã liên hệ</Badge>
                          ) : (
                            <Badge variant="success">Đã đóng</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-neutral-400 py-12 text-sm">Chưa nhận được yêu cầu tư vấn nào.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
