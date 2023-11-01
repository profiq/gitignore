import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";
// import { MantineProvider, ColorSchemeScript } from '@mantine/core';
// import { theme } from '@/theme';
// import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {/* <ColorSchemeScript /> */}
      </head>
      <body className={GeistSans.className}>
        {/* <MantineProvider theme={theme}> */}
        {children}
        {/* </MantineProvider> */}
      </body>
    </html>
  );
}
