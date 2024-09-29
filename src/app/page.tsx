"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    // console.log({ status, data });
    if (status === "unauthenticated") router.replace("/auth");
  }, [status]);

  if (status === "authenticated") {
    return <div>Welcome Home Sir</div>;
  }
  return (
    <center>
      <h1>loading</h1>
    </center>
  );
}
