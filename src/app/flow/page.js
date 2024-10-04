"use client";

import { useEffect, useState, useCallback } from "react";
import React from "react";
import Tree from "react-d3-tree";
import Parser from "@/components/CourseDataParser";
import courseData from "@/components/CourseData";
import Button from "@/components/Button";
import styles from "./flowPage.module.css";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/configs/Context";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  router,
}) => (
  <g>
    <foreignObject {...foreignObjectProps} x={-100} y={-25}>
      <div
        className={`border rounded p-2 ${styles.Node}`}
        onClick={() => {
          if (!nodeDatum.children) {
            router.push("/course/" + nodeDatum.id);
          }
        }}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && (
          <Button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </Button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default function Page() {
  const { id } = useAuthContext();
  const router = useRouter();
  const [data, setData] = useState(null);
  const nodeSize = { x: 200, y: 300 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  useEffect(() => {
    setData([Parser(courseData, id)]);
    console.log(JSON.stringify(Parser(courseData, id), null, 2));
  }, []);

  return (
    <>
      {data !== null && (
        <div className="" style={{ height: "100vh" }}>
          <Tree
            data={data}
            pathFunc={"step"}
            nodeSize={nodeSize}
            orientation="vertical"
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
                router,
              })
            }
            separation={{ siblings: 2, nonSiblings: 3 }}
            enableLegacyTransitions={true}
          />
        </div>
      )}
    </>
  );
}
