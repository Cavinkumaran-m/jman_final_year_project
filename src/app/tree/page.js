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
import customNode from "@/components/CustomNode";

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
        data: { userId: id },
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
              customNode({
                ...rd3tProps,
                foreignObjectProps,
                router,
                showButton: true,
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
