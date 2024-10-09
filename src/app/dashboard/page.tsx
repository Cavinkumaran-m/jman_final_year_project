"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import { useRouter } from "next/navigation";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import chartDataParser from "@/components/Charts/ChartFunctions";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

export default function Page() {
  const { isAdmin, loggedIn } = useAuthContext();
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
    fetch(baseUrl + "metrics")
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
          setData(chartDataParser(res.data));
          // console.log(chartDataParser(res.data));
        }
      })
      .catch((error) => console.log("cav", error));
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {!data && (
            <center className="mt-4">
              <Spinner />
            </center>
          )}
          {data && (
            <>
              <div className="display-5">DashBoard</div>
              <PieChart
                data={data.difficultyWiseUserCountGraph}
                title={"Users under different course Difficulties"}
              />
              <PieChart
                data={data.subjectWiseUserCount}
                title={"Users under different course Subjects"}
              />
              <BarChart
                data={data.leastAssignedCoursesGraph}
                title={"Leastly assigned Courses"}
              />
              <BarChart
                data={data.leastUndertakenCoursesGraph}
                title={"Leastly undertaken Courses"}
              />
              <BarChart
                data={data.leastUsersWithAvgScoreGraph}
                title={"Users with least Average Score"}
              />
              <BarChart
                data={data.topAssignedCoursesGraph}
                title={"Mostly assigned Courses"}
              />
              <BarChart
                data={data.topUndertakenCoursesGraph}
                title={"Mostly undertaken Courses"}
              />
              <BarChart
                data={data.topUsersWithAvgScoreGraph}
                title={"Users with Most Average Score"}
              />
              <BarChart
                data={data.topUsersWithCourseCompletedGraph}
                title={"Users with Most number of courses completed"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
