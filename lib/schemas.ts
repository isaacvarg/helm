import { z } from "zod";

const hex = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Must be a hex color like #a1b2c3");

export const dashboardSchema = z.object({
  title: z.string().min(1).max(120),
  subtitle: z.string().max(240),
  titleGradientFrom: hex,
  titleGradientVia: hex.nullable(),
  titleGradientTo: hex,
  backgroundImage: z.string().min(1),
  bgOverlayFrom: hex,
  bgOverlayVia: hex.nullable(),
  bgOverlayTo: hex,
  bgOverlayOpacity: z.number().min(0).max(1),
  theme: z.enum(["latte", "frappe", "macchiato", "mocha"]),
});

export const tabSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
  label: z.string().min(1).max(40),
  icon: z.string().min(1),
  order: z.number().int(),
  pillGradientFrom: hex,
  pillGradientTo: hex,
  sideImage: z.string().min(1),
  sideImageAlt: z.string(),
  sideImageEdge: z.enum(["gradient", "line"]),
  showSideImage: z.boolean(),
  bgColor: hex.nullable(),
  bgOpacity: z.number().min(0).max(1),
  bgImage: z.string().nullable(),
  borderWidth: z.number().int().min(0).max(8),
  borderStyle: z.enum(["solid", "dashed", "dotted", "double"]),
  borderColor: hex.nullable(),
  sectionColumns: z.number().int().min(1).max(4),
  linkColumns: z.number().int().min(1).max(4),
  headerTitle: z.string().max(60),
  headerVAlign: z.enum(["top", "center", "bottom"]),
  headerHAlign: z.enum(["left", "center", "right"]),
  headerColor: hex.nullable(),
  headerSize: z.enum(["sm", "base", "lg", "xl", "2xl", "3xl", "4xl"]),
  headerWeight: z.enum(["normal", "medium", "semibold", "bold"]),
  pillBgColor: hex.nullable(),
  pillBgOpacity: z.number().min(0).max(1),
  pillBgImage: z.string().nullable(),
  pillShowIcon: z.boolean(),
  pillShowTitle: z.boolean(),
  pillTitleColor: hex.nullable(),
  pillTitleSize: z.enum(["xs", "sm", "base", "lg", "xl"]),
  pillTitleWeight: z.enum(["normal", "medium", "semibold", "bold"]),
}).refine((v) => v.pillShowIcon || v.pillShowTitle, {
  message: "Show at least the pill icon or title",
});

export const sectionSchema = z
  .object({
    tabId: z.number().int(),
    title: z.string().min(1).max(60),
    icon: z.string().min(1),
    order: z.number().int(),
    showIcon: z.boolean(),
    showTitle: z.boolean(),
    iconSize: z.enum(["xs", "sm", "base", "lg", "xl"]),
    titleSize: z.enum(["xs", "sm", "base", "lg", "xl"]),
    titleWeight: z.enum(["normal", "medium", "semibold", "bold"]),
    titleColor: hex.nullable(),
    borderWidth: z.number().int().min(0).max(8),
    borderStyle: z.enum(["solid", "dashed", "dotted", "double"]),
    borderColor: hex.nullable(),
    bgColor: hex.nullable(),
    bgOpacity: z.number().min(0).max(1),
    bgImage: z.string().nullable(),
  })
  .refine((v) => v.showIcon || v.showTitle, {
    message: "Show at least the icon or title",
  });

export const linkSchema = z
  .object({
    sectionId: z.number().int(),
    icon: z.string().min(1),
    title: z.string().min(1).max(60),
    description: z.string().max(160),
    href: z.url(),
    newTab: z.boolean(),
    showIcon: z.boolean(),
    showTitle: z.boolean(),
    showDescription: z.boolean(),
    bgColor: hex.nullable(),
    bgOpacity: z.number().min(0).max(1),
    bgImage: z.string().nullable(),
    borderWidth: z.number().int().min(0).max(8),
    borderStyle: z.enum(["solid", "dashed", "dotted", "double"]),
    borderColor: hex.nullable(),
    textAlign: z.enum(["left", "center", "right"]),
    titleSize: z.enum(["xs", "sm", "base", "lg", "xl", "2xl"]),
    titleWeight: z.enum(["normal", "medium", "semibold", "bold"]),
    textColor: hex.nullable(),
    order: z.number().int(),
  })
  .refine((v) => v.showIcon || v.showTitle || v.showDescription, {
    message: "Show at least one of icon, title, or description",
  });

export type DashboardInput = z.infer<typeof dashboardSchema>;
export type TabInput = z.infer<typeof tabSchema>;
export type SectionInput = z.infer<typeof sectionSchema>;
export type LinkInput = z.infer<typeof linkSchema>;
