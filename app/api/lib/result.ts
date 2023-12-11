"use server";
import fs from "fs";

import techOptions from "../../../techOptions.json";
import techOptFiles from "../../../techOptionsFiles.json";

const techOptionsFiles: { [key: string]: string[] } = techOptFiles;
const allTechOptions: { [key: string]: string } = techOptions;

export async function removeDuplicates(arr: string): Promise<string> {
  return arr
    .split("\n")
    .map((line, index, array) => {
      if (array.indexOf(line) === index || line.length === 0) return line;
      return `#${line} #duplicate rule`;
    })
    .join("\n");
}

/**
 * Creates a dictionary of technology gitignore templates and their corresponding options.
 * @param techOptions - An array of requested technology options to retrieve the gitignore templates for.
 * @returns A dictionary of gitignore templates files names and their corresponding options.
 */
export async function createNeededFilesDict(techOptions: string[], allTechOptions: { [key: string]: string }, techOptionsFiles: { [key: string]: string[] }): Promise<{ [key: string]: string[] }> {
  const filesDict: { [key: string]: string[] } = {};

  techOptions.forEach((option) => {
    techOptionsFiles[allTechOptions[option.toLowerCase()]].map((file) => {
      filesDict[file] = filesDict[file] || [];
      filesDict[file].push(allTechOptions[option.toLowerCase()]);
    });
  });

  return filesDict;
}

/**
 * creates a header for the gitignore file based on corresponding options.
 * @param file - The name of the gitignore file.
 * @param filesDict - A dictionary of gitignore file names and their corresponding options.
 * @returns A string containing the header for the gitignore file.
 */
export async function fileHeader(file: string, filesDict: { [key: string]: string[] }): Promise<string> {

  let options = "";

  // if the file is not a patch, add the tech options names to the header
  // if the file hasn't the same name as option but there is a file with the option name
  // then it is a stack file and we add the stack name to the header
  if (!file.endsWith("patch")) {
    let optionNames = filesDict[file].map((option) => {
      if (
        option + ".gitignore" != file &&
        Object.keys(filesDict).includes(option + ".gitignore")
      ) {
        return `${option}.${file.slice(0, file.indexOf("."))} Stack`;
      }
      return option;
    });
    options = `### ${optionNames.join(", ")} ###\n`
  }

  return `${options}## file: ${file} ##\n\n`
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

  const filesDict = await createNeededFilesDict(techOptions, allTechOptions, techOptionsFiles);

  // reads all needed files and creates a single string
  let result = (
    await Promise.all(
      Object.keys(filesDict).map(async (file) => {
        // reading the file
        let resultText: string = await fs.promises.readFile(
          `./templates/${file}`,
          "utf8",
        );

        return `${await fileHeader(file, filesDict)}${resultText}`;
      }))
  )
    // joining all files into a single string with two empty lines between each file
    .join("\n\n");

  // commenting all duplicate rules
  if (remDupl) result = await removeDuplicates(result);

  return result;
}
