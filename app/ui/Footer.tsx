/**
 * Footer component.
 * contains the logo and link to profiq website
 *
 * @component
 */
import React from "react";
import classes from "./Footer.module.css";
import { clsx } from "clsx";

const Footer: React.FC = () => {
  return (
    <footer className={clsx(classes.footer, "z-50")}>
      <div className={clsx(classes.wrapper, "max-w-5xl mx-auto px-5")}>
        <a
          className={clsx(classes.logo)}
          href="https://www.profiq.com/"
          target="_blank"
        ></a>
      </div>
    </footer>
  );
};

export default Footer;
