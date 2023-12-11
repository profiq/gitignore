const { removeDuplicates } = require("../app/api/lib/result");
import fs from "fs";

test("remove (comment) duplicate lines", async () => {
  const input = fs.readFileSync("./tests/remDupl_input.gitignore", "utf8");

  const output = fs.readFileSync("./tests/remDupl_output.gitignore", "utf8");

  expect(await removeDuplicates(input)).toBe(output);
});
