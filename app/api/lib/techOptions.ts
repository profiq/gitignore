// 'use server'
import techOptionsDict from "@/techOptions.json";

export async function searchTechOptions(searchQuery: string) {
  // Get the keys from the techOptionsDict to search for the query
  const techOptions = Object.keys(techOptionsDict);

  // Remove spaces and make lowercase
  searchQuery = searchQuery.toLowerCase().replace(/\s/g, "");

  // Get the keys that include the search query
  const keys = techOptions.filter((element) => element.includes(searchQuery));

  // If no keys were found, remove the last character from the search query and try again
  while (keys.length === 0 && searchQuery.length > 0) {
    searchQuery = searchQuery.slice(0, -1);
    keys.push(
      ...techOptions.filter((element) => element.includes(searchQuery)),
    );
  }

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

  // console.log(`searching for "${searchQuery}" with`);
  // console.log("keys found: ", keys);
  // console.log("Results: ", results);

  return results;
}
