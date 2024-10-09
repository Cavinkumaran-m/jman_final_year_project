"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import Tree from "react-d3-tree";
import customNode from "@/components/CustomNode";
import { useRouter } from "next/navigation";
import { PathParser } from "@/components/CourseDataParser";
import { useModalContext } from "@/configs/Context";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const { id, loggedIn } = useAuthContext();
  const { setModalData } = useModalContext();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!loggedIn) return;
    fetch(baseUrl + "courses", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        type: "learning_path",
        data: { user_id: id },
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
          // console.log(PathParser(res.data.user_course, res.data.predictions));
          setData(PathParser(res.data.user_course, res.data.predictions));
        }
      })
      .catch((error) => console.log("cav", error));
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
            nodeSize={{ x: 300, y: 200 }}
            orientation="horizontal"
            renderCustomNodeElement={(rd3tProps) =>
              customNode({
                ...rd3tProps,
                foreignObjectProps,
                router,
                showButton: true,
                setModalData,
                setRefresh,
                userId: id,
              })
            }
            separation={{ siblings: 2, nonSiblings: 4 }}
            enableLegacyTransitions={true}
            collapsible={false}
            rootNodeClassName={"rootNode"}
          />
        </div>
      )}
    </>
  );
}
