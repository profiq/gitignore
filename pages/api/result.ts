import type { NextApiRequest, NextApiResponse } from "next";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { list } from "postcss";

const token =
  "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";

type Data = {
  text: string;
};
type Error = {
  error: string;
};

async function getTechoptionsList() {
  try {
    let techOptions: string[] = await fetch(
      "https://api.github.com/repos/github/gitignore/contents",
      { method: "GET", headers: { Authorization: "Bearer " + token } },
    )
      .then((res) => res.json())
      .then((data) => {
        return data.map((element: { name: string }) =>
          element.name.slice(0, -10),
        );
      });
    return techOptions;
  } catch (e) {
    console.log(e);
    return ["###No results found###"];
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
  try {
    console.log(techOption);
    techOption = allTechOptions[techOption.toLowerCase()];
    let resultText: string = await fetch(
      "https://api.github.com/repos/github/gitignore/contents/" +
        techOption +
        ".gitignore",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return Buffer.from(data.content, "base64").toString("ascii");
      });
    return "### " + techOption + " ###\n" + resultText;
  } catch (e) {
    console.log(e);
    return "### " + techOption + " ###\n###No results found###";
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>,
) {
  const allTechOptions = await genTechOptionsDict();
  // console.log(allTechOptions)

  let techOptions = Object.keys(req.query);
  if (techOptions.length <= 0)
    return res.status(400).json({ error: "No query parameters provided" });

  let results = await Promise.all(
    techOptions.map(async (option) =>
      getElementarResult(option, allTechOptions),
    ),
  );
  let resultText = results.join("\n");

  res.appendHeader("Content-Type", "text/plain");
  res.status(200).send(resultText);
}
