"use client";

import { CourseCard } from "@/components/CourseCards";
import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { PlaceHolder } from "@/components/PlaceHolder";

export default function Home() {
  const [courseData, setCourseData] = useState<[] | null>(null);
  useEffect(() => {
    fetch(baseUrl + "courses")
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => console.log(res.error));
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setCourseData(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, []);
  return (
    <>
      <div className="container">
        <div className="display-5 mt-2">Browse Courses</div>
        <div className="row">
          {courseData === null && (
            <>
              {Array(8)
                .fill(1)
                .map((_, i) => (
                  <PlaceHolder key={i} />
                ))}
            </>
          )}
          {courseData !== null &&
            courseData?.map((course: CourseType, i) => (
              <CourseCard
                duration={course.content_duration}
                lectures={course.num_lectures}
                level={course.level}
                subject={course.subject}
                title={course.course_title}
                id={course.course_id}
                key={i}
                owned={false}
              />
            ))}
        </div>
      </div>
    </>
  );
}
