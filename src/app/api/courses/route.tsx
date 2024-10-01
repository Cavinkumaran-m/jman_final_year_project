import { NextRequest, NextResponse } from "next/server";
import prisma from "@/configs/Prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const courseId = url.searchParams.get("course");
  const userId = url.searchParams.get("user");

  if (courseId && userId) {
    const course = await prisma.user_courses.findFirst({
      where: {
        AND: [{ course_id: parseInt(courseId) }, { user_id: parseInt(userId) }],
      },
      include: { courses: true },
    });

    return NextResponse.json(
      {
        data: course,
      },
      { status: 200 }
    );
  } else {
    const courses = await prisma.courses.findMany();

    return NextResponse.json(
      {
        data: courses,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { type, data } = await request.json();
  if (type === "user_courses") {
    const user_courses = await prisma.user_courses.findMany({
      where: {
        user_id: data.userId,
      },
      include: {
        courses: true,
      },
    });
    return NextResponse.json(
      {
        data: user_courses,
      },
      { status: 200 }
    );
  }
}
