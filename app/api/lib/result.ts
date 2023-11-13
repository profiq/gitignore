"use server";
import fs from "fs";

const allTechOptions: { [key: string]: string } = require("@/techOptions.json");
const techOptionsFiles: {
  [key: string]: string[];
} = require("@/techOptionsFiles.json");

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
    let techOptionName: string = allTechOptions[techOption.toLowerCase()];
    // Read the proper file in the directory
    // console.log(await fs.promises.readdir('./'))
    let resultText: string = await fs.promises.readFile(
      `./toptal.gitignoreTemplates/gitignore/templates/${techOptionName}.gitignore`,
      "utf8",
    );
    return `### ${techOptionName} ###\n` + resultText;
  } catch (e) {
    // console.log(e);
    return `### ${techOption} ###\n#!# No results found #!#`;
  }
}

/**
 * Retrieves the gitignore templates for multiple technology options.
 * @param techOptions - An array of technology option names to retrieve the gitignore templates for.
 * @returns A string containing the gitignore templates for the specified technology options.
 */
export async function getResult(techOptions: string[]): Promise<string> {
  let filesDict: { [key: string]: string[] } = {};
  techOptions.forEach((option) => {
    techOptionsFiles[allTechOptions[option.toLowerCase()]].map((file) => {
      filesDict[file] = filesDict[file] || [];
      filesDict[file].push(option);
    });
  });
  let result = (
    await Promise.all(
      Object.keys(filesDict).map(async (file) => {
        let resultText: string = await fs.promises.readFile(
          `./toptal.gitignoreTemplates/gitignore/templates/${file}`,
          "utf8",
        );
        let result = `## file: ${file} ##\n\n${resultText}`;
        if (file.endsWith("patch")) {
          return result;
        }
        let optionNames = filesDict[file].map((option) => {
          if (
            option + ".gitignore" == file ||
            !Object.keys(filesDict).includes(option + ".gitignore")
          ) {
            return option;
          }
          return `${option}.${file.slice(0, file.indexOf("."))}`;
        });
        return `### ${optionNames.join(", ")} ###\n${result}`;
      }),
    )
  ).join("\n\n");

  result = result
    .split("\n")
    .map((line, index, array) => {
      if (array.indexOf(line) === index) return line;
      return `#${line} #duplicate rule`;
    })
    .join("\n");

  return result;
  // Get the results for each option
  let results = await Promise.all(
    techOptions.map(async (option) => getElementarResult(option)),
  );
  // Join the results into a single string
  return results.join(
    "\n-----------------------------------------------------------------------------------------------------------------------\n\n",
  );
}
