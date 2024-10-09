"use client";

import { useState } from "react";
import Button from "./Button";
import styles from "./SignInForm.module.css";
import { useRef } from "react";
import baseUrl from "@/configs/Baseurl";
import { useAuthContext } from "@/configs/Context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInForm() {
  const router = useRouter();
  const { setUserName, setIsAdmin, setLoggedIn, setFullName, setId } =
    useAuthContext();
  const [isSignIn, setSignIn] = useState(true);
  const [Error, setError] = useState<string | null>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const validate = (login: boolean) => {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const password2 = password2Ref.current?.value;
    const email = emailRef.current?.value;
    const fullName = fullNameRef.current?.value;
    if (username?.trim().length === 0) {
      setError("Fill UserName Field !");
      return false;
    }
    if (password?.trim().length === 0) {
      setError("Fill Password Field !");
      return false;
    }
    if (!login && email?.trim().length === 0) {
      setError("Fill Email Field !");
      return false;
    }
    if (!login && fullName?.trim().length === 0) {
      setError("Fill full Name Field !");
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
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    fetch(baseUrl + "auth/login", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then((res) => toast.error(res.error));
          return null;
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          toast.success("Login Success");
          setFullName(res.fullName);
          setIsAdmin(res.role === "admin" ? true : false);
          setLoggedIn(true);
          setUserName(res.userName);
          setId(res.id);
          res.role === "admin"
            ? router.push("/dashboard")
            : router.push("/home");
        }
      })
      .catch((error) => {
        console.log("cav", error);
      });
    setError(null);
  };

  const SignUpHandler = async () => {
    if (!validate(false)) {
      return;
    }
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    const fullName = fullNameRef.current?.value;

    fetch(baseUrl + "auth/signup", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        fullName,
      }),
    })
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
          console.log(res.message);
          setSignIn((prev) => !prev);
        }
      })
      .catch((error) => console.log(error));
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
        {!isSignIn && (
          <>
            <label>Full Name</label>
            <input
              ref={fullNameRef}
              type="text"
              placeholder="Your Full Name"
              className="mb-2"
            />
            <label>Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="ck@gmail.com"
              className="mb-2"
            />
          </>
        )}
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
