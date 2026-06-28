-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tabId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "showIcon" BOOLEAN NOT NULL DEFAULT true,
    "showTitle" BOOLEAN NOT NULL DEFAULT true,
    "iconSize" TEXT NOT NULL DEFAULT 'sm',
    "titleSize" TEXT NOT NULL DEFAULT 'xs',
    "titleWeight" TEXT NOT NULL DEFAULT 'semibold',
    "titleColor" TEXT,
    "borderWidth" INTEGER NOT NULL DEFAULT 0,
    "borderStyle" TEXT NOT NULL DEFAULT 'solid',
    "borderColor" TEXT,
    "bgColor" TEXT,
    "bgOpacity" REAL NOT NULL DEFAULT 1,
    "bgImage" TEXT,
    CONSTRAINT "Section_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "Tab" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Section" ("icon", "id", "order", "tabId", "title") SELECT "icon", "id", "order", "tabId", "title" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
