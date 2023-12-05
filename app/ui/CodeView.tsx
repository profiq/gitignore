import clsx from "clsx";
import classes from "./CodeView.module.css";
import CopyButton from "./CopyButton";

interface Props {
  code: string;
  options: string[];
  remDupl: boolean;
}

export default function CodeView({ code, options, remDupl }: Props) {
  // console.log(code);
  // console.log(code.split("\n"));

  const btnClasses = "bg-[var(--profiq-green)] text-white p-2 rounded-md ml-2";

  let params = new URLSearchParams();
  params.append("options", options.join(","));
  params.append("remDupl", remDupl.toString());
  params.append("download", "true");

  return (
    <>
      <div className="z-10 sticky top-0  [var(--background-end-rgb)]">
        <div className="bg-white px-4 mx-[-1rem] h-24"></div>
        <div
          className={clsx(
            "bg-[#EDEDED] rounded-t-lg flex flex-row-reverse py-3 mt-[-4rem] shadow-[0_-5px_10px_5px_rgba(0,0,0,0.2)]",
          )}
        >
          <a
            href={`/api/result?${params.toString()}`}
            download={`${options.join("_")}.gitignore`}
          >
            <button className={clsx(classes.btn, btnClasses, "mr-2")}>
              Download
            </button>
          </a>
          <CopyButton code={code} className={clsx(classes.btn, btnClasses)} />

          <a href={`/api/result?${params.toString()}`} target="_blank">
            <button className={clsx(classes.btn, btnClasses)}>Raw view</button>
          </a>
          <div className="flex-grow flex flex-row p-2 ml-8">{`${options.join(
            "_",
          )}.gitignore`}</div>
        </div>
      </div>
      <div
        className={clsx(
          "z-0 h-full w-full bg-white rounded-b-lg  mb-10  shadow-[0_0_10px_rgba(0,0,0,0.2)]",
        )}
      >
        <div className="p-10">
          {code.split("\n").map((line, index) => {
            // console.log(line);
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
    </>
  );
}
