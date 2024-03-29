import clsx from "clsx";
import CopyButton from "./CopyButton";

interface Props {
  code: string;
  options: string[];
  remDupl: boolean;
}

/**
 * Renders a code view component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.code - The .gitignore template code to be displayed.
 * @param {string[]} props.options - The options names for the code.
 * @param {boolean} props.remDupl - Indicates whether duplicate lines should be removed.
 * @returns {JSX.Element} The rendered code view component.
 */
export default function CodeView({ code, options, remDupl }: Props) {
  // Umiform buttons tailwind styling
  const btnClasses = "bg-profiq-green text-white p-2 rounded-md ml-2";

  // Create URLSearchParams object for download link
  let rawParams = new URLSearchParams();
  rawParams.append("options", options.join(","));
  rawParams.append("remDupl", remDupl.toString());

  const downloadParams = new URLSearchParams();
  downloadParams.append("options", options.join(","));
  downloadParams.append("remDupl", remDupl.toString());
  downloadParams.append("download", "true");

  return (
    <>
      {/* sticky heading with template name and buttons for raw view, copying code and downloading, REVERSE ORDER */}
      <div className="z-10 sticky top-0 ">
        {/* div hiding content that is scrolled above sticky heading */}
        <div className="bg-white px-4 mx-[-1rem] h-24"></div>

        <div
          className={clsx(
            "bg-[#EDEDED] rounded-t-lg flex flex-row-reverse py-3 mt-[-4rem] shadow-[0_-5px_10px_5px_rgba(0,0,0,0.2)]",
          )}
        >
          <a
            href={`/api/result?${downloadParams.toString()}`}
            download={`${options.join("_")}.gitignore`}
          >
            <button className={clsx(btnClasses, "mr-2")}>Download</button>
          </a>
          {/* CopyButton has to be in seperate component as it has to be client component */}
          <CopyButton code={code} className={clsx(btnClasses)} />

          <a href={`/api/result?${rawParams.toString()}`} target="_blank">
            <button className={clsx(btnClasses)}>Raw view</button>
          </a>
          <p className="flex-grow flex flex-row text-ellipsis truncate  w-[5px] overflow-hidden p-2 ml-8">{`${options.join(
            "_",
          )}.gitignore`}</p>
        </div>
      </div>
      <div
        className={clsx(
          "z-0 h-full w-full bg-white rounded-b-lg  mb-10  shadow-[0_0_10px_rgba(0,0,0,0.2)]",
        )}
      >
        <div className="p-10">
          {code.split("\n").map((line, index) => {
            // Split code by new line and map each line to a paragraph
            // Style lines starting with # as comments
            // Style lines starting with #!# No results found #!# as error
            return (
              <p
                key={index}
                className={clsx(
                  "h-5",
                  line.startsWith("#!# No results found #!#")
                    ? "text-red-600"
                    : line.startsWith("#")
                      ? "text-profiq-green"
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
