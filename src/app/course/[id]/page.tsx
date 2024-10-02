"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import styles from "./CourseDetails.module.css";
import Button from "@/components/Button";

export default function Page({ params }: { params: { id: number } }) {
  const { id, loggedIn } = useAuthContext();
  const [course, setCourse] = useState<userCourseType | null>(null);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleSubmit = () => {
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "update_progress",
        data: { userCourseId: course?.user_course_id, progress: progress },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => console.log(res.error));
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          console.log(res.message);
          setRefresh((prev) => prev + 1);
        }
      })
      .catch((error) => console.log("cav", error));
  };

  useEffect(() => {
    if (!loggedIn) return;
    fetch(baseUrl + "courses?course=" + params.id + "&user=" + id)
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => console.log(res.error));
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setCourse(res.data);
          setProgress(res.data.progress);
          // console.log(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, [refresh]);

  return (
    <>
      {course !== null && (
        <div className={`container ${styles.courseDetails} mb-4`}>
          <div className="row mt-4 border rounded p-3">
            <h1 className={`${styles.title} text-center mb-5`}>
              {course.courses.course_title}
            </h1>
            <div className="col-lg-9">
              <div>
                <iframe
                  width="100%"
                  style={{ aspectRatio: "1.78" }}
                  src="https://www.youtube.com/embed/P5k2Db1SRrY?si=CnjWtCiCdy--WDHB&amp;start=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted">
                    <strong>Level:</strong> {course.courses.level}
                  </p>
                  <p className="text-muted">
                    <strong>Subject:</strong> {course.courses.subject}
                  </p>
                  <p className="text-muted">
                    <strong>Duration:</strong> {course.courses.content_duration}{" "}
                    hours
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted">
                    <strong>Lectures:</strong> {course.courses.num_lectures}
                  </p>
                  <p className="text-muted">
                    <strong>Enrolled At:</strong> {course.enrolled_at}
                  </p>
                  <p className="text-muted">
                    <strong>Status:</strong> {course.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex justify-content-center border rounded p-2">
                <a
                  href="/study_material.pdf"
                  download="study_material.pdf"
                  className=" mt-3 mt-md-0"
                >
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      className="bi bi-download me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    <span>Download Study Material</span>
                  </Button>
                </a>
              </div>
              <div className=" border rounded p-2 mt-1">
                <label htmlFor="progressRange" className="form-label">
                  Update Course Progress ({progress}%)
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  step="1"
                  value={progress}
                  id="progressRange"
                  onChange={handleProgressChange}
                />
                <div className="text-center">
                  <Button className="btn btn-primary" onClick={handleSubmit}>
                    Submit Progress
                  </Button>
                </div>
              </div>
              <div
                className={`${styles.progressSection}  border rounded p-2 mt-1`}
              >
                <h5>Course Progress</h5>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${course.progress}%` }}
                    aria-valuenow={parseInt(course.progress ?? "0")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {course.progress}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
