import SideMenu from "../ui/sideMenu/SideMenu";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuSections = [
    {
      id: "top-section",
      items: [
        {
          id: "return-back",
          link: "/",
          text: "<< Return back",
        },
      ],
    },
    {
      id: "api",
      title: "API",
      items: [
        {
          id: "requests",
          link: "/docs/api#requests",
          text: "Requests",
        },
      ],
    },
    {
      id: "installation",
      title: "Installation",
      items: [
        {
          id: "bash",
          link: "/docs/installation#bash",
          text: "Bash",
        },
        {
          id: "zsh",
          link: "/docs/installation#zsh",
          text: "Zsh",
        },
      ],
    },
    {
      id: "usage",
      title: "Usage",
      items: [
        {
          id: "preview",
          link: "/docs/usage#preview",
          text: "Preview",
        },
        {
          id: "project",
          link: "/docs/usage#project",
          text: "Project",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="w-full max-w-48">
        <SideMenu sections={menuSections} />
      </div>
      <div className="w-full ml-4">{children}</div>
    </div>
  );
}
