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
import Spinner from "@/components/Spinner";
import { useModalContext } from "@/configs/Context";
import { toast } from "react-toastify";

export default function Page() {
  const { id, loggedIn } = useAuthContext();
  const { setModalData } = useModalContext();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!loggedIn) return;
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
          setData([Parser(courseData, res.data)]);
          // console.log(JSON.stringify(Parser(courseData, res.data), null, 2));
        }
      })
      .catch((error) => {
        console.log("cav", error);
        return null;
      });
  }, [refresh]);

  const foreignObjectProps = { width: 200, height: 2000 };

  return (
    <>
      {data === null && (
        <center className="mt-4">
          <Spinner />
        </center>
      )}
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
                userId: id,
                setModalData,
                setRefresh,
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
