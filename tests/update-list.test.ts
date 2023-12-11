import fs from "fs";
import techOptions from "./techOptions.json";
import techOptFiles from "./techOptionsFiles.json";
import {
  genTechOptionsDict,
  getFilesForLink,
  getLinksDict,
  getTechoptionsList,
} from "../update-tech-options/update-list.js";

test("getLinksDict()", () => {
  const result = getLinksDict();
  let expected = techOptFiles;
  expect(result).toEqual(expected);
});

test("genTechOptionsDict()", () => {
  let optionList = Object.values(techOptions);
  optionList = optionList.filter(function (item, pos) {
    return optionList.indexOf(item) == pos;
  });
  const result = genTechOptionsDict(optionList);
  let expected = techOptions;
  expect(result).toEqual(expected);
});

test("getFilesForLink()", () => {
  let files = fs.readdirSync("./templates", {
    withFileTypes: true,
  });
  const result = getFilesForLink(files, "ReactNative");
  let expected = [
    "Android.gitignore",
    "Android.patch",
    "Buck.gitignore",
    "Gradle.gitignore",
    "Gradle.patch",
    "Linux.gitignore",
    "Node.gitignore",
    "Node.patch",
    "Xcode.gitignore",
    "Xcode.patch",
    "ReactNative.gitignore",
    "macOS.gitignore",
    "macOS.patch",
  ];
  expect(result.sort()).toEqual(expected.sort());
});

test("getTechoptionsList()", () => {
  const result = getTechoptionsList();
  let expected = Object.values(techOptions);
  expected = expected.filter(function (item, pos) {
    return expected.indexOf(item) == pos;
  });
  expect(result.sort()).toEqual(expected.sort());
});
