import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/configs/Prisma";
import jwt from "jsonwebtoken";
import { SerializeOptions, serialize } from "cookie";

export async function GET(request: NextRequest) {
  const cookieOptions: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  };

  const cookieHeader = serialize("auth_token", "", cookieOptions);

  const response = NextResponse.json(
    {
      message: "Logout Successfull",
    },
    { status: 200 }
  );

  // return response;

  response.headers.append("Set-Cookie", cookieHeader);
  return response;
}
