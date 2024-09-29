"use client";

import { Header } from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
