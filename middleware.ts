import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_ROLES = ["admin", "editor", "staff"] as const;
type AdminRole = (typeof ADMIN_ROLES)[number];

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({ request: req });
  const path = req.nextUrl.pathname;

  // Chỉ chạy xác thực Supabase cho các route bảo vệ (/admin hoặc /dashboard)
  // Các trang công khai (landing page, tin tức, khóa học...) sẽ bỏ qua để tăng tốc độ phản hồi (TTFB)
  const isProtectedAdmin = path.startsWith("/admin") && !path.startsWith("/admin/dang-nhap");
  const isProtectedDashboard = path.startsWith("/dashboard");

  if (!isProtectedAdmin && !isProtectedDashboard) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Bảo vệ /admin/* (trừ trang đăng nhập)
  if (isProtectedAdmin) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/dang-nhap", req.url));
    }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !ADMIN_ROLES.includes(profile.role as AdminRole)) {
      return NextResponse.redirect(
        new URL("/admin/dang-nhap?error=forbidden", req.url)
      );
    }
  }

  // Bảo vệ /dashboard/* (student portal)
  if (isProtectedDashboard && !user) {
    return NextResponse.redirect(new URL("/dang-nhap", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
