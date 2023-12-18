import searchTechOptions, { search, sort, getOptionsFromKeys } from "../../../app/api/lib/search";

import techOptions from "../../assets/techOptions.json";
import techOptFiles from "../../assets/techOptionsFiles.json";

const allTechOptions: { [key: string]: string } = techOptions;


describe("search", () => {
  it("should return an array of keys that include the search query", () => {
    const techOptions = ["javascript", "typescript", "react", "angular"];
    const searchQuery = "script";
    const result = search(techOptions, searchQuery);
    expect(result).toEqual(["javascript", "typescript"]);
  });

  it("should return an array of keys that include the search query", () => {
    const techOptions = Object.keys(allTechOptions);
    const searchQuery = "script";
    const result = search(techOptions, searchQuery);
    expect(result).toEqual([
      "actionscript",
      "coffeescript",
      "nativescript",
      "purescript",]);
  });

  it("should try to find matches for shorter words, in this case just 'v'", () => {
    const techOptions = ["javascript", "typescript", "react", "angular"];
    const searchQuery = "vue";
    const result = search(techOptions, searchQuery);
    expect(result).toEqual(['javascript']);
  });


  it("should return an empty array if no keys are found", () => {
    const techOptions = ["javascript", "typescript", "react", "angular"];
    const searchQuery = "z";
    const result = search(techOptions, searchQuery);
    expect(result).toEqual([]);
  });
});

describe("sort", () => {
  it("should sort the array of keys based on the index of the search query, show data", () => {
    const keys = [
      "__ab_____",
      "_______ab_____",
      "_____ab_____",
      "_ab_____",
      "______ab_____",
      "____ab_____",
      "ab_____",
      "___ab_____",

    ];
    const searchQuery = "ab__";
    const result = sort(keys, searchQuery);
    expect(result).toEqual(["ab_____",
      "_ab_____",
      "__ab_____",
      "___ab_____",
      "____ab_____",
      "_____ab_____",
      "______ab_____",
      "_______ab_____",]);
  });

  it("should sort the array of keys based on the index of the search query", () => {
    const keys = [
      "actionscript",
      "nativescript",
      "coffeescript",
      "purescript",];
    const searchQuery = "script";
    const result = sort(keys, searchQuery);
    expect(result).toEqual(["purescript", "actionscript", "coffeescript", "nativescript",]);
  });
});

describe("getOptionsFromKeys", () => {
  it("should retrieve the options from the array of keys", () => {
    const keys = [
      "actionscript",
      "nativescript",
      "coffeescript",
      "purescript",];
    const result = getOptionsFromKeys(keys);
    expect(result).toEqual(["Actionscript", "NativeScript", "CoffeeScript", "PureScript",]);
  });

  it("should remove duplicates from the array of keys", () => {
    const keys = ["cs-cart", "cscart", "react", "angular", "react"];
    const result = getOptionsFromKeys(keys);
    expect(result.sort()).toEqual(["CS-Cart", "react", "Angular",].sort());
  });
});

describe("searchTechOptions", () => {
  it("should return an array of technology names that match the search query", async () => {
    const searchQuery = "Script";
    const result = await searchTechOptions(searchQuery);
    expect(result).toEqual(["PureScript", "Actionscript", "CoffeeScript", "NativeScript",]);
  });

  it("should return an array of technology names that match the search query", async () => {
    const searchQuery = "cs";
    const result = await searchTechOptions(searchQuery);
    expect(result).toEqual(["CS-Cart", "Csharp", "Emacs", "PHP-CS-Fixer", "Momentics", "Crashlytics", "SynopsysVCS"]);
  });
});
