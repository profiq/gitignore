const fs = require("fs");

let optionsDictPrep = JSON.parse(
  fs.readFileSync("./techOptionsPrep.json", "utf8"),
);
/**
 * Retrieves a list of available tech options from the gitignore templates directory.
 * @function getTechoptionsList
 * @returns {string[]} - A promise that resolves to an array of tech options.
 */
function getTechoptionsList() {
  // Read all files in the template directory
  let techOptions = fs.readdirSync("./templates");

  // Get only files that end with .gitignore and remove the extension
  techOptions = techOptions
    .filter((element) => element.endsWith(".gitignore"))
    .map((element) => element.replace(".gitignore", ""));

  // console.log(techOptions)

  return techOptions.sort();
}

/**
 * Converts word to lowercase and removes all special characters.
 * @param {string} word - The word to be cleaned.
 * @returns {string} The cleaned word.
 */
const clean = (word) => {
  return word.toLowerCase().replace(/[!@#$%^&*()_+{}[\]:;<>,.?\/\\| \-]/g, "");
};

/**
 * Generates a dictionary of technology options. The keys are the lowercase versions of the technology options, and the values are the original technology options.
 * Also keys with removed special characters are added. The dictionary is sorted alphabetically by the values.
 * @param {string[]} alTechOptions - The list of tech options to add to the dictionary
 * @param {{ [key: string]: string }} techOptionsDictPrep - The pre-created dictionary of tech options.
 * @returns {{ [key: string]: string }} - The generated dictionary of tech options.
 */
function genTechOptionsDict(
  alTechOptions,
  techOptionsDictPrep = optionsDictPrep,
) {
  // Create a dictionary of tech options from the tech options precreated in the techOptionsPrep.json file
  let techOptionsDict = filterPrep(techOptionsDictPrep, alTechOptions);

  // Add the tech options to the dictionary
  techOptionsDict = fillTechOptionsDict(techOptionsDict, alTechOptions);

  // Sort the dictionary alphabetically by the values
  techOptionsDict = sortDictByValue(techOptionsDict);

  return techOptionsDict;
}

/**
 * Filters the techOptionsDictPrep object based on the provided alTechOptions array.
 * Values that are not included in alTechOptions means there is no corresponding template, so they are not included.
 * As cleaned techOption has higher priority than prepared keys, keys that are included in the cleaned alTechOptions array are not included
 * @param {{ [key: string]: string }} techOptionsDictPrep - The original techOptionsDictPrep object.
 * @param {string[]} alTechOptions - The array of tech options to filter against.
 * @returns {{ [key: string]: string }} - The filtered techOptionsDict object.
 */
function filterPrep(techOptionsDictPrep, alTechOptions) {
  let techOptionsDict = {};
  let allTechOptionsClean = alTechOptions.map(clean);
  for (const [key, value] of Object.entries(techOptionsDictPrep)) {
    if (alTechOptions.includes(value) && !allTechOptionsClean.includes(key)) {
      techOptionsDict[key] = value;
    }
  }
  return techOptionsDict;
}

/**
 * Fills a dictionary of tech options with the given array of tech options.
 *
 * @param {{ [key: string]: string }} techOptionsDict - The dictionary to be filled with tech options.
 * @param {string[]} alTechOptions - The array of tech options.
 * @returns {{ [key: string]: string }} - The filled tech options dictionary.
 */
function fillTechOptionsDict(techOptionsDict, alTechOptions) {
  // Fill the dictionary with all tech options
  alTechOptions.forEach((techOption) => {
    // Add the tech option to the dictionary
    let key = techOption.toLowerCase();
    techOptionsDict[key] = techOption;
  });

  // Add the tech options to the dictionary with special characters removed, only if the key does not already exist
  alTechOptions.forEach((techOption) => {
    // Add the tech option to the dictionary with special characters removed
    let key = clean(techOption);
    if (!Object.keys(techOptionsDict).includes(key)) {
      techOptionsDict[key] = techOption;
    }
  });

  // adding timestamp for debugging
  // techOptionsDict["timestamp"] = new Date().toISOString();

  return techOptionsDict;
}

/**
 * Sorts a dictionary by its values in ascending order.
 *
 * @param {{ [key: string]: string }} dict - The dictionary to be sorted.
 * @returns {{ [key: string]: string }} - The sorted dictionary.
 */
function sortDictByValue(dict) {
  let dictSorted = {};
  Object.keys(dict)
    .sort((key1, key2) => dict[key1].localeCompare(dict[key2]))
    .forEach(function (key) {
      dictSorted[key] = dict[key];
    });
  return dictSorted;
}

/**
 * Returns an array of file names for a given option.
 * If the file is a symbolic link, it will recursively follow the link and return the file names for the target.
 *
 * @param {fs.Dirent[]} files - An array of file objects.
 * @param {string} option - The option to filter the files by.
 * @returns {string[]} An array of file names.
 */
function getFilesForLink(files, option) {
  return (
    files
      .filter((file) => {
        let name = file.name.slice(0, file.name.indexOf("."));
        return name === option;
      })
      .map((file) => {
        if (file.isSymbolicLink()) {
          const target = fs.readlinkSync(`${file.path}/${file.name}`);
          return getFilesForLink(files, target.slice(0, target.indexOf(".")));
        } else {
          return [file.name];
        }
      })
      .flat()
      // remove duplicates
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      })
  );
}

/**
 * Sorts files so first will be main files (contains option name) and also prioritizing .gitignore files
 *
 * @param {string[]} files - The array of files to be sorted.
 * @param {string} option - The option to prioritize in the sorting process.
 * @returns {string[]} - The sorted array of files.
 */
function sortFiles(files, option) {
  return files.sort((a, b) => {
    if (a.includes(option) && !b.includes(option)) {
      return -1;
    } else if (!a.includes(option) && b.includes(option)) {
      return 1;
    }
    // if both files have the same option name, sort put .gitignore files first
    else if (a.slice(0, a.indexOf(".")) === b.slice(0, b.indexOf("."))) {
      if (a.includes(".gitignore") && !b.includes(".gitignore")) {
        return -1;
      } else if (!a.includes(".gitignore") && b.includes(".gitignore")) {
        return 1;
      }
    }
    return a.localeCompare(b);
  });
}

/**
 * Returns a dictionary of links for each gitignore option.
 * @returns {{ [key: string]: string[] }} The dictionary of links for each gitignore option.
 */
function getLinksDict() {
  let linksDict = {};

  // list files in the templates directory
  let files = fs.readdirSync("./templates", {
    withFileTypes: true,
  });
  files
    // filter out files that are not gitignore files (.patch or .stack)
    .filter((option) => option.name.endsWith(".gitignore"))
    .map((o) => {
      let option = o.name.replace(".gitignore", "");

      // get all real files (not links) for the option
      let filesForOption = getFilesForLink(files, option);

      // add the option and corresponding files to the dictionary
      linksDict[option] = sortFiles(filesForOption, option);
    });

  // Sort the dictionary alphabetically by the keys
  return sortDict(linksDict);
}

/**
 * Sorts a dictionary object alphabetically by its keys.
 *
 * @param {{ [key: string]: string[] }} dict - The dictionary object to be sorted.
 * @returns {{ [key: string]: string[] }} - The sorted dictionary object.
 */
function sortDict(dict) {
  let dictSorted = {};
  Object.keys(dict)
    .sort((key1, key2) => key1.localeCompare(key2))
    .forEach(function (key) {
      dictSorted[key] = dict[key];
    });
  return dictSorted;
}

// Writes both dictionaries to a files stored in the root directory.
fs.writeFileSync(
  "./techOptionsFiles.json",
  JSON.stringify(getLinksDict(), null, 2),
);

fs.writeFileSync(
  "./techOptions.json",
  JSON.stringify(genTechOptionsDict(getTechoptionsList()), null, 2),
);

module.exports = {
  getTechoptionsList,
  genTechOptionsDict,
  getFilesForLink,
  getLinksDict,
  sortDict,
  clean,
  fillTechOptionsDict,
  filterPrep,
  sortDictByValue,
  sortFiles,
};
