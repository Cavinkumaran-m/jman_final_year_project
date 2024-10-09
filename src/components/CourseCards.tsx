"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/configs/Context";
import { useEffect } from "react";
import baseUrl from "@/configs/Baseurl";
import { useAuthContext } from "@/configs/Context";
import { toast } from "react-toastify";

export const CourseCard = ({
  id,
  title,
  level,
  duration,
  lectures,
  subject,
  enrolled_at,
  progress,
  status,
  owned,
}: {
  id: number;
  title?: string;
  level?: string;
  duration?: number;
  lectures?: number;
  subject?: string;
  enrolled_at?: string;
  progress?: string;
  status?: string;
  owned: boolean;
}) => {
  const userId = useAuthContext().id;
  if (!owned) {
    var { setModalData } = useModalContext();
  }

  const router = useRouter();

  const clickHandler = () => {
    if (owned) {
      router.push("/course/" + id);
    } else {
      setModalData({
        title: "Are you want to enroll in the course ?",
        content: title,
        onClickAction: () => {
          fetch(baseUrl + "courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "add_course",
              data: { userId: userId, courseId: id, status: "undertaken" },
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
                toast.success(res.message);
                console.log(res.message);
              }
            })
            .catch((error) => console.log("cav", error));
        },
      });
    }
  };

  return (
    <div className="p-1 col-6 col-md-4 col-lg-3 mt-3">
      <div className="card" style={{ height: "100%" }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{subject}</h6>
          {duration && (
            <div className="card-text mb-1 d-flex justify-content-around">
              <div>🕗{Math.round(duration)} Hrs</div>
              <div>📄{lectures}</div>
              {id}
            </div>
          )}
          {owned && (
            <div className="progress my-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: parseInt(progress ?? "0") + "%" }}
                aria-valuenow={parseInt(progress ?? "0")}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {progress}%
              </div>
            </div>
          )}
          <Button
            className="mt-2"
            onClick={clickHandler}
            data-bs-target={!owned ? "#exampleModal" : ""}
            data-bs-toggle={!owned ? "modal" : ""}
          >
            {owned
              ? progress === "100"
                ? "Completed"
                : "Continue Learning"
              : "Enroll Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};
