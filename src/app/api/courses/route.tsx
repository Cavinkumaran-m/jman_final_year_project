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
  if (type === "update_progress") {
    const user_courses = await prisma.user_courses.update({
      where: {
        user_course_id: data.userCourseId,
      },
      data: { progress: data.progress },
    });
    return NextResponse.json(
      {
        message: "Progress Updated Successfully",
      },
      { status: 200 }
    );
  }
  if (type === "add_course") {
    const user_course = await prisma.user_courses.findFirst({
      where: {
        AND: [{ course_id: data.courseId }, { user_id: data.userId }],
      },
    });
    if (!user_course) {
      const user_courses = await prisma.user_courses.create({
        data: {
          user_id: data.userId,
          course_id: data.courseId,
          status: data.status,
          progress: 0,
        },
      });
      return NextResponse.json(
        {
          message: "Course Enrolled Successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Course Already Enrolled",
        },
        { status: 400 }
      );
    }
  }
}
