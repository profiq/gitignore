"use server";
import fs from "fs";

import techOptions from "@/techOptions.json";
import techOptFiles from "@/techOptionsFiles.json";

const techOptionsFiles: { [key: string]: string[] } = techOptFiles;
const allTechOptions: { [key: string]: string } = techOptions;

function removeDuplicates(arr: string): string {
  return arr
    .split("\n")
    .map((line, index, array) => {
      if (array.indexOf(line) === index || line.length == 0) return line;
      return `#${line} #duplicate rule`;
    })
    .join("\n");
}

/**
 * Retrieves the gitignore templates for multiple technology options.
 * @param techOptions - An array of technology option names to retrieve the gitignore templates for.
 * @returns A string containing the gitignore templates for the specified technology options.
 */
export async function getResult(
  techOptions: string[],
  remDupl: boolean = true,
): Promise<string> {
  let filesDict: { [key: string]: string[] } = {};

  // creating a dictionary of all needed files and their corresponding tech options
  techOptions.forEach((option) => {
    techOptionsFiles[allTechOptions[option.toLowerCase()]].map((file) => {
      filesDict[file] = filesDict[file] || [];
      filesDict[file].push(option);
    });
  });

  // reads all needed files and creates a single string
  let result = (
    await Promise.all(
      Object.keys(filesDict).map(async (file) => {
        // reading the file
        console.warn(fs.readdirSync(".").join(", "));
        let resultText: string = await fs.promises.readFile(
          `./toptal.gitignoreTemplates/templates/${file}`,
          "utf8",
        );
        // adding header with the file name
        let result = `## file: ${file} ##\n\n${resultText}`;
        // if the file is a patch, return it as is
        if (file.endsWith("patch")) {
          return result;
        }
        // if the file is not a patch, add the tech options names to the header
        // if the file hasn't the same name as option but there is a file with the option name then it is a stack file
        // and we add the stack name to the header
        let optionNames = filesDict[file].map((option) => {
          if (
            option + ".gitignore" != file &&
            Object.keys(filesDict).includes(option + ".gitignore")
          ) {
            return `${option}.${file.slice(0, file.indexOf("."))} Stack`;
          }
          return option;
        });
        return `### ${optionNames.join(", ")} ###\n${result}`;
      }),
    )
  )
    // joining all files into a single string with two empty lines between each file
    .join("\n\n");

  // commenting all duplicate rules
  if (remDupl) result = removeDuplicates(result);

  return result;
}
