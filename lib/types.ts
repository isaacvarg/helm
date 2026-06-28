export interface DashboardData {
  id: number;
  title: string;
  subtitle: string;
  titleGradientFrom: string;
  titleGradientVia: string | null;
  titleGradientTo: string;
  backgroundImage: string;
  bgOverlayFrom: string;
  bgOverlayVia: string | null;
  bgOverlayTo: string;
  bgOverlayOpacity: number;
  theme: string;
  tabs: TabData[];
}

export interface TabData {
  id: number;
  slug: string;
  label: string;
  icon: string;
  order: number;
  pillGradientFrom: string;
  pillGradientTo: string;
  sideImage: string;
  sideImageAlt: string;
  sideImageEdge: string;
  sections: SectionData[];
}

export interface SectionData {
  id: number;
  tabId: number;
  title: string;
  icon: string;
  order: number;
  links: LinkData[];
}

export interface LinkData {
  id: number;
  sectionId: number;
  icon: string;
  title: string;
  description: string | null;
  href: string;
  newTab: boolean;
  showIcon: boolean;
  showTitle: boolean;
  showDescription: boolean;
  bgColor: string | null;
  bgOpacity: number;
  bgImage: string | null;
  textAlign: string;
  titleSize: string;
  titleWeight: string;
  textColor: string | null;
  order: number;
}
