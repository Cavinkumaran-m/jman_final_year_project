import Button from "./Button";
import styles from "./CustomNode.module.css";

const customNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  router,
  showButton,
}: {
  nodeDatum: any;
  toggleNode: any;
  foreignObjectProps: any;
  router: any;
  showButton: boolean;
}) => (
  <g>
    <foreignObject {...foreignObjectProps} x={-100} y={-60}>
      <div
        className={`border rounded p-2 ${styles.Node} ${
          nodeDatum.status === "completed" && "bg-success"
        } ${nodeDatum.status === "incompleted" && "bg-warning"}`}
        onClick={() => {
          if (nodeDatum.status) {
            router.push("/course/" + nodeDatum.id);
          }
        }}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && showButton && (
          <Button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </Button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default customNode;
