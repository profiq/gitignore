"use client";
import SelectInput from "./ui/SelectInput";
import classes from "./Home.module.css";
import clsx from "clsx";
import { Suspense } from "react";
function SelectInputFallback() {
  return <div></div>;
}

export default function Home() {
  return (
    <>
      <div
        className={clsx(
          classes.h,
          "mt-16 mb-16 flex flex-col items-center justify-center",
        )}
      >
        <h1 className="text-4xl font-bold mb-5">.gitignore HUB</h1>
        <h4>
          Generate your project-specific .gitignore: Perfectly crafted for your
          tech stack
        </h4>
      </div>
      <Suspense fallback={<SelectInputFallback />}>
        <SelectInput className="mx-auto" />
      </Suspense>
    </>
  );
}
