import Button from "./Button";
import { formatDate } from "./Time";
import baseUrl from "@/configs/Baseurl";
import { useModalContext } from "@/configs/Context";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

export default function UserCourseTable({
  data,
  setRefresh,
}: {
  data: userCourseType[] | null;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setModalData } = useModalContext();
  const [editable, setEditable] = useState<boolean[]>(
    Array(data?.length || 0).fill(false)
  );
  const scoreRef = useRef<HTMLInputElement>(null);

  const editHandler = (
    user_course_id: number,
    type: string,
    score?: number
  ) => {
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        type: type,
        data: {
          user_course_id: user_course_id,
          score: score,
        },
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => {
            toast.error(res.error);
            console.log(res.error);
          });
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          toast.success(res.message);
          console.log(res.message);
          setRefresh((prev) => prev + 1);
        }
      })
      .catch((error) => {
        console.log("cav", error);
      });
  };

  useEffect(() => {
    setEditable(Array(data?.length || 0).fill(false));
  }, [data]);

  return (
    <>
      {data !== null && (
        <table className="table  table-bordered table-responsive">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Nature</th>
              <th scope="col">Enrolled On</th>
              <th scope="col">Progress</th>
              <th scope="col">Score</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datum, i) => (
              <tr key={i}>
                <td>{datum.courses.course_title}</td>
                <td className="text-center">{datum.status}</td>
                <td className="text-center">{formatDate(datum.enrolled_at)}</td>
                <td className="text-center">{datum.progress + "%"}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    {editable[i] ? (
                      <>
                        <input
                          className="me-2"
                          style={{ width: "35px" }}
                          min={0}
                          max={100}
                          ref={scoreRef}
                        />
                        <Button
                          onClick={() => {
                            const score = parseInt(
                              scoreRef.current?.value || "0"
                            );
                            editHandler(
                              datum.user_course_id,
                              "update_score",
                              score
                            );
                          }}
                          className="btn-sm"
                          style={{ fontSize: "20px", padding: 0 }}
                        >
                          ✅
                        </Button>
                      </>
                    ) : datum.score === null ? (
                      "NA"
                    ) : (
                      datum.score
                    )}
                  </div>
                </td>
                <td className="d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      setEditable(
                        editable.map((val, index) => {
                          if (index === i) {
                            return !val;
                          } else {
                            return val;
                          }
                        })
                      );
                    }}
                    className="btn-sm me-2"
                    style={{ fontSize: "20px", padding: 0 }}
                  >
                    📝
                  </Button>
                  <Button
                    onClick={() => {
                      setModalData({
                        title: "Are you sure want to un-register the course ?",
                        content: datum.courses.course_title,
                        onClickAction: () => {
                          editHandler(
                            datum.user_course_id,
                            "delete_user_course"
                          );
                        },
                      });
                    }}
                    className="btn-sm"
                    style={{ fontSize: "20px", padding: 0 }}
                    data-bs-target={"#exampleModal"}
                    data-bs-toggle={"modal"}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data?.length === 0 && (
        <center className="my-2">
          <b>
            <span className="border rounded p-1">NO DATA</span>
          </b>
        </center>
      )}
    </>
  );
}
