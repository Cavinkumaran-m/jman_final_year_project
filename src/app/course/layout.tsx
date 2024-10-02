"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import { ModalContext } from "@/configs/Context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalData, setModalData] = useState<modalDataType | null>(null);
  return (
    <>
      <Modal
        title={modalData?.title}
        content={modalData?.content}
        course_id={modalData?.course_id}
      />
      <ModalContext.Provider value={{ modalData, setModalData }}>
        {children}
      </ModalContext.Provider>
    </>
  );
}
