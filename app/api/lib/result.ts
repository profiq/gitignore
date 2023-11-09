"use server";
import fs from "fs";
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
    return `### ${techOption} ###\n#!# No results found #!#`;
  }
}

/**
 * Retrieves the gitignore templates for multiple technology options.
 * @param techOptions - An array of technology option names to retrieve the gitignore templates for.
 * @returns A string containing the gitignore templates for the specified technology options.
 */
export async function getResult(techOptions: string[]): Promise<string> {
  // Get the results for each option
  let results = await Promise.all(
    techOptions.map(async (option) => getElementarResult(option)),
  );
  // Join the results into a single string
  return results.join("\n\n");
}
