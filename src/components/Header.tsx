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
    if (!loggedIn) {
      router.replace("/auth");
    }
  });
  return (
    <>
      <div
        className={`${styles.main} text-white p-2 d-flex justify-content-between`}
      >
        <div
          className="display-6"
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          JLearn
        </div>
        {loggedIn && (
          <div className="d-flex">
            <div className="me-2">
              <Button
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                Menu
              </Button>
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
