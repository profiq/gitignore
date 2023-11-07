import Image from "next/image";
import SelectInput from "./ui/SelectInput";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-5 flex min-h-screen flex-col items-center justify-center pt-20 pb-40">
      <div
        className={
          classes.h + " mb-16 flex flex-col items-center justify-center"
        }
      >
        <h1 className="text-4xl font-bold mb-5">.gitignore HUB</h1>
        <h4>
          Generate your project-specific .gitignore: Perfectly crafted for your
          tech stack
        </h4>
      </div>
      <SelectInput />
    </main>
  );
}
