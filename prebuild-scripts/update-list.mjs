import fs from "fs";

import  techOptionsDict from './techOptions.json' assert { type: "json" }



async function getTechoptionsList() {
  try {

    //read all files in the directory
    let techOptions = await fs.promises.readdir("./totpal.gitignoreTemplates/gitignore/templates");
    techOptions=techOptions.filter((element)=>element.endsWith(".gitignore")).map((element)=>element.slice(0,-10))
    // console.log(techOptions)



    return techOptions;
  } catch (e) {
     console.log(e);
    return ["### No results found ###"];
  }
}

async function genTechOptionsDict() {
  let techOptions = await getTechoptionsList();
  techOptions.forEach((techOption) => {
    techOptionsDict[techOption.toLowerCase()] = techOption;
    techOptionsDict[techOption.replace(/[!@#$%^&*()_+{}[\]:;<>,.?\/\\| \-]/g, '').toLowerCase()] = techOption;
  });

  let techOptionsDictSorted = {};
  Object.keys(techOptionsDict)
    .sort((key1, key2)=>techOptionsDict[key1].localeCompare(techOptionsDict[key2]))
    .forEach(function (key) {
      techOptionsDictSorted[key] = techOptionsDict[key];
    });
  return techOptionsDictSorted;
}

//write json file with one object - all tech options list
fs.writeFileSync("./techOptions.json",JSON.stringify(await genTechOptionsDict()))
