import * as React from "react";
import styles from "./Header.module.css";
import Button from "./Button";
import { DropDown } from "./DropDown";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      setDropDown(false);
      router.replace("/");
    }
  }, [status]);
  return (
    <>
      <div
        className={`${styles.main} text-white p-2 d-flex justify-content-between`}
      >
        <div className="display-6">The Fight Club</div>
        {status === "authenticated" && (
          <div className="d-flex">
            <div className="me-2">
              <Button
                onClick={() => {
                  setDropDown((prev) => !prev);
                }}
              >
                Menu
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  signOut({ callbackUrl: "/auth" });
                }}
                className="bg-danger"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
      {dropDown && <DropDown />}
    </>
  );
};
