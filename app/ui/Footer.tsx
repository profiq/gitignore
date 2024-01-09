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
      <div className="flex flex-row justify-end items-center space-x-4 max-w-5xl mx-auto px-5">
        <div className="text-profiq-white text-lg">Powered by</div>
        <a
          className={clsx(
            "h-20 w-36 block my-0",
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
