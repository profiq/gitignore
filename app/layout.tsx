import type { Metadata } from "next";
import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";
import Header from "./ui/Header";
import { Roboto_Slab } from "next/font/google";

const roboto = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={roboto.className}>
        <Header />

        <main className="max-w-5xl mx-auto px-5 relative flex min-h-screen flex-col items-center justify-center pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
