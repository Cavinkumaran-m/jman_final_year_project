import baseUrl from "@/configs/Baseurl";
import { useAuthContext } from "@/configs/Context";

export default function Modal({
  title,
  content,
  course_id,
}: {
  title?: string;
  content?: string;
  course_id?: number;
}) {
  const { id } = useAuthContext();
  const submitHandler = () => {
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "add_course",
        data: { userId: id, courseId: course_id, status: "undertaken" },
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
        }
      })
      .catch((error) => console.log("cav", error));
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitHandler}
                data-bs-dismiss="modal"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
