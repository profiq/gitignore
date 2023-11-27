import type { Metadata } from "next";
import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";
import Header from "./ui/Header";
import { Roboto_Slab } from "next/font/google";
import Footer from "./ui/Footer";

import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";

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
        <ColorSchemeScript />
      </head>
      <body className={roboto.className}>
        <MantineProvider>
          <Header />

          <main className="max-w-5xl mx-auto px-5 relative min-h-[calc(100vh-160px)]  py-5 ">
            {children}
          </main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
