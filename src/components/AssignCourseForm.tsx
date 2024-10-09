"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

type selectedCourse = { title: string; courseId: number };

export default function AssignCourseForm({
  userId,
  setRefresh,
  setAssignForm,
}: {
  userId: string;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  setAssignForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [courses, setCourses] = useState<[CourseType] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<selectedCourse | null>(
    null
  );
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
          //   console.log(res);
          setCourses(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, []);

  const assignHandler = () => {
    if (!selectedCourse) {
      toast.warn("No course selected");
      console.log("No course selected");
      return;
    }
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        type: "add_course",
        data: {
          courseId: selectedCourse.courseId,
          userId: parseInt(userId),
          status: "assigned",
        },
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
          //   console.log(res.message);
          toast.success("Course Assigned Successfully");
          setRefresh((prev) => prev + 1);
        }
      })
      .catch((error) => console.log("cav", error));
  };

  return (
    <div className="border rounded my-1 d-flex">
      <div className="dropdown">
        <Button
          className="btn btn-secondary dropdown-toggle me-2"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedCourse === null ? "Select a course" : selectedCourse.title}
        </Button>

        <ul
          className="dropdown-menu"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          <div className="px-2">
            <a className="">
              <input
                onChange={() => {
                  const search = searchRef.current?.value + "";
                  setSearchText(search);
                }}
                placeholder="search course"
                ref={searchRef}
                style={{ width: "100%" }}
              />
            </a>
          </div>
          {courses
            ?.filter((course) =>
              course.course_title
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            ?.map((course, i) => (
              <li key={i}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    setSelectedCourse({
                      title: course.course_title,
                      courseId: course.course_id,
                    });
                  }}
                >
                  {course.course_title}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <Button onClick={assignHandler} className="me-2">
          Assign
        </Button>
      </div>
      <div>
        <Button
          className="bg-danger"
          onClick={() => {
            setAssignForm((prev) => !prev);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
