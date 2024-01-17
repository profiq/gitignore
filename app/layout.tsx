import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/Header";
import { Roboto_Slab } from "next/font/google";
import Footer from "./ui/Footer";
import clsx from "clsx";
import { headers } from "next/headers";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const roboto = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const domain = `${headers().get("x-forwarded-proto") ?? "https"}://${
    headers().get("host") ?? ""
  }`;

  return {
    title: {
      default: ".gitignore HUB",
      template: `%s | .gitignore HUB`,
    },
    description:
      "Creating your project-specific .gitignore files has never been easier.",
    openGraph: {
      title: ".gitignore HUB",
      description:
        "Creating your project-specific .gitignore files has never been easier.",
      images: `${domain}/square-logo.png`,
    },
  };
}

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
