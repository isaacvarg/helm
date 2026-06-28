-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dashboardId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "pillGradientFrom" TEXT NOT NULL,
    "pillGradientTo" TEXT NOT NULL,
    "sideImage" TEXT NOT NULL,
    "sideImageAlt" TEXT NOT NULL,
    "sideImageEdge" TEXT NOT NULL,
    "showSideImage" BOOLEAN NOT NULL DEFAULT true,
    "bgColor" TEXT,
    "bgOpacity" REAL NOT NULL DEFAULT 1,
    "bgImage" TEXT,
    "borderWidth" INTEGER NOT NULL DEFAULT 0,
    "borderStyle" TEXT NOT NULL DEFAULT 'solid',
    "borderColor" TEXT,
    "sectionColumns" INTEGER NOT NULL DEFAULT 1,
    "linkColumns" INTEGER NOT NULL DEFAULT 2,
    "headerTitle" TEXT NOT NULL DEFAULT '',
    "headerVAlign" TEXT NOT NULL DEFAULT 'top',
    "headerHAlign" TEXT NOT NULL DEFAULT 'center',
    "headerColor" TEXT,
    "headerSize" TEXT NOT NULL DEFAULT '2xl',
    "headerWeight" TEXT NOT NULL DEFAULT 'bold',
    "pillBgColor" TEXT,
    "pillBgImage" TEXT,
    "pillTitleColor" TEXT,
    "pillTitleSize" TEXT NOT NULL DEFAULT 'sm',
    "pillTitleWeight" TEXT NOT NULL DEFAULT 'medium',
    CONSTRAINT "Tab_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tab" ("dashboardId", "icon", "id", "label", "order", "pillGradientFrom", "pillGradientTo", "sideImage", "sideImageAlt", "sideImageEdge", "slug") SELECT "dashboardId", "icon", "id", "label", "order", "pillGradientFrom", "pillGradientTo", "sideImage", "sideImageAlt", "sideImageEdge", "slug" FROM "Tab";
DROP TABLE "Tab";
ALTER TABLE "new_Tab" RENAME TO "Tab";
CREATE UNIQUE INDEX "Tab_slug_key" ON "Tab"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
