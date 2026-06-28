import { prisma } from "./prisma";

// Reads the dashboard's selected daisyUI theme (catppuccin flavor) for
// server-rendering `data-theme` on <html>. Falls back to "mocha".
export async function getTheme(): Promise<string> {
  const row = await prisma.dashboard.findFirst({
    where: { id: 1 },
    select: { theme: true },
  });
  return row?.theme ?? "mocha";
}
