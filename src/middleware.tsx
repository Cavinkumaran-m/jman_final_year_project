import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SerializeOptions, parse } from "cookie";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const JWT_SECRET = process.env.JWT_SECRET || "";

  if (!token) {
    return NextResponse.json({ error: "No Token Exists" }, { status: 400 });
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    // console.log(payload);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "token invalid" }, { status: 400 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/courses", "/api/metrics", "/api/users"],
};
