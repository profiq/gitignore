const fs = require("fs");

let techOptionsDict = JSON.parse(
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

  return techOptions;
}

/**
 * Generates a dictionary of technology options. The keys are the lowercase versions of the technology options, and the values are the original technology options.
 * Also keys with removed special characters are added. The dictionary is sorted alphabetically by the values.
 * @returns {Object} A sorted dictionary of technology options.
 */
function genTechOptionsDict(alTechOptions) {
  // Create a dictionary of tech options
  alTechOptions.forEach((techOption) => {
    // Add the tech option to the dictionary
    techOptionsDict[techOption.toLowerCase()] = techOption;
    // Add the tech option to the dictionary with special characters removed
    let key = techOption
      .replace(/[!@#$%^&*()_+{}[\]:;<>,.?\/\\| \-]/g, "")
      .toLowerCase();
    if (!Object.keys(techOptionsDict).includes(key)) {
      techOptionsDict[key] = techOption;
    }
  });

  // adding timestamp for debugging
  // techOptionsDict["timestamp"] = new Date().toISOString();

  // Sort the dictionary alphabetically by the values
  return sortDictByValue(techOptionsDict);
}

/**
 * Returns an array of file names for a given option.
 * If the file is a symbolic link, it will recursively follow the link and return the file names for the target.
 *
 * @param {Array} files - An array of file objects.
 * @param {string} option - The option to filter the files by.
 * @returns {Array} An array of file names.
 */
function getFilesForLink(files, option) {
  return files
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
    .flat();
}

/**
 * Returns a dictionary of links for each gitignore option.
 * @returns {Object} The dictionary of links for each gitignore option.
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
      let filesForOption = getFilesForLink(files, option)
        // remove duplicates
        .filter((value, index, array) => {
          return array.indexOf(value) === index;
        })
        // sorting files so first will be main files (contains option name) and and also prioritizing .gitignore files
        .sort((a, b) => {
          if (a.includes(option) && !b.includes(option)) {
            return -1;
          } else if (!a.includes(option) && b.includes(option)) {
            return 1;
          }
          // if both files have the same option name, sort by put .gitignore files first
          else if (a.slice(0, a.indexOf(".")) === b.slice(0, b.indexOf("."))) {
            if (a.includes(".gitignore") && !b.includes(".gitignore")) {
              return -1;
            } else if (!a.includes(".gitignore") && b.includes(".gitignore")) {
              return 1;
            }
          }
          return a.localeCompare(b);
        });

      // add the option and corresponding files to the dictionary
      linksDict[option] = filesForOption;
    });

  // Sort the dictionary alphabetically by the keys
  return sortDict(linksDict);
}

function sortDict(dict) {
  let dictSorted = {};
  Object.keys(dict)
    .sort((key1, key2) => key1.localeCompare(key2))
    .forEach(function (key) {
      dictSorted[key] = dict[key];
    });
  return dictSorted;
}

function sortDictByValue(dict) {
  let dictSorted = {};
  Object.keys(dict)
    .sort((key1, key2) => dict[key1].localeCompare(dict[key2]))
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
};
