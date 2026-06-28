import { TabBar } from "./TabBar";
import type { TabData } from "@/lib/types";

const Tabs = ({ tabs, position }: { tabs: TabData[]; position?: string }) => (
  <TabBar tabs={tabs} position={position} />
);

export default Tabs;
