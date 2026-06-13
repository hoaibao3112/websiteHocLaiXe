import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  // Validate secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret key" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: "Path parameter is required" }, { status: 400 });
  }

  try {
    // Revalidate the specified path
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Failed to revalidate path" }, { status: 500 });
  }
}
