-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sectionId" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "href" TEXT NOT NULL,
    "newTab" BOOLEAN NOT NULL DEFAULT true,
    "showIcon" BOOLEAN NOT NULL DEFAULT true,
    "showTitle" BOOLEAN NOT NULL DEFAULT true,
    "showDescription" BOOLEAN NOT NULL DEFAULT true,
    "bgColor" TEXT,
    "bgOpacity" REAL NOT NULL DEFAULT 1,
    "bgImage" TEXT,
    "borderWidth" INTEGER NOT NULL DEFAULT 0,
    "borderStyle" TEXT NOT NULL DEFAULT 'solid',
    "borderColor" TEXT,
    "textAlign" TEXT NOT NULL DEFAULT 'left',
    "titleSize" TEXT NOT NULL DEFAULT 'sm',
    "titleWeight" TEXT NOT NULL DEFAULT 'medium',
    "textColor" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Link_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("bgColor", "bgImage", "bgOpacity", "description", "href", "icon", "id", "newTab", "order", "sectionId", "showDescription", "showIcon", "showTitle", "textAlign", "textColor", "title", "titleSize", "titleWeight") SELECT "bgColor", "bgImage", "bgOpacity", "description", "href", "icon", "id", "newTab", "order", "sectionId", "showDescription", "showIcon", "showTitle", "textAlign", "textColor", "title", "titleSize", "titleWeight" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
