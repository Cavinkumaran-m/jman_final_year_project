"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  // console.log({ status, data });
  // if (status === "unauthenticated") router.replace("/auth");
  // }, [status]);

  // if (status === "authenticated") {
  // return <div>Welcome Home</div>;
  // }
  return (
    <center>
      <h1>loading</h1>
    </center>
  );
}
