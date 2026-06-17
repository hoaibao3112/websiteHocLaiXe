import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  PhoneCall,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Contact } from "@/types/database.types";
import { StatusUpdater } from "./StatusUpdater";

export const metadata: Metadata = {
  title: "Khách hàng đăng ký | Admin Trường Lái Xe Chiến Thắng",
};

export const revalidate = 0;

async function getContacts() {
  const supabase = await createClient();

  const { data: contacts, error } = (await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: Contact[] | null;
    error: unknown;
  };

  if (error) {
    console.error("[/admin/khach-hang] fetch error:", error);
    return { contacts: [], stats: { total: 0, newCount: 0, contacted: 0, closed: 0 } };
  }

  const list = contacts ?? [];
  const newCount = list.filter((c) => c.status === "new").length;
  const contacted = list.filter((c) => c.status === "contacted").length;
  const closed = list.filter((c) => c.status === "closed").length;

  return {
    contacts: list,
    stats: { total: list.length, newCount, contacted, closed },
  };
}

function getLeadSource(message: string | null) {
  if (!message || !message.includes("[UTM Tracking]")) {
    return { label: "Tự nhiên", color: "outline" as const };
  }
  const msgLower = message.toLowerCase();
  if (msgLower.includes("nguồn: facebook") || msgLower.includes("source: facebook"))
    return { label: "Facebook Ads", color: "default" as const };
  if (msgLower.includes("nguồn: google") || msgLower.includes("source: google"))
    return { label: "Google Ads", color: "success" as const };
  if (msgLower.includes("nguồn: zalo") || msgLower.includes("source: zalo"))
    return { label: "Zalo Ads", color: "warning" as const };
  return { label: "Quảng cáo", color: "secondary" as const };
}

export default async function KhachHangPage() {
  const { contacts, stats } = await getContacts();

  const statCards = [
    {
      title: "Tổng khách hàng",
      value: stats.total,
      desc: "Tất cả yêu cầu đăng ký",
      icon: Users,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      title: "Chờ xử lý",
      value: stats.newCount,
      desc: "Khách hàng chưa được liên hệ",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Đã liên hệ",
      value: stats.contacted,
      desc: "Đang trong quá trình tư vấn",
      icon: PhoneCall,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Đã hoàn tất",
      value: stats.closed,
      desc: "Đã đóng hoặc hoàn tất đăng ký",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">
          Khách hàng đăng ký
        </h1>
        <p className="text-neutral-500 mt-1">
          Danh sách khách hàng gửi thông tin đăng ký tư vấn từ website.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="border-neutral-100 shadow-sm hover:shadow transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-neutral-500">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-xl border ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neutral-900 font-display">
                  {card.value}
                </div>
                <p className="text-xs text-neutral-400 mt-1">{card.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contacts Table */}
      <Card className="border-neutral-100 shadow-sm">
        <CardHeader className="border-b border-neutral-50 pb-4">
          <CardTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-neutral-400" />
            Danh sách đăng ký tư vấn
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {contacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-neutral-400 text-xs font-bold uppercase border-b border-neutral-100">
                    <th className="py-4 px-5 whitespace-nowrap">Họ tên</th>
                    <th className="py-4 px-5 whitespace-nowrap">Số điện thoại</th>
                    <th className="py-4 px-5 whitespace-nowrap">Gmail</th>
                    <th className="py-4 px-5 whitespace-nowrap">Nguồn</th>
                    <th className="py-4 px-5 whitespace-nowrap">Nội dung</th>
                    <th className="py-4 px-5 whitespace-nowrap">Ngày gửi</th>
                    <th className="py-4 px-5 whitespace-nowrap">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                  {contacts.map((contact) => {
                    const source = getLeadSource(contact.message);
                    const displayMessage = contact.message
                      ? contact.message.split("[UTM Tracking]")[0].trim()
                      : null;

                    return (
                      <tr
                        key={contact.id}
                        className="hover:bg-neutral-50/60 transition-colors"
                      >
                        {/* Họ tên */}
                        <td className="py-4 px-5 font-semibold text-neutral-900 whitespace-nowrap">
                          {contact.full_name}
                        </td>

                        {/* SĐT */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <a
                            href={`tel:${contact.phone}`}
                            className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {contact.phone}
                          </a>
                        </td>

                        {/* Gmail */}
                        <td className="py-4 px-5">
                          {contact.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-violet-600 text-xs hover:underline truncate max-w-[180px]"
                            >
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-neutral-300 text-xs italic">—</span>
                          )}
                        </td>

                        {/* Nguồn */}
                        <td className="py-4 px-5">
                          <Badge
                            variant={source.color}
                            className="text-[10px] px-1.5 py-0.5 whitespace-nowrap"
                          >
                            {source.label}
                          </Badge>
                        </td>

                        {/* Nội dung */}
                        <td className="py-4 px-5 max-w-[220px]">
                          {displayMessage ? (
                            <p
                              className="text-xs text-neutral-600 line-clamp-2 leading-relaxed"
                              title={displayMessage}
                            >
                              {displayMessage}
                            </p>
                          ) : (
                            <span className="text-neutral-300 text-xs italic">—</span>
                          )}
                        </td>

                        {/* Ngày gửi */}
                        <td className="py-4 px-5 text-neutral-400 text-xs whitespace-nowrap">
                          {formatDate(contact.created_at)}
                        </td>

                        {/* Trạng thái - inline updater */}
                        <td className="py-4 px-5">
                          <StatusUpdater
                            contactId={contact.id}
                            currentStatus={contact.status}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-neutral-300" />
              </div>
              <div>
                <p className="text-neutral-500 font-medium">Chưa có khách hàng đăng ký</p>
                <p className="text-neutral-400 text-xs mt-1">
                  Dữ liệu sẽ xuất hiện khi có khách hàng gửi form trên website
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
