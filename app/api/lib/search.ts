// 'use server'
import techOptionsDict from "@/techOptions.json";

/**
 * Searches for keys in the techOptions array that include the search query.
 * If no keys are found, it gradually reduces the search query and tries again.
 * @param techOptions - The array of tech options to search through.
 * @param searchQuery - The search query to match against the tech options.
 * @returns An array of keys that include the search query.
 */
export function search(techOptions: string[], searchQuery: string) {
  // Get the keys that include the search query
  const keys = techOptions.filter((element) => element.includes(searchQuery));

  // If no keys were found, remove the last character from the search query and try again
  while (keys.length === 0 && searchQuery.length > 1) {
    searchQuery = searchQuery.slice(0, -1);
    keys.push(
      ...techOptions.filter((element) => element.includes(searchQuery)),
    );
  }
  return keys;
}

/**
 * Sorts an array of keys based on the index of the search query in each key.
 * Keys that start with the search query will appear first in the sorted array.
 * @param keys - The array of keys to be sorted.
 * @param searchQuery - The search query used for sorting.
 * @returns The sorted array of keys.
 */
export function sort(keys: string[], searchQuery: string) {
  // sort the keys by the index of the search query in the key - first keys will be the ones that start with the search query
  keys.sort((a, b) => {
    let aIndex = a.indexOf(searchQuery);
    let bIndex = b.indexOf(searchQuery);
    
    if (aIndex === bIndex) return a.localeCompare(b);
    else return aIndex - bIndex;
  });
  return keys;
}


/**
 * Retrieves the options from a given array of keys.
 * Results are without duplicates.
 * @param keys - An array of keys representing technologies.
 * @returns An array of options corresponding to the provided keys.
 */
export function getOptionsFromKeys(keys: string[]) {
  // Create results list with names of found technologies, without duplicates
  let results: string[] = [];
  keys.forEach((key) => {
    if (!results.includes(techOptionsDict[key as keyof typeof techOptionsDict]))
      results.push(techOptionsDict[key as keyof typeof techOptionsDict]);
  });
  return results
}

/**
 * Searches for technology options based on a search query.
 * @param {string} searchQuery The search query to match against technology options.
 * @returns {string[]} An array of technology names that match the search query.
 */
export default async function searchTechOptions(searchQuery: string) {
  // Get the keys from the techOptionsDict to search for the query
  const techOptions = Object.keys(techOptionsDict);

  // Remove spaces and make lowercase
  searchQuery = searchQuery.toLowerCase().replace(/\s/g, "");

  let keys: string[] = search(techOptions, searchQuery);

  keys = sort(keys, searchQuery);

  keys = getOptionsFromKeys(keys);


  return keys;
}
