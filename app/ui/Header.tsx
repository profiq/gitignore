import React from "react";
import { FaGithub } from "react-icons/fa";
import { clsx } from "clsx";
import Link from "next/link";

/**
 * Header component that displays the .gitignore HUB logo, label and a link to the source codes on GitHub.
 * @returns A React functional component that renders the header.
 */
const Header: React.FC = () => {
  return (
    <header className={clsx("z-50 bg-profiq-blue h-20 ")}>
      <div className={clsx("max-w-5xl mx-auto")}>
        <Link
          className={clsx(
            "text-white hover:text-profiq-green float-left px-5 leading-[80px] text-2xl",
          )}
          href="/"
        >
          .gitignore HUB
        </Link>
        <a
          className={clsx(
            "flex flex-row items-center float-right px-5 text-white no-underline leading-[80px] text-base ",
            "font-semibold hover:text-profiq-green",
          )}
          href="https://github.com/profiq/gitignore"
          target="_blank"
        >
          <span className={clsx("relative")}>Source codes</span>
          <div className={clsx("")}>
            <FaGithub className="m-1.5 w-8 h-8" />
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
