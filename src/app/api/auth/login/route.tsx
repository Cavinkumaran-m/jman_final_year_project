import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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
      return NextResponse.json({
        status: 200,
        data: {
          fullName: user.FullName,
          email: user.Email,
          userName: user.UserName,
          role: user.Role,
        },
      });
    } else {
      return NextResponse.json({ message: "Password Wrong" });
    }
  } else {
    return NextResponse.json({ error: "User Not Found" });
  }
}
