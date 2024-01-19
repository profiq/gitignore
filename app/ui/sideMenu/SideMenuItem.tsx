import React from "react";
import Link from "next/link";

interface Props {
  link: string;
  children: React.ReactNode;
}

export default function SideMenuItem({ children, link }: Props) {
  return (
    <Link
      href={link}
      className="flex items-center p-1 cursor-pointer h-8 hover:bg-profiq-green rounded"
    >
      {children}
    </Link>
  );
}
