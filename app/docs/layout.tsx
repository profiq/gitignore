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
      id: "usage",
      title: "Usage",
      items: [
        {
          id: "fetch",
          link: "/docs/usage#cli-fetch",
          text: "CLI Fetch",
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
