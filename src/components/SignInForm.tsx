"use client";

import { useState } from "react";
import Button from "./Button";
import styles from "./SignInForm.module.css";
import { useRef } from "react";

export default function SignInForm() {
  const [isSignIn, setSignIn] = useState(true);
  const [Error, setError] = useState<string | null>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const validate = (login: boolean) => {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const password2 = password2Ref.current?.value;
    if (username?.trim().length === 0) {
      setError("Fill UserName Field !");
      return false;
    }
    if (password?.trim().length === 0) {
      setError("Fill Password Field !");
      return false;
    }
    if (!login && password2?.trim().length === 0) {
      setError("Fill Retype-Password Field !");
      return false;
    }
    if (!login && password !== password2) {
      setError("Password Fields don't match !");
      return false;
    }
    return true;
  };

  const LoginHandler = async () => {
    if (!validate(true)) {
      return;
    }
    setError(null);
  };

  const SignUpHandler = () => {
    if (!validate(false)) {
      return;
    }
    setError(null);
  };

  return (
    <div className={`d-flex justify-content-center py-5 ${styles.input}`}>
      <div className="p-3 p-sm-0 col-12 col-sm-6 col-md-4 col-lg-2 d-flex flex-column">
        <div className="display-6 mb-2">{isSignIn ? "Sign In" : "Sign Up"}</div>
        <label>User Name</label>
        <input
          type="text"
          placeholder="Your Name"
          className="mb-2"
          ref={userNameRef}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Your Secret"
          className="mb-2"
          ref={passwordRef}
        />
        {!isSignIn && (
          <>
            <label>Retype Password</label>
            <input
              ref={password2Ref}
              type="password"
              placeholder="Cofirm Your Secret"
              className="mb-3"
            />
          </>
        )}
        {Error !== null && <p className="text-danger">{Error}</p>}
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
