import clsx from "clsx";
import classes from "./CodeView.module.css";
import CopyButton from "./CopyButton";

interface Props {
  code: string;
  options: string[];
}

export default function CodeView({ code, options }: Props) {
  console.log(code);
  console.log(code.split("\n"));

  const btnClasses = "bg-[var(--profiq-green)] text-white p-2 rounded-md ml-2";

  let params = new URLSearchParams();
  params.append("options", options.join(","));
  params.append("download", "true");

  return (
    <div className={clsx(classes.box, "w-full  rounded-lg my-10")}>
      <div
        className={clsx(
          "bg-[#EDEDED] rounded-t-lg sticky top-0 flex flex-row-reverse py-3",
        )}
      >
        <a href={`/api/result?${params.toString()}`} download=".gitignore">
          <button className={clsx(classes.btn, btnClasses, "mr-2")}>
            Download
          </button>
        </a>
        <CopyButton code={code} className={clsx(classes.btn, btnClasses)} />
      </div>
      <div className={clsx("h-full max-h-[calc(100vh-15rem)]	overflow-y-auto")}>
        <div className="p-10">
          {code.split("\n").map((line, index) => {
            console.log(line);
            return (
              <p
                key={index}
                className={clsx(
                  classes.line,
                  line.startsWith("#!# No results found #!#")
                    ? "text-red-600"
                    : line.startsWith("#")
                    ? classes.comment
                    : "",
                  "text-sm",
                )}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
