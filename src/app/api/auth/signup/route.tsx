import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { username, password, email, fullName } = await request.json();
  const user = await prisma.users.findFirst({
    where: {
      UserName: username,
    },
  });
  if (user === null) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.users.create({
      data: {
        Email: email,
        FullName: fullName,
        UserName: username,
        PasswordHash: hashedPassword,
      },
    });
    return NextResponse.json({ message: "Account Created Successfully" });
  } else {
    return NextResponse.json({ error: "UserName Already Exists" });
  }
}
