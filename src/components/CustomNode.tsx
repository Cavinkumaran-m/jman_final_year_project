import baseUrl from "@/configs/Baseurl";
import Button from "./Button";
import styles from "./CustomNode.module.css";
import { toast } from "react-toastify";

const customNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  router,
  showButton,
  userId,
  setModalData,
  setRefresh,
}: {
  nodeDatum: any;
  toggleNode: any;
  foreignObjectProps: any;
  router: any;
  showButton: boolean;
  userId?: number;
  setModalData?: any;
  setRefresh?: any;
}) => {
  return (
    <g>
      <foreignObject {...foreignObjectProps} x={-100} y={-60}>
        <div
          className={`border rounded p-2 ${styles.Node}`}
          onClick={() => {
            if (nodeDatum.status) {
              router.push("/course/" + nodeDatum.id);
            } else {
              setModalData({
                title: "Are you want to enroll in the course ?",
                content: nodeDatum.name,
                onClickAction: () => {
                  fetch(baseUrl + "courses", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      type: "add_course",
                      data: {
                        userId: userId,
                        courseId: nodeDatum.id,
                        status: "undertaken",
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
                        toast.success(res.message);
                        console.log(res.message);
                        setRefresh((prev: number) => prev + 1);
                      }
                    })
                    .catch((error) => console.log("cav", error));
                },
              });
            }
          }}
        >
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {nodeDatum.children && showButton && !nodeDatum.status && (
            <Button style={{ width: "100%" }} onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </Button>
          )}
          {!nodeDatum.children &&
            showButton &&
            nodeDatum.status === undefined && (
              <Button
                style={{ width: "100%" }}
                onClick={toggleNode}
                data-bs-target={nodeDatum.status ? "" : "#exampleModal"}
                data-bs-toggle={nodeDatum.status ? "" : "modal"}
              >
                Enroll Now
              </Button>
            )}
          {!nodeDatum.children &&
            showButton &&
            nodeDatum.status === "completed" && (
              <Button style={{ width: "100%" }}>COMPLETED</Button>
            )}
          {!nodeDatum.children &&
            showButton &&
            nodeDatum.status === "incompleted" && (
              <Button style={{ width: "100%" }}>CONTINUE</Button>
            )}
        </div>
      </foreignObject>
    </g>
  );
};

export default customNode;
