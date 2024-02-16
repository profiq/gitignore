export default async function Usage() {
  return (
    <>
      <h1 id="usage">Usage</h1>
      <h2 id="preview">Preview</h2>
      <p className="flex flex-col">Print gitignore to the terminal</p>
      <pre className="code">{"gi java,c++"}</pre>
      <h2 id="preview">Project</h2>
      <p>
        Add generated gitignore content to the <b>.gitignore</b> file
      </p>
      <pre className="code">{"gi java,c++ >> .gitignore"}</pre>
    </>
  );
}
