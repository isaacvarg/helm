import { prisma } from "./prisma";
import type { DashboardData } from "./types";


export async function getDashboard(): Promise<DashboardData | null> {
  const row = await prisma.dashboard.findFirst({
    where: { id: 1 },
    include: {
      tabs: {
        orderBy: { order: "asc" },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              links: { orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  });
  if (!row) return null;
  return row as unknown as DashboardData;
}
