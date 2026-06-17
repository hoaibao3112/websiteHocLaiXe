import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  contactSchema,
  updateContactStatusSchema,
} from "@/lib/validations/contact.schema";
import type { Database } from "@/types/database.types";
import { ZodError } from "zod";

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
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const updatePayload: ContactUpdate = { status };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("contacts") as any)
      .update(updatePayload)
      .eq("id", id);

    if (error) {
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
