import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request: NextRequest) {
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

    console.log(payload);

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: "token invalid" }, { status: 400 });
  }
}
