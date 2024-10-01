import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/configs/Prisma";

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
      return NextResponse.json(
        {
          fullName: user.FullName,
          email: user.Email,
          userName: user.UserName,
          role: user.Role,
          id: user.UserID,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Password Wrong" }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: "User Not Found" }, { status: 400 });
  }
}
