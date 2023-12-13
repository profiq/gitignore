/**
 * Footer component.
 * contains the logo and link to profiq website
 *
 * @component
 */
import React from "react";
import { clsx } from "clsx";

const Footer: React.FC = () => {
  return (
    <footer className={clsx("z-50 bg-profiq-blue h-20 ")}>
      <div className={clsx("max-w-5xl mx-auto px-5 ")}>
        <a
          className={clsx(
            "h-20 w-36 block float-right my-0 mx-auto",
            "bg-profiq-logo hover:bg-profiq-logo-hover bg-no-repeat bg-center bg-contain",
          )}
          href="https://www.profiq.com/"
          target="_blank"
        ></a>
      </div>
    </footer>
  );
};

export default Footer;
