import { NextRequest, NextResponse } from "next/server";
import prisma from "@/configs/Prisma";
import { users } from "@prisma/client";

export async function GET(request: NextRequest) {
  const topUsersWithAvgScore = await prisma.$queryRaw`
        SELECT TOP(5) u.UserID, u.UserName, AVG(uc.score) AS avg_score
        FROM users u
        JOIN user_courses uc ON u.UserID = uc.user_id
        WHERE uc.score IS NOT NULL
        GROUP BY u.UserID, u.UserName
        ORDER BY avg_score DESC;`;

  const leastUsersWithAvgScore = await prisma.$queryRaw`
        SELECT TOP(5) u.UserID, u.UserName, AVG(uc.score) AS avg_score
        FROM users u
        JOIN user_courses uc ON u.UserID = uc.user_id
        WHERE uc.score IS NOT NULL
        GROUP BY u.UserID, u.UserName
        ORDER BY avg_score ASC;`;

  const leastAssignedCourses = await prisma.$queryRaw`
        SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_assigned
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        WHERE uc.status = 'assigned'
        GROUP BY c.course_title
        ORDER BY total_assigned ASC;`;

  const leastUndertakenCourses = await prisma.$queryRaw`
        SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_undertaken
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        WHERE uc.status = 'undertaken'
        GROUP BY c.course_title
        ORDER BY total_undertaken ASC;`;

  const topAssignedCourses = await prisma.$queryRaw`
        SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_assigned
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        WHERE uc.status = 'assigned'
        GROUP BY c.course_title
        ORDER BY total_assigned DESC;`;

  const topUndertakenCourses = await prisma.$queryRaw`
        SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_undertaken
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        WHERE uc.status = 'undertaken'
        GROUP BY c.course_title
        ORDER BY total_undertaken DESC;`;

  const topUsersWithCourseCompleted = await prisma.$queryRaw`
        SELECT TOP(10) u.UserID, u.UserName, COUNT(uc.user_course_id) AS courses_completed
        FROM users u
        JOIN user_courses uc ON u.UserID = uc.user_id
        WHERE uc.progress = 100
        GROUP BY u.UserID, u.UserName
        ORDER BY courses_completed DESC;`;

  const subjectWiseUserCount = await prisma.$queryRaw`
        SELECT c.subject, COUNT(DISTINCT uc.user_id) AS total_users
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        GROUP BY c.subject;`;

  const difficultyWiseUserCount = await prisma.$queryRaw`
        SELECT c.level, COUNT(DISTINCT uc.user_id) AS total_users
        FROM courses c
        JOIN user_courses uc ON c.course_id = uc.course_id
        GROUP BY c.level;`;

  return NextResponse.json(
    {
      data: {
        topUsersWithAvgScore,
        topAssignedCourses,
        topUndertakenCourses,
        topUsersWithCourseCompleted,
        subjectWiseUserCount,
        difficultyWiseUserCount,
        leastUsersWithAvgScore,
        leastAssignedCourses,
        leastUndertakenCourses,
      },
    },
    { status: 200 }
  );
}
