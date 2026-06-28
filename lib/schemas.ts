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
});

export const sectionSchema = z.object({
  tabId: z.number().int(),
  title: z.string().min(1).max(60),
  icon: z.string().min(1),
  order: z.number().int(),
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
    order: z.number().int(),
  })
  .refine((v) => v.showIcon || v.showTitle || v.showDescription, {
    message: "Show at least one of icon, title, or description",
  });

export type DashboardInput = z.infer<typeof dashboardSchema>;
export type TabInput = z.infer<typeof tabSchema>;
export type SectionInput = z.infer<typeof sectionSchema>;
export type LinkInput = z.infer<typeof linkSchema>;
