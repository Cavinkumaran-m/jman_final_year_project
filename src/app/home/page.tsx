"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import baseUrl from "@/configs/Baseurl";
import { CourseCard } from "@/components/CourseCards";
import { PlaceHolder } from "@/components/PlaceHolder";
import { toast } from "react-toastify";

export default function Home() {
  const { id, loggedIn, triggerRender } = useAuthContext();

  const [data, setData] = useState<[] | null>(null);
  // const [enrolled, setEnrolled] = useState<[] | null>(null);
  // const [assigned, setAssigned] = useState<[] | null>(null);
  // const [recommended, setRecommended] = useState<[] | null>(null);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        type: "user_courses",
        data: { userId: id },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => {
            console.log(res.error);
            toast.error(res.error);
          });
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setData(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, [triggerRender]);

  return (
    <div className="container">
      <div className="display-6 mt-2">Courses Assigned</div>

      <div className="row">
        {data === null ? (
          <>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <PlaceHolder key={i} />
              ))}
          </>
        ) : data?.filter(
            (course: userCourseType) => course.status === "assigned"
          ).length === 0 ? (
          <div className="fs-5 border rounded p-2 mt-2">
            You have no courses assigned for now !
          </div>
        ) : (
          data
            ?.filter((course: userCourseType) => course.status === "assigned")
            .map((course: userCourseType, i) => (
              <CourseCard
                title={course.courses.course_title}
                duration={course.courses.content_duration}
                lectures={course.courses.num_lectures}
                subject={course.courses.subject}
                id={course.course_id}
                enrolled_at={course.enrolled_at}
                progress={course.progress}
                status={course.status}
                key={i}
                owned={true}
              />
            ))
        )}
      </div>
      <div className="display-6 mt-2">Courses Undertaken</div>
      <div className="row">
        {data === null ? (
          <>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <PlaceHolder key={i} />
              ))}
          </>
        ) : data?.filter(
            (course: userCourseType) => course.status === "undertaken"
          ).length === 0 ? (
          <div className="fs-5 border rounded p-2 mt-2">
            You have no undertaken courses for now !
          </div>
        ) : (
          data
            ?.filter((course: userCourseType) => course.status === "undertaken")
            .map((course: userCourseType, i) => (
              <CourseCard
                title={course.courses.course_title}
                duration={course.courses.content_duration}
                lectures={course.courses.num_lectures}
                subject={course.courses.subject}
                id={course.course_id}
                enrolled_at={course.enrolled_at}
                progress={course.progress}
                status={course.status}
                key={i}
                owned={true}
              />
            ))
        )}
      </div>
    </div>
  );
}
