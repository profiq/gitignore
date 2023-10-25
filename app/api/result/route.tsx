import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { list } from "postcss";

const token =
  "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";

async function getTechoptionsList() {
  try {
    //read all files in the directory
    let techOptions = await fs.promises.readdir(
      "./totpal.gitignoreTemplates/gitignore/templates",
    );
    techOptions = techOptions
      .filter((element) => element.endsWith(".gitignore"))
      .map((element) => element.slice(0, -10));
    // console.log(techOptions)

    return techOptions;
  } catch (e) {
    console.log(e);
    return ["### No results found ###"];
  }
}

async function genTechOptionsDict() {
  let techOptions = await getTechoptionsList();
  let techOptionsDict: { [key: string]: string } = {};
  techOptions.forEach((techOption: string) => {
    techOptionsDict[techOption.toLowerCase()] = techOption;
  });
  return techOptionsDict;
}

async function getElementarResult(
  techOption: string,
  allTechOptions: { [key: string]: string },
) {
  // console.log(encodeURI(techOption))
  try {
    // console.log(techOption);
    techOption = allTechOptions[techOption.toLowerCase()];
    //read file in the directory and return the contents
    let resultText: string = await fs.promises.readFile(
      "./totpal.gitignoreTemplates/gitignore/templates/" +
        techOption +
        ".gitignore",
      "utf8",
    );
    // console.log(rs)
    // let resultText: string = await fetch(
    //   "https://api.github.com/repos/github/gitignore/contents/" +
    //     techOption +
    //     ".gitignore",
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   },
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     return Buffer.from(data.content, "base64").toString("ascii");
    //   });
    return "### " + techOption + " ###\n" + resultText;
  } catch (e) {
    console.log(e);
    return "### " + techOption + " ###\n### No results found ###";
  }
}

export async function GET(req: NextRequest) {
  const allTechOptions = await genTechOptionsDict();
  // console.log(allTechOptions)
  let techOptions = req.nextUrl.search.substring(1).split("&");
  console.log(req);
  console.log(techOptions.map((element) => encodeURI(element)));
  if (techOptions.length <= 0) {
    return NextResponse.json(
      { error: "No query parameters provided" },
      { status: 400 },
    );
  }
  let results = await Promise.all(
    techOptions.map(async (option) =>
      getElementarResult(option, allTechOptions),
    ),
  );
  let resultText = results.join("\n");

  return new NextResponse(resultText, { status: 200 });
}
