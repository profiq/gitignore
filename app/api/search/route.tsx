import techOptionsDict from "../../../techOptions.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!req.nextUrl.searchParams.has("s")) {
    return new NextResponse("No search query", { status: 400 });
  }

  const techOptions: string[] = Object.keys(techOptionsDict);

  const search = req.nextUrl.searchParams.get("s") as string;
  console.log(`searching for "${search}" with`);

  let startKeys = techOptions.filter((element) => element.startsWith(search));
  // console.log(startKeys)

  let includeKeys = techOptions.filter((element) => element.includes(search));
  // console.log(includeKeys)

  let results: string[] = [];

  let keys = [...startKeys, ...includeKeys];
  console.log("keys found: ", keys);

  while (keys.length > 0) {
    let key = keys.shift() as string;
    if (
      !results.includes(techOptionsDict[key as keyof typeof techOptionsDict])
    ) {
      results.push(techOptionsDict[key as keyof typeof techOptionsDict]);
    }
  }
  console.log("Results: ", results);

  return NextResponse.json(results, { status: 200 });
}
