import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";

export const metadata: Metadata = {
  title: "profiq.gitignore",
  description: "Creating .gitignore files has never been easier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
