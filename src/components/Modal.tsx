import baseUrl from "@/configs/Baseurl";
import { useAuthContext } from "@/configs/Context";

export default function Modal({
  title,
  content,
  onClickAction,
}: {
  title?: string;
  content?: string;
  onClickAction?: () => void;
}) {
  const { id } = useAuthContext();

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
                onClick={() => {
                  if (onClickAction) {
                    onClickAction();
                  }
                }}
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
