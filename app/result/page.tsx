import Image from "next/image";
import classes from "./Result.module.css";
import CodeView from "../ui/CodeView";
import clsx from "clsx";
import { getResult } from "../api/lib/result";

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

  if (
    !searchParams ||
    searchParams == undefined ||
    !searchParams?.options ||
    !searchParams?.options == undefined
  ) {
    code = `no options specified`;
  } else {
    if (Array.isArray(searchParams.options)) {
      options = searchParams.options.map((option) => option.split(",")).flat();
    } else {
      options = searchParams.options.split(",");
    }

    remDupl = searchParams.remDupl == "false" ? false : true;
    code = await getResult(options, remDupl);
  }

  return (
    <div className={clsx("w-full")}>
      <CodeView code={code} options={options} remDupl={remDupl} />
    </div>
  );
}
