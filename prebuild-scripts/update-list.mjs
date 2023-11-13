import fs from "fs";

import techOptionsDict from "./techOptions.json" assert { type: 'json' };

/**
 * Retrieves a list of available tech options from the gitignore templates directory.
 * @async
 * @function getTechoptionsList
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of tech options.
 */
 function getTechoptionsList() {
  // Read all files in the template directory
  let techOptions = fs.readdirSync(
    "./toptal.gitignoreTemplates/gitignore/templates",
  );

  // Get only files that end with .gitignore and remove the extension
  techOptions = techOptions
    .filter((element) => element.endsWith(".gitignore"))
    .map((element) => element.replace(".gitignore", ""));

  // console.log(techOptions)

  return techOptions;
}

/**
 * Generates a dictionary of technology options. The keys are the lowercase versions of the technology options, and the values are the original technology options.
 * Also keys with removed special characters are added. The dictionary is sorted alphabetically by the values.
 * @returns {Object} A sorted dictionary of technology options.
 */
 function genTechOptionsDict() {
  // Get the list of tech options from the gitignore templates directory
  let techOptions = getTechoptionsList();

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
  return techOptionsDictSorted;
}

function getFilesForLink(files, option)
{
  return files
      .filter((file) => {
        let name = file.name.slice(0, file.name.indexOf("."));
        return name === option;
      })
      .map((file) => {
        if (file.isSymbolicLink()) {
          const target = fs.readlinkSync(
            `${file.path}/${file.name}`,
          );

          return getFilesForLink(files, target.slice(0, target.indexOf(".")));
        } else {
          return [file.name];
        }
      }).flat();
}

function getLinksDict() {
  let linksDict = {};

  let files = fs.readdirSync(
    "./toptal.gitignoreTemplates/gitignore/templates",
    { withFileTypes: true },
  );
    files
      .filter((option) => option.name.endsWith(".gitignore"))
      .map((o) => {
        let option = o.name.replace(".gitignore", "");

        let filesForOption = (getFilesForLink(files, option))
          .flat()
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          // sorting files so first will be main files (contains option name) and and also prioritizing .gitignore files
          .sort((a, b) => {
            if (a.includes(option) && !b.includes(option)) {
              return -1;
            } else if (!a.includes(option) && b.includes(option)) {
              return 1;
            } else if (
              a.slice(0, a.indexOf(".")) ===
              b.slice(0, b.indexOf("."))
            ) {
              if (a.includes(".gitignore") && !b.includes(".gitignore")) {
                return -1;
              } else if (
                !a.includes(".gitignore") &&
                b.includes(".gitignore")
              ) {
                return 1;
              }
            }
            return a.localeCompare(b);

          });
        linksDict[option] = filesForOption;
      })
  let linksDictSorted = {};
  Object.keys(linksDict)
    .sort((key1, key2) => key1.localeCompare(key2))
    .forEach(function (key) {
      linksDictSorted[key] = linksDict[key];
    });
  // console.log(linksDictSorted);
  return linksDictSorted;
}

fs.writeFileSync(
  "./techOptionsFiles.json",
  JSON.stringify(getLinksDict(), null, 2),
);

// Writes the dictionary to a file stored in the root directory.
fs.writeFileSync(
  "./techOptions.json",
  JSON.stringify(genTechOptionsDict(), null, 2),
);
