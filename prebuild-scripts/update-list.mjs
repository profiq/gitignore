import fs from "fs";

import techOptionsDict from "./techOptions.json" assert { type: "json" };

/**
 * Retrieves a list of available tech options from the gitignore templates directory.
 * @async
 * @function getTechoptionsList
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of tech options.
 */
async function getTechoptionsList() {
     // Read all files in the template directory
    let techOptions = await fs.promises.readdir(
      "./topptal.gitignoreTemplates/gitignore/templates",
    );

    // Get only files that end with .gitignore and remove the extension
    techOptions = techOptions
      .filter((element) => element.endsWith(".gitignore"))
      .map((element) => element.slice(0, -10));

    // console.log(techOptions)

    return techOptions;
}

/**
 * Generates a dictionary of technology options. The keys are the lowercase versions of the technology options, and the values are the original technology options.
 * Also keys with removed special characters are added. The dictionary is sorted alphabetically by the values.
 * @returns {Object} A sorted dictionary of technology options.
 */
async function genTechOptionsDict() {
  // Get the list of tech options from the gitignore templates directory
  let techOptions = await getTechoptionsList();

  // Create a dictionary of tech options
  techOptions.forEach((techOption) => {
    // Add the tech option to the dictionary
    techOptionsDict[techOption.toLowerCase()] = techOption;
    // Add the tech option to the dictionary with special characters removed
    techOptionsDict[
      techOption
        .replace(/[!@#$%^&*()_+{}[\]:;<>,.?\/\\| \-]/g, "")
        .toLowerCase()
    ] = techOption;
  });

  // Sort the dictionary alphabetically by the values
  let techOptionsDictSorted = {};
  Object.keys(techOptionsDict)
    .sort((key1, key2) =>
      techOptionsDict[key1].localeCompare(techOptionsDict[key2]),
    )
    .forEach(function (key) {
      techOptionsDictSorted[key] = techOptionsDict[key];
    });
    techOptionsDictSorted["timestamp"] = Date.now();
  return techOptionsDictSorted;
}

// Writes the dictionary to a file stored in the root directory.
fs.writeFileSync(
  "./techOptions.json",
  JSON.stringify(await genTechOptionsDict()),
);
