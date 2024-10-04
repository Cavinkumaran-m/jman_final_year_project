"use client";

import * as React from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/configs/Context";

export const Header = () => {
  const { userName, isAdmin, loggedIn, clearAuth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    // if (!loggedIn) {
    //   router.replace("/auth");
    // }
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
              router.push("/");
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
                  clearAuth();
                  router.replace("/auth");
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
