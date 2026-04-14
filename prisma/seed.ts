import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./prisma/main.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.link.deleteMany();
  await prisma.section.deleteMany();
  await prisma.tab.deleteMany();
  await prisma.dashboard.deleteMany();

  const dashboard = await prisma.dashboard.create({
    data: {
      id: 1,
      title: "My Dashboard",
      subtitle: "Your aesthetic bookmark collection",
      titleGradientFrom: "#f9a8d4",
      titleGradientVia: "#d8b4fe",
      titleGradientTo: "#93c5fd",
      backgroundImage: "/defaults/background.jpg",
      bgOverlayFrom: "#581c8766",
      bgOverlayVia: "#831843",
      bgOverlayTo: "#1e3a8a66",
    },
  });

  const tabsSeed = [
    {
      slug: "home", label: "Home", icon: "LuHouse", order: 0,
      pillGradientFrom: "#ec4899", pillGradientTo: "#a855f7",
      sideImage: "https://picsum.photos/seed/home/800/1200", sideImageAlt: "Home", sideImageEdge: "gradient",
      sections: [
        { title: "Productivity", icon: "LuCalendar", order: 0, links: [
          { icon: "LuMail", title: "Gmail", description: "Email & communication", href: "https://mail.google.com", newTab: true, order: 0 },
          { icon: "LuCalendar", title: "Google Calendar", description: "Schedule & events", href: "https://calendar.google.com", newTab: true, order: 1 },
        ]},
      ],
    },
    {
      slug: "entertainment", label: "Entertainment", icon: "LuSparkles", order: 1,
      pillGradientFrom: "#ec4899", pillGradientTo: "#a855f7",
      sideImage: "https://picsum.photos/seed/fun/800/1200", sideImageAlt: "Entertainment", sideImageEdge: "gradient",
      sections: [
        { title: "Media", icon: "LuTv", order: 0, links: [
          { icon: "LuVideo", title: "YouTube", description: "Videos & creators", href: "https://youtube.com", newTab: true, order: 0 },
        ]},
        { title: "Gaming", icon: "LuGamepad2", order: 1, links: [
          { icon: "LuGamepad2", title: "Chess.com", description: "Online chess", href: "https://chess.com", newTab: true, order: 0 },
        ]},
      ],
    },
  ];

  for (const t of tabsSeed) {
    const { sections, ...tabData } = t;
    const tab = await prisma.tab.create({ data: { ...tabData, dashboardId: dashboard.id } });
    for (const s of sections) {
      const { links, ...sectionData } = s;
      const section = await prisma.section.create({ data: { ...sectionData, tabId: tab.id } });
      for (const l of links) {
        await prisma.link.create({ data: { ...l, sectionId: section.id } });
      }
    }
  }

  console.log("Seed complete.");
}

main().finally(() => prisma.$disconnect());
