import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { student_code, password } = await req.json();

    if (!student_code || !password) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp mã học viên và mật khẩu." },
        { status: 400 }
      );
    }

    // Connect to Supabase as Server Client
    const supabase = await createClient();

    // Look up student by student_code to ensure they exist and retrieve full name
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("student_code")
      .eq("student_code", student_code.toUpperCase())
      .single();

    if (studentError || !student) {
      return NextResponse.json(
        { error: "Mã học viên không chính xác hoặc không tồn tại." },
        { status: 404 }
      );
    }

    // Map student code to synthetic email
    const email = `${student_code.toLowerCase()}@student.chienthang.edu.vn`;

    // Attempt sign in with password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: "Mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      session: authData.session,
    });
  } catch (err) {
    console.error("Student login API error:", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
