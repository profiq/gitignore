import { NextRequest, NextResponse } from "next/server";
import { getResult } from "@/app/api/lib/result";

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
  const download =
    req.nextUrl.searchParams.get("download") &&
    req.nextUrl.searchParams.get("download")?.toLowerCase() === "true";

  const remDupl = req.nextUrl.searchParams.get("remDupl")
    ? req.nextUrl.searchParams.get("remDupl")?.toLowerCase() === "true"
    : true;

  if (
    !req.nextUrl.searchParams.has("options") &&
    req.nextUrl.searchParams.get("options")?.replace(",", "").length === 0
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
  let resultText = await getResult(techOptions, remDupl);
  return new NextResponse(resultText, {
    status: 200,
    headers: download
      ? {
          "Content-Type": "application/json",
          "Content-Length": resultText.length.toString(),
          "Content-Disposition": `filename=${techOptions.join("_")}.gitignore`,
        }
      : {
          "Content-Type": "text/json",
          "Content-Disposition": `filename=${techOptions.join("_")}.gitignore`,
        },
  });
}
