import { headers } from "next/headers";

export default async function Usage() {
  const domain = `${headers().get("x-forwarded-proto") ?? "https"}://${
    headers().get("host") ?? ""
  }`;
  return (
    <>
      <h2 id="cli-fetch">CLI Fetch</h2>
      <p className="flex flex-col">
        <b>{domain}/api/result/options=[URL encoded list]</b>
        <br />
        <span>Examples:</span>
        <span>{domain}/api/result/options=Python</span>
        <span>{domain}/api/result/options=Python%2CJava</span>
        <span>{domain}/api/result/options=Python%2CJava%2CC%2B%2B</span>
      </p>
    </>
  );
}
