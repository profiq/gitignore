import {
  removeDuplicates,
  createNeededFilesDict,
  fileHeader,
  getResult,
} from "../app/api/lib/result";
import fs from "fs";

import techOptions from "./techOptions.json";
import techOptFiles from "./techOptionsFiles.json";

const techOptionsFiles: { [key: string]: string[] } = techOptFiles;
const allTechOptions: { [key: string]: string } = techOptions;

// 1. removeDuplicates

describe("removeDuplicates", () => {
  test("remove (comment) duplicate lines", async () => {
    const input = fs.readFileSync("./tests/remDupl_input.gitignore", "utf8");
    const output = fs.readFileSync("./tests/remDupl_output.gitignore", "utf8");
    expect(await removeDuplicates(input)).toBe(output);
  });

  test("remove (comment) duplicate lines: empty file", async () => {
    const input = "";
    const output = "";
    expect(await removeDuplicates(input)).toBe(output);
  });
});

//-------------------------------------------------------------------------------

// 2. createNeededFilesDict
const sortArrays = (obj: {
  [key: string]: string[];
}): { [key: string]: string[] } => {
  const sortedObj: { [key: string]: string[] } = {};

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = obj[key].sort();
    });
  return sortedObj;
};

test("create needed files dictionary: c, c++", async () => {
  const techOptions = ["C++", "C"];
  const expectedDict = {
    "C++.gitignore": ["C++"],
    "C.gitignore": ["C"],
  };
  const result = await createNeededFilesDict(
    techOptions,
    allTechOptions,
    techOptionsFiles,
  );
  expect(result).toEqual(expectedDict);
});

test("create needed files dictionary: reactnative, android", async () => {
  const techOptions = ["reactnative", "android", "Gradle"];
  const expectedDict = {
    "Android.gitignore": ["Android", "ReactNative"],
    "Android.patch": ["ReactNative", "Android"],
    "Buck.gitignore": ["ReactNative"],
    "Gradle.gitignore": ["ReactNative", "Gradle"],
    "Gradle.patch": ["Gradle", "ReactNative"],
    "Linux.gitignore": ["ReactNative"],
    "Node.gitignore": ["ReactNative"],
    "Node.patch": ["ReactNative"],
    "ReactNative.gitignore": ["ReactNative"],
    "Xcode.gitignore": ["ReactNative"],
    "Xcode.patch": ["ReactNative"],
    "macOS.gitignore": ["ReactNative"],
    "macOS.patch": ["ReactNative"],
  };

  const result = await createNeededFilesDict(
    techOptions,
    allTechOptions,
    techOptionsFiles,
  );

  expect(sortArrays(result)).toEqual(sortArrays(expectedDict));
});

//-------------------------------------------------------------------------------

// 3. fileHeader

let filesDict = {
  "ReactNative.gitignore": ["ReactNative"],
  "Android.gitignore": ["ReactNative", "Android"],
  "Android.patch": ["ReactNative", "Android"],
  "Buck.gitignore": ["ReactNative"],
  "Gradle.gitignore": ["ReactNative", "Gradle"],
  "Gradle.patch": ["ReactNative", "Gradle"],
  "Linux.gitignore": ["ReactNative"],
  "macOS.gitignore": ["ReactNative"],
  "macOS.patch": ["ReactNative"],
  "Node.gitignore": ["ReactNative"],
  "Node.patch": ["ReactNative"],
  "Xcode.gitignore": ["ReactNative"],
  "Xcode.patch": ["ReactNative"],
};

test("generate file header: ReactNative.gitignore", async () => {
  const file = "ReactNative.gitignore";

  const result = await fileHeader(file, sortArrays(filesDict));

  const expectedHeader = `### ReactNative ###
## file: ReactNative.gitignore ##

`;

  expect(result).toEqual(expectedHeader);
});

test("generate file header: Gradle.gitignore", async () => {
  const file = "Gradle.gitignore";

  const result = await fileHeader(file, sortArrays(filesDict));

  const expectedHeader = `### Gradle, ReactNative.Gradle Stack ###
## file: Gradle.gitignore ##

`;

  expect(result).toEqual(expectedHeader);
});

test("generate file header: Gradle.patch", async () => {
  const file = "Gradle.patch";

  const result = await fileHeader(file, sortArrays(filesDict));

  const expectedHeader = `## file: Gradle.patch ##

`;

  expect(result).toEqual(expectedHeader);
});

//-------------------------------------------------------------------------------

// 4. getResult

test("getResult: c, c++, remdupl=false", async () => {
  const techOptions = ["c", "c++"];

  const result = await getResult(techOptions);

  const expected = fs.readFileSync("./tests/C_C++.gitignore", "utf8");

  expect(result).toBe(expected);
});

test("getResult: ReactNative, Android", async () => {
  const techOptions = ["ReactNative", "Android"];
  const remDupl = false;

  const result = await getResult(techOptions, remDupl);

  const expected = fs.readFileSync(
    "./tests/ReactNative_Android.gitignore",
    "utf8",
  );

  expect(result).toBe(expected);
});
