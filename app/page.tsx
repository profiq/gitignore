"use client";
import SelectInput from "./ui/SelectInput";
import clsx from "clsx";
import { Suspense } from "react";

/**
 * Renders the Home component with the SelectInput component.
 *
 * @returns The rendered Home component.
 */
export default function Home() {
  return (
    <>
      <div
        className={clsx(
          "mt-16 mb-16 flex flex-col items-center justify-center",
        )}
      >
        <h1 className="text-4xl font-bold mb-5">.gitignore HUB</h1>
        <h4>
          Generate your project-specific .gitignore: Perfectly crafted for your
          tech stack
        </h4>
      </div>
      <Suspense fallback={<div></div>}>
        <SelectInput className="mx-auto" />
      </Suspense>
    </>
  );
}
