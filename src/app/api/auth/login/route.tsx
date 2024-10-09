import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/configs/Prisma";
import { SignJWT } from "jose";
import { SerializeOptions, serialize } from "cookie";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const user = await prisma.users.findFirst({
    where: {
      UserName: username,
    },
  });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
    if (isPasswordValid) {
      const JWT_SECRET = process.env.JWT_SECRET || "";

      const token = await new SignJWT({
        fullName: user.FullName,
        email: user.Email,
        userName: user.UserName,
        role: user.Role,
        id: user.UserID,
      })
        .setProtectedHeader({ alg: "HS256" }) // Specify the algorithm
        .setExpirationTime("2h") // Set token expiration
        .sign(new TextEncoder().encode(JWT_SECRET)); // Encode the secret

      const cookieOptions: SerializeOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      };

      const cookieHeader = serialize("auth_token", token, cookieOptions);

      const response = NextResponse.json(
        {
          fullName: user.FullName,
          email: user.Email,
          userName: user.UserName,
          role: user.Role,
          id: user.UserID,
        },
        { status: 200 }
      );

      // return response;

      response.headers.append("Set-Cookie", cookieHeader);
      return response;
    } else {
      return NextResponse.json({ error: "Password Wrong" }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: "User Not Found" }, { status: 400 });
  }
}
