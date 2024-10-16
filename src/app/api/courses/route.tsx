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
    if (data.progress === 100) {
      const user_courses = await prisma.user_courses.update({
        where: {
          user_course_id: data.userCourseId,
        },
        data: {
          progress: data.progress,
          completed_at: new Date(),
        },
      });
    } else {
      const user_courses = await prisma.user_courses.update({
        where: {
          user_course_id: data.userCourseId,
        },
        data: {
          progress: data.progress,
        },
      });
    }
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
  if (type === "delete_user_course") {
    const user_course = await prisma.user_courses.findUnique({
      where: {
        user_course_id: data.user_course_id,
      },
    });
    if (user_course) {
      const deleted_user_courses = await prisma.user_courses.delete({
        where: {
          user_course_id: data.user_course_id,
        },
      });
      return NextResponse.json(
        {
          message: "Enrolled Course Removed Successfully",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Course Not Enrolled",
        },
        { status: 400 }
      );
    }
  }
  if (type === "update_score") {
    const user_course = await prisma.user_courses.update({
      where: {
        user_course_id: data.user_course_id,
      },
      data: {
        score: data.score,
      },
    });

    return NextResponse.json(
      {
        message: "Score Updated Successfully",
      },
      { status: 200 }
    );
  }
  if (type === "learning_path") {
    const user_course = await prisma.user_courses.findMany({
      where: {
        user_id: data.user_id,
      },
      include: { courses: true },
      orderBy: {
        enrolled_at: "asc",
      },
    });

    const courses_id = user_course.map((course) => course.course_id);
    // console.log(courses_id);
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        sequences: [courses_id],
      }),
    });

    if (res.status !== 200) {
      console.log(res.statusText);
      return NextResponse.json(
        {
          error: res.statusText,
        },
        { status: 500 }
      );
    }

    const res_json = await res.json();
    // console.log(res_json.predicted_course_ids);

    const pred_course = await prisma.courses.findMany({
      where: {
        course_id: { in: res_json.predicted_course_ids },
      },
    });

    // console.log(pred_course);

    return NextResponse.json(
      {
        data: { user_course, predictions: pred_course },
      },
      { status: 200 }
    );
  }
}
