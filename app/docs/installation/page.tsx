import { headers } from "next/headers";

export default async function Usage() {
  const domain = `${headers().get("x-forwarded-proto") ?? "https"}://${
    headers().get("host") ?? ""
  }`;
  return (
    <>
      <h1 id="installation">Installation</h1>
      <p>
        You need to create a function in your shell so that you can call it from
        your CLI whenever you need it.
      </p>
      <h2 id="bash">Bash</h2>
      <pre className="code">
        {'echo "function gi() { \\\n'}
        {'curl -sL --get --data-urlencode \\"options=\\$@\\" \\\n'}
        {`\\\"${domain}/api/result?download=true&remDupl=true\\\" \\\n`}
        {';}" >> ~/.bashrc && source ~/.bashrc'}
      </pre>
      <h2 id="zsh">Zsh</h2>
      <pre className="code">
        {'echo "function gi() { \\\n'}
        {
          'curl -sLw \\"\\\\\\n\\" --get --data-urlencode \\"options=\\$@\\" \\\n'
        }
        {`\\\"${domain}/api/result?download=true&remDupl=true\\\" \\\n`}
        {';}" >> ~/.zshrc && source ~/.zshrc'}
      </pre>
    </>
  );
}
