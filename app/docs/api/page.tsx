import ApiRequest from "@/app/ui/apiRequest";
import { headers } from "next/headers";

export default async function Usage() {
  const domain = `${headers().get("x-forwarded-proto") ?? "https"}://${
    headers().get("host") ?? ""
  }`;

  const queryParameters = [
    {
      name: "download",
      type: "boolean",
      description: "If set to true, render the page as a plain text.",
    },
    {
      name: "remDupl",
      type: "boolean",
      description: "If set to true, remove duplicates from the result",
    },
    {
      name: "options",
      type: "string",
      description:
        "URL encoded list of selected sources divided by a comma (,)",
    },
  ];

  return (
    <>
      <h1 id="api">API</h1>
      <h2 id="requests">Requests</h2>
      <ApiRequest
        method="GET"
        url={
          <span>
            {domain}
            <b>/api/result?download=true&remDupl=true&options=python</b>
          </span>
        }
        parameters={queryParameters}
      >
        Using this request you can generate the gitignore content without the
        UI.
      </ApiRequest>
    </>
  );
}
