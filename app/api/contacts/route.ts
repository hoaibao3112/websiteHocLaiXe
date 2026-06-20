import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import {
  contactSchema,
  updateContactStatusSchema,
} from "@/lib/validations/contact.schema";
import type { Database } from "@/types/database.types";
import { ZodError } from "zod";
import { sendContactNotificationEmail } from "@/lib/mail";


type ContactInsert = Database["public"]["Tables"]["contacts"]["Insert"];
type ContactUpdate = Database["public"]["Tables"]["contacts"]["Update"];

// POST /api/contacts — Public: khách hàng gửi form đăng ký
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Dùng anon key vì RLS cho phép public INSERT vào contacts
    const supabase = await createClient();

    const payload: ContactInsert = {
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      subject: data.subject || null,
      message: data.message || null,
      status: "new",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("contacts") as any).insert(payload);

    if (error) {
      console.error("[POST /api/contacts] Supabase error:", error);
      return NextResponse.json(
        { error: "Không thể lưu thông tin. Vui lòng thử lại." },
        { status: 500 }
      );
    }

    // Gửi email thông báo về Gmail (bọc trong try-catch riêng để tránh làm ảnh hưởng tới kết quả lưu DB)
    try {
      await sendContactNotificationEmail({
        fullName: data.full_name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
    } catch (mailError) {
      console.error("[POST /api/contacts] Lỗi gửi email thông báo:", mailError);
    }

    return NextResponse.json(
      { success: true, message: "Đăng ký thành công! Chúng tôi sẽ liên hệ sớm." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("[POST /api/contacts]", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}

// PATCH /api/contacts — Admin: cập nhật status
export async function PATCH(req: NextRequest) {
  try {
    // 1. Verify user is authenticated via session
    const sessionClient = await createClient();
    const {
      data: { user },
    } = await sessionClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Thiếu tham số id" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = updateContactStatusSchema.parse(body);

    // 2. Dùng admin client (service_role) để bypass RLS — chỉ sau khi đã verify auth
    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (adminClient.from("contacts") as any)
      .update({ status } as ContactUpdate)
      .eq("id", id);

    if (error) {
      console.error("[PATCH /api/contacts] update error:", error);
      return NextResponse.json(
        { error: "Không thể cập nhật trạng thái." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("[PATCH /api/contacts]", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
