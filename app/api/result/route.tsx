import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import allTechOptions from "@/techOptions.json";

/**
 * Retrieves the gitignore template for a given technology option.
 * @param techOption - The name of the technology option to retrieve the gitignore template for.
 * @returns A string containing the gitignore template for the specified technology option.
 */
async function getElementarResult(techOption: string): Promise<string> {
  // console.log(encodeURI(techOption))
  try {
    // console.log(techOption);
    // Get the name of the technology option
    let techOptionName: string =
      allTechOptions[techOption.toLowerCase() as keyof typeof allTechOptions];
    // Read the proper file in the directory
    let resultText: string = await fs.promises.readFile(
      `./totpal.gitignoreTemplates/gitignore/templates/${techOptionName}.gitignore`,
      "utf8",
    );
    return `### ${techOptionName} ###\n` + resultText;
  } catch (e) {
    console.log(e);
    return `### ${techOption} ###\n### No results found ###`;
  }
}

/**
 * Handles GET requests for the result route.
 * The GET request for the result route expects a query parameter called "options" which should be a comma-separated
 * list of technology options for which the gitignore templates are to be retrieved.
 * For example, a valid query parameter could be "options=node,react,nextjs"
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse>} A Promise that resolves to a Next.js response object.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Check if options query parameter is present
  if (
    !req.nextUrl.searchParams.has("options") &&
    req.nextUrl.searchParams.get("options")?.replace(",", "").length == 0
  ) {
    return NextResponse.json(
      { error: "No query parameters provided" },
      { status: 400 },
    );
  }
  // Get the options from the query parameter
  let techOptions = (req.nextUrl.searchParams.get("options") as string).split(
    ",",
  );
  // Get the results for each option
  let results = await Promise.all(
    techOptions.map(async (option) => getElementarResult(option)),
  );
  // Join the results into a single string
  let resultText = results.join("\n");

  return new NextResponse(resultText, { status: 200 });
}
