import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login Page Noto",
  description: "This is the login page of Noto",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
