"use client";

import * as React from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/configs/Context";
import baseUrl from "@/configs/Baseurl";
import { toast } from "react-toastify";

export const Header = () => {
  const {
    userName,
    isAdmin,
    loggedIn,
    clearAuth,
    setUserName,
    setIsAdmin,
    setLoggedIn,
    setFullName,
    setId,
    setTriggerRender,
  } = useAuthContext();

  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      fetch(baseUrl + "auth/checkCookie")
        .then((response) => {
          if (response.status === 400) {
            router.replace("/");
            return null;
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            setFullName(res.fullName);
            setIsAdmin(res.role === "admin" ? true : false);
            setLoggedIn(true);
            setUserName(res.userName);
            setId(res.id);
            console.log(res);
            res.role === "admin"
              ? router.push("/dashboard")
              : router.push("/home");
            setTriggerRender((prev: number) => prev + 1);
          }
        })
        .catch((error) => {
          console.log("cav", error);
        });
      // router.replace("/");
    }
  });
  return (
    <>
      <div
        className={`${styles.main} text-white p-2 d-flex justify-content-between`}
      >
        <div className="d-flex">
          {loggedIn && (
            <div className="me-2 d-flex flex-column justify-content-center">
              <div
                className="btn d-flex "
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                style={{
                  fontSize: "20px",
                  padding: 2,
                  border: "1px white solid",
                }}
              >
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png"
                  }
                  style={{ height: "30px" }}
                ></img>
              </div>
            </div>
          )}
          <div
            className="display-6"
            onClick={() => {
              if (!loggedIn) {
                router.push("/auth");
                return;
              }
              if (isAdmin) {
                router.push("/dashboard");
                return;
              }
              router.push("/home");
            }}
            style={{ cursor: "pointer" }}
          >
            JLearn
          </div>
        </div>
        {loggedIn && (
          <div className="d-flex">
            <div className="fs-4 d-flex align-items-center me-2">
              <span>Hi {userName}</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  fetch(baseUrl + "auth/logout")
                    .then((response) => {
                      if (response.status !== 200) {
                        response.json().then((res) => toast.error(res.error));
                        return null;
                      }
                      return response.json();
                    })
                    .then((res) => {
                      if (res) {
                        toast.success(res.message);
                        clearAuth();
                        router.replace("/");
                      }
                    })
                    .catch((error) => {
                      console.log("cav", error);
                    });
                }}
                className="bg-danger"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
