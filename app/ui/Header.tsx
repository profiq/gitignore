import React from "react";
import { FaGithub } from "react-icons/fa";
import classes from "./Header.module.css";
import { clsx } from "clsx";
import Link from "next/link";

/**
 * Header component that displays the .gitignore HUB logo, label and a link to the source codes on GitHub.
 * @returns A React functional component that renders the header.
 */
const Header: React.FC = () => {
  return (
    <header className={clsx(classes.header, "z-50")}>
      <div className={clsx(classes.wrapper, "max-w-5xl mx-auto")}>
        <Link className={clsx(classes.label, "float-left px-5 ")} href="/">
          .gitignore HUB
        </Link>
        <a
          className={clsx(
            classes.link,
            "flex flex-row items-center float-right px-5",
          )}
          href="https://github.com/profiq/gitignore"
          target="_blank"
        >
          <span className={clsx(classes.linkLabel)}>Source codes</span>
          <div className={classes.icon}>
            <FaGithub />
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
