import CodeView from "../ui/CodeView";
import clsx from "clsx";
import getResult from "../api/lib/result";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return {
    title: `Result file`,
    description: `Creating .gitignore for: ${[searchParams?.["options"]]
      .flat()
      ?.map((option) => option?.split(","))
      .flat()
      .join(", ")}.`,
  };
}

/**
 * Renders the Result component.
 *
 * @param params - The parameters object.
 * @param searchParams - The search parameters object.
 * @param searchParams.options - The options parameter, string containing options separated by comma.
 * @param searchParams.remDupl - The remDupl parameter, a boolean indicating whether to remove duplicate lines.
 *
 * @returns The rendered Result page.
 */
export default async function Result({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let code: string;
  let options: string[] = [];
  let remDupl: boolean = true;

  if (!searchParams || !searchParams?.options) {
    code = `no options specified`;
  } else {
    // Split options by comma
    if (Array.isArray(searchParams.options)) {
      options = searchParams.options.map((option) => option.split(",")).flat();
    } else {
      options = searchParams.options.split(",");
    }

    // Get value of remDupl parameter
    remDupl =
      searchParams.remDupl &&
      (searchParams.remDupl as String).toLowerCase() === "false"
        ? false
        : true;

    // Get generated .gitignore code
    code = await getResult(options, remDupl);
  }

  return (
    <div className={clsx("w-full")}>
      <CodeView code={code} options={options} remDupl={remDupl} />
    </div>
  );
}
