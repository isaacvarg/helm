import SideImage from "../SideImage";
import BookmarkGroup from "./BookmarkGroup";
import TabHeader from "./TabHeader";
import AddButton from "../edit/AddButton";
import type { TabData } from "@/lib/types";

interface TabContentProps {
  tab: TabData;
}

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const TabContent = ({ tab }: TabContentProps) => {
  const edge = tab.sideImageEdge === "line" ? "line" : "gradient";
  const showHeaderBlock = !tab.showSideImage && !!tab.headerTitle;
  const headerAtBottom = tab.headerVAlign === "bottom";

  return (
    <>
      {tab.showSideImage && (
        <SideImage
          src={tab.sideImage}
          alt={tab.sideImageAlt}
          edge={edge}
          overlay={<TabHeader tab={tab} mode="overlay" />}
        />
      )}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        {showHeaderBlock && !headerAtBottom && (
          <TabHeader tab={tab} mode="block" />
        )}
        <div className={`grid gap-6 ${GRID_COLS[tab.sectionColumns] ?? "grid-cols-1"}`}>
          {tab.sections.map((section) => (
            <BookmarkGroup
              key={section.id}
              data={section}
              columns={tab.linkColumns}
            />
          ))}
          <AddButton
            target={{ type: "section", id: null, tabId: tab.id }}
            label="Add section"
            className="col-span-full justify-center py-4"
          />
        </div>
        {showHeaderBlock && headerAtBottom && (
          <TabHeader tab={tab} mode="block" />
        )}
      </div>
    </>
  );
};

export default TabContent;
