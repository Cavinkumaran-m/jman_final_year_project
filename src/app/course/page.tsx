"use client";

import { CourseCard } from "@/components/CourseCards";
import baseUrl from "@/configs/Baseurl";
import { useEffect, useRef, useState } from "react";
import { PlaceHolder } from "@/components/PlaceHolder";
import styles from "./course.module.css";
import { toast } from "react-toastify";

export default function Home() {
  const [courseData, setCourseData] = useState<[] | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetch(baseUrl + "courses")
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
          setCourseData(res.data);
          // console.log(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end">
          <div className="display-5 mt-2">Browse Courses</div>
          <div className={styles.input}>
            <input
              placeholder="Search Course"
              onChange={() => {
                const search = searchRef.current?.value + "";
                setSearchText(search);
              }}
              ref={searchRef}
            ></input>
          </div>
        </div>
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
            courseData
              ?.filter((course: CourseType) =>
                course.course_title
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              ?.map((course: CourseType, i) => (
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
