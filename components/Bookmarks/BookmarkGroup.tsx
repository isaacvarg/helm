"use client";
import Bookmark from "./Bookmark";
import Icon from "../Icon";
import { deleteSection } from "@/app/actions/dashboard";
import EditOverlay from "../edit/EditOverlay";
import AddButton from "../edit/AddButton";
import type { SectionData } from "@/lib/types";

interface BookmarkGroupProps {
  data: SectionData;
}

const BookmarkGroup = ({ data }: BookmarkGroupProps) => {
  return (
    <EditOverlay
      target={{ type: "section", id: data.id, tabId: data.tabId }}
      onDelete={() => deleteSection(data.id)}
      label="section"
    >
      <div className="space-y-3 p-2">
        <div className="flex items-center gap-2 text-white/50">
          <Icon icon={data.icon} className="w-4 h-4" />
          <h3 className="text-xs font-semibold uppercase tracking-wider">{data.title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.links.map((link) => (
            <EditOverlay
              key={link.id}
              target={{ type: "link", id: link.id, sectionId: data.id }}
              label="link"
            >
              <Bookmark data={link} />
            </EditOverlay>
          ))}
          <AddButton
            target={{ type: "link", id: null, sectionId: data.id }}
            label="Add link"
            className="col-span-2 justify-center py-4"
          />
        </div>
      </div>
    </EditOverlay>
  );
};

export default BookmarkGroup;
export type { BookmarkGroupProps };
