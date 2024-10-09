"use client";

import baseUrl from "@/configs/Baseurl";
import { useEffect, useState } from "react";
import Table from "@/components/UserTable";
import { useAuthContext } from "@/configs/Context";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const { isAdmin, loggedIn } = useAuthContext();
  const [userData, setUserData] = useState<[userType] | null>(null);
  useEffect(() => {
    if (!loggedIn) return;

    if (!isAdmin) {
      router.replace("/");
    }
    fetch(baseUrl + "users")
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
          setUserData(res.data);
        }
      })
      .catch((error) => console.log("cav", error));
  }, []);
  return (
    <>
      <div className="container mt-3">
        {userData === null && (
          <center>
            <Spinner />
          </center>
        )}
        {userData !== null && <Table data={userData} />}
      </div>
    </>
  );
}
