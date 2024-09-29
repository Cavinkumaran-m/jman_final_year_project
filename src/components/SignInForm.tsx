"use client";

import { useState } from "react";
import Button from "./Button";
import styles from "./SignInForm.module.css";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [isSignIn, setSignIn] = useState(true);

  const LoginHandler = async () => {
    const res = await signIn("credentials", {
      username: "cavin",
      password: "kumar",
      callbackUrl: "/",
    });
    console.log(res);
  };

  const SignUpHandler = () => {};

  return (
    <div className={`d-flex justify-content-center py-5 ${styles.input}`}>
      <div className="p-3 p-sm-0 col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column">
        <div className="display-6 mb-2">{isSignIn ? "Sign In" : "Sign Up"}</div>
        <label>Email Id</label>
        <input type="text" placeholder="ck@gmail.com" className="mb-2" />
        <label>Password</label>
        <input type="password" placeholder="Your Secret" className="mb-2" />
        {!isSignIn && (
          <>
            <label>Retype Password</label>
            <input
              type="password"
              placeholder="Cofirm Your Secret"
              className="mb-3"
            />
          </>
        )}
        <Button
          className="mt-2 mb-3"
          onClick={() => {
            if (isSignIn) {
              LoginHandler();
            } else {
              SignUpHandler();
            }
          }}
        >
          {!isSignIn ? "Sign Up" : "Sign In"}
        </Button>
        <p>
          {isSignIn ? "New to our platform?" : "Already a member?"}
          <span onClick={() => setSignIn((prev) => !prev)}>
            {" "}
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}
