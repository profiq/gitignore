import React from "react";
import { FaGithub } from "react-icons/fa";
import classes from "./Header.module.css";
import { clsx } from "clsx";

/**
 * Header component that displays the .gitignore HUB logo, label and a link to the source codes on GitHub.
 * @returns A React functional component that renders the header.
 */
const Header: React.FC = () => {
  return (
    <header className={classes.header + " "}>
      <div className={clsx(classes.wrapper, "max-w-5xl mx-auto px-5")}>
        <a
          className={clsx(classes.logo)}
          href="https://www.profiq.com/"
          target="_blank"
        ></a>
        <span className={clsx("text-4xl float-left px-5 text-white	")}>|</span>
        <a className={clsx(classes.label, "float-left")} href="/">
          .gitignore HUB
        </a>
        <a
          className={clsx(
            classes.link,
            "flex flex-row items-center float-right",
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
