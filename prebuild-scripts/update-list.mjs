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
    let words = techOption.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }).split(/[!@#$%^&*()_+{}[\]:;<>,.?\/\\| \-]/)
    words = words.filter((word)=>word.length>1)
    if(words.length>1){
      console.log(words)
      words.forEach((word)=>{
        techOptionsDict[word.toLowerCase()+techOption.toLowerCase()] = techOption;
      })
    }
  });

  let techOptionsDictSorted = {};
  Object.keys(techOptionsDict)
    .sort()
    .forEach(function (key) {
      techOptionsDictSorted[key] = techOptionsDict[key];
    });
  return techOptionsDictSorted;
}

//write json file with one object - all tech options list
fs.writeFileSync("./techOptions.json",JSON.stringify(await genTechOptionsDict()))
