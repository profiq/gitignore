import techOptionsDict from "../../../techOptions.json";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to search for technology options based on a query string.
 * @param req The NextRequest object containing the query string.
 * @returns A NextResponse object with a JSON payload containing the search results.
 * @throws A NextResponse object with a 400 status code if no search query is provided.
 * @example
 * // GET /api/search?query=react
 * // Returns: ["react", "ReactNative"]
 */
export async function GET(req: NextRequest) {
  // Get the search query from the query string
  const searchQuery = req.nextUrl.searchParams.get("query");

  // Check if a search query was provided
  if (!searchQuery) {
    return new NextResponse("No search query", { status: 400 });
  }

  // Get the keys from the techOptionsDict to search for the query
  const techOptions = Object.keys(techOptionsDict);

  // Get the keys that include the search query
  const keys = techOptions.filter((element) => element.includes(searchQuery));

  // sort the keys by the index of the search query in the key - first keys will be the ones that start with the search query
  keys.sort((a, b) => {
    return a.indexOf(searchQuery) - b.indexOf(searchQuery);
  });

  // Create results list with names of found technologies, without duplicates
  let results: string[] = [];
  keys.forEach((key) => {
    if (!results.includes(techOptionsDict[key as keyof typeof techOptionsDict]))
      results.push(techOptionsDict[key as keyof typeof techOptionsDict]);
  });

  console.log(`searching for "${searchQuery}" with`);
  console.log("keys found: ", keys);
  console.log("Results: ", results);

  return NextResponse.json(results, { status: 200 });
}
