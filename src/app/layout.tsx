"use client";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapJS from "@/configs/BootStrapJS";
import "./globals.css";
import Context from "../configs/Context";
import { useState } from "react";
import Modal from "@/components/Modal";
import { ModalContext } from "@/configs/Context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalData, setModalData] = useState<modalDataType | null>(null);
  const [userName, setUserName] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(false);
  const clearAuth = () => {
    setUserName(null);
    setFullName(null);
    setIsAdmin(null);
    setLoggedIn(false);
    setId(null);
    setToken(false);
  };

  return (
    <html lang="en">
      <body>
        <Context.Provider
          value={{
            userName,
            fullName,
            isAdmin,
            loggedIn,
            token,
            id,
            setUserName,
            setFullName,
            setIsAdmin,
            setLoggedIn,
            setToken,
            setId,
            clearAuth,
          }}
        >
          <Header />
          <SideBar />
          <Modal
            title={modalData?.title}
            content={modalData?.content}
            onClickAction={modalData?.onClickAction}
          />
          <ModalContext.Provider value={{ modalData, setModalData }}>
            {children}
          </ModalContext.Provider>
          <BootstrapJS />
        </Context.Provider>
      </body>
    </html>
  );
}
