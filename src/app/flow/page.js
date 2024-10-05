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
import baseUrl from "@/configs/Baseurl";

export default function Page() {
  const { id } = useAuthContext();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        type: "user_courses",
        data: { userId: 1 },
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
          setData([Parser(courseData, res.data)]);
          // console.log(JSON.stringify(Parser(courseData, res.data), null, 2));
        }
      })
      .catch((error) => {
        console.log("cav", error);
        return null;
      });
  }, []);

  const foreignObjectProps = { width: 200, height: 2000 };

  return (
    <>
      {data !== null && (
        <div className="" style={{ height: "100vh" }}>
          <Tree
            data={data}
            pathFunc={"step"}
            nodeSize={{ x: 120, y: 200 }}
            orientation="vertical"
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
                router,
              })
            }
            separation={{ siblings: 2, nonSiblings: 2.5 }}
            enableLegacyTransitions={true}
            initialDepth={1}
            rootNodeClassName={"rootNode"}
          />
        </div>
      )}
    </>
  );
}

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  router,
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
        {nodeDatum.children && (
          <Button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </Button>
        )}
      </div>
    </foreignObject>
  </g>
);
