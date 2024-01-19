import React from "react";
import clsx from "clsx";
import SideMenuItem from "./SideMenuItem";

interface SectionItem {
  id: string;
  link: string;
  text: string;
}

interface Section {
  id: string;
  title?: string;
  items: SectionItem[];
}

interface Props {
  sections: Section[];
}

export default function SideMenu({ sections }: Props) {
  const sectionElements = React.useMemo(() => {
    const sectionElements = sections.map((section, index) => {
      const itemElements = section.items.map((item) => (
        <SideMenuItem key={item.id} link={item.link}>
          {item.text}
        </SideMenuItem>
      ));

      return (
        <div key={section.id}>
          {section.title ? (
            <div className={clsx(index > 0 && "mt-4 font-bold")}>
              {section.title}
            </div>
          ) : null}
          {itemElements}
        </div>
      );
    });

    return sectionElements;
  }, [sections]);

  return (
    <div className="h-full mx-2 px-2 border-r border-r-profiq-green">
      {sectionElements}
    </div>
  );
}
