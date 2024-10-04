"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/configs/Context";
import styles from "./CourseDetails.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { formatDate } from "@/components/Time";
import UserCourseTable from "@/components/UserCourseTable";
import AssignCourseForm from "@/components/AssignCourseForm";
import Spinner from "@/components/Spinner";

export default function Page({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const { id, loggedIn, isAdmin } = useAuthContext();
  const [user, setUserData] = useState<userType | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [assignForm, setAssignForm] = useState<boolean>(false);

  useEffect(() => {
    if (!loggedIn) return;
    if (!isAdmin) {
      router.replace("/");
    }
    fetch(baseUrl + "users?&user=" + params.userId)
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => console.log(res.error));
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setUserData(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, [refresh]);

  return (
    <>
      {user === null && (
        <center className="mt-4">
          <Spinner />
        </center>
      )}
      {user !== null && (
        <>
          <div className="container mt-3">
            <div className="row  border rounded">
              <div className="col-12 col-md-3 ">
                <img
                  className="rounded py-2"
                  src="https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg"
                  width={"100%"}
                />
              </div>
              <div className="col-12 col-md-9 d-flex flex-column justify-content-center">
                <p>User Id: {user.UserID}</p>
                <p>Name: {user.FullName}</p>
                <p>Role: {user.Role}</p>
                <p>Registered At: {formatDate(user.RegisteredAt)}</p>
                <p>Email: {user.Email}</p>
              </div>
            </div>
            <div className="row border rounded mt-3">
              <div className="d-flex justify-content-between py-2">
                <div className="display-6">Courses</div>
                <div className="d-flex">
                  {!assignForm && (
                    <Button
                      onClick={() => {
                        setAssignForm((prev) => !prev);
                      }}
                    >
                      Assign Course
                    </Button>
                  )}
                  {assignForm && (
                    <div>
                      <AssignCourseForm
                        userId={params.userId}
                        setRefresh={setRefresh}
                        setAssignForm={setAssignForm}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <UserCourseTable
                  data={user.user_courses}
                  setRefresh={setRefresh}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
