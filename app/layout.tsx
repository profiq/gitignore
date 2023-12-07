import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/Header";
import { Roboto_Slab } from "next/font/google";
import Footer from "./ui/Footer";
import clsx from "clsx";

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
      <body className={clsx(roboto.className, "text-profiq-blue")}>
        <Header />
        <main
          className={clsx(
            "mx-auto px-5 py-5 relative min-h-[calc(100vh-160px)] max-w-5xl",
          )}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
