import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Mail, GraduationCap, Clock, Share2, Target, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import type { Contact } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Admin Dashboard | Trường Lái Xe Chiến Thắng",
};

// Disable caching for admin dashboard to display live data
export const revalidate = 0;

interface TrafficStats {
  facebook: number;
  google: number;
  zalo: number;
  organic: number;
  total: number;
}

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

  // Fetch recent 50 contacts for traffic analysis
  const { data: trafficAnalysisContacts } = (await supabase
    .from("contacts")
    .select("message")
    .order("created_at", { ascending: false })
    .limit(50)) as { data: { message: string | null }[] | null };

  // Calculate traffic breakdown
  let facebook = 0;
  let google = 0;
  let zalo = 0;
  let organic = 0;

  trafficAnalysisContacts?.forEach((c) => {
    const msg = c.message?.toLowerCase() || "";
    if (msg.includes("nguồn: facebook") || msg.includes("source: facebook")) {
      facebook++;
    } else if (msg.includes("nguồn: google") || msg.includes("source: google")) {
      google++;
    } else if (msg.includes("nguồn: zalo") || msg.includes("source: zalo")) {
      zalo++;
    } else {
      organic++;
    }
  });

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
    traffic: {
      facebook,
      google,
      zalo,
      organic,
      total: trafficAnalysisContacts?.length ?? 0,
    } as TrafficStats,
  };
}

// Helper to parse lead source and campaign info
function getLeadSource(message: string | null) {
  if (!message || !message.includes("[UTM Tracking]")) {
    return { label: "Tự nhiên", variant: "outline" as const, campaign: null };
  }

  const msgLower = message.toLowerCase();
  let label = "Quảng cáo";
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "secondary";

  if (msgLower.includes("nguồn: facebook") || msgLower.includes("source: facebook")) {
    label = "Facebook Ads";
    variant = "default";
  } else if (msgLower.includes("nguồn: google") || msgLower.includes("source: google")) {
    label = "Google Ads";
    variant = "success";
  } else if (msgLower.includes("nguồn: zalo") || msgLower.includes("source: zalo")) {
    label = "Zalo Ads";
    variant = "warning";
  }

  // Extract campaign name
  const campaignMatch = message.match(/Chiến dịch:\s*([^\n]+)/);
  const campaign = campaignMatch && campaignMatch[1] !== "N/A" ? campaignMatch[1].trim() : null;

  return { label, variant, campaign };
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

      {/* Traffic Sources Analytics */}
      <Card className="border-neutral-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-neutral-400" />
            Phân tích Nguồn Quảng cáo & Khách hàng
          </CardTitle>
          <p className="text-xs text-neutral-400">Thống kê nguồn khách hàng đăng ký từ 50 yêu cầu liên hệ gần nhất</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Facebook Stats */}
            <div className="bg-blue-50/40 border border-blue-100/50 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Facebook Ads</span>
                <h4 className="text-2xl font-extrabold text-blue-900 mt-1">{stats.traffic.facebook} leads</h4>
              </div>
              <div className="mt-4">
                <div className="w-full bg-blue-100/50 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.traffic.total ? (stats.traffic.facebook / stats.traffic.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 mt-1.5 block">
                  Tỉ lệ: {stats.traffic.total ? Math.round((stats.traffic.facebook / stats.traffic.total) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Google Stats */}
            <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Google Ads</span>
                <h4 className="text-2xl font-extrabold text-emerald-900 mt-1">{stats.traffic.google} leads</h4>
              </div>
              <div className="mt-4">
                <div className="w-full bg-emerald-100/50 rounded-full h-1.5">
                  <div 
                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.traffic.total ? (stats.traffic.google / stats.traffic.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 mt-1.5 block">
                  Tỉ lệ: {stats.traffic.total ? Math.round((stats.traffic.google / stats.traffic.total) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Zalo Stats */}
            <div className="bg-amber-50/40 border border-amber-100/50 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Zalo Ads</span>
                <h4 className="text-2xl font-extrabold text-amber-900 mt-1">{stats.traffic.zalo} leads</h4>
              </div>
              <div className="mt-4">
                <div className="w-full bg-amber-100/50 rounded-full h-1.5">
                  <div 
                    className="bg-amber-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.traffic.total ? (stats.traffic.zalo / stats.traffic.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 mt-1.5 block">
                  Tỉ lệ: {stats.traffic.total ? Math.round((stats.traffic.zalo / stats.traffic.total) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Organic/Direct Stats */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Tự nhiên / Trực tiếp</span>
                <h4 className="text-2xl font-extrabold text-neutral-800 mt-1">{stats.traffic.organic} leads</h4>
              </div>
              <div className="mt-4">
                <div className="w-full bg-neutral-200/50 rounded-full h-1.5">
                  <div 
                    className="bg-neutral-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.traffic.total ? (stats.traffic.organic / stats.traffic.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 mt-1.5 block">
                  Tỉ lệ: {stats.traffic.total ? Math.round((stats.traffic.organic / stats.traffic.total) * 100) : 0}%
                </span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

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
                      <th className="py-4 px-6">Nguồn quảng cáo</th>
                      <th className="py-4 px-6">Nội dung yêu cầu</th>
                      <th className="py-4 px-6">Ngày gửi</th>
                      <th className="py-4 px-6">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                    {stats.recentContacts.map((contact) => {
                      const sourceInfo = getLeadSource(contact.message);
                      // Clear the UTM suffix from display message to keep UX clean
                      const displayMessage = contact.message 
                        ? contact.message.split("[UTM Tracking]")[0].trim() 
                        : "Không có nội dung";

                      return (
                        <tr key={contact.id} className="hover:bg-neutral-50/55 transition-colors">
                          <td className="py-4 px-6 font-semibold text-neutral-900">{contact.full_name}</td>
                          <td className="py-4 px-6">
                            <a href={`tel:${contact.phone}`} className="text-brand-600 hover:underline">
                              {contact.phone}
                            </a>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-0.5 items-start">
                              <Badge 
                                variant={
                                  sourceInfo.variant === "default" 
                                    ? "default" 
                                    : sourceInfo.variant === "success" 
                                    ? "success" 
                                    : sourceInfo.variant === "warning" 
                                    ? "warning" 
                                    : "outline"
                                }
                                className="text-[10px] px-1.5 py-0.5"
                              >
                                {sourceInfo.label}
                              </Badge>
                              {sourceInfo.campaign && (
                                <span className="text-[9px] text-neutral-400 font-medium max-w-[150px] truncate" title={sourceInfo.campaign}>
                                  {sourceInfo.campaign}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-xs truncate" title={displayMessage}>
                            {displayMessage}
                          </td>
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
                      );
                    })}
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
