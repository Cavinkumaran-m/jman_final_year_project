"use client";

import { Header } from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Context from "../configs/Context";
import { useState } from "react";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(false);

  return (
    <html lang="en">
      <body>
        <Context.Provider
          value={{
            userName,
            isAdmin,
            loggedIn,
            token,
            id,
            setUserName,
            setIsAdmin,
            setLoggedIn,
            setToken,
            setId,
          }}
        >
          <Header />
          {children}
        </Context.Provider>
      </body>
    </html>
  );
}
