import { NextRequest, NextResponse } from "next/server";
import { searchTechOptions } from "../lib/techOptions";

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
  // Get the search results
  let result = await searchTechOptions(searchQuery);

  return NextResponse.json(result, { status: 200 });
}
