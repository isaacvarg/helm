-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dashboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "titleGradientFrom" TEXT NOT NULL,
    "titleGradientVia" TEXT,
    "titleGradientTo" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "bgOverlayFrom" TEXT NOT NULL,
    "bgOverlayVia" TEXT,
    "bgOverlayTo" TEXT NOT NULL,
    "bgOverlayOpacity" REAL NOT NULL DEFAULT 1,
    "theme" TEXT NOT NULL DEFAULT 'mocha'
);
INSERT INTO "new_Dashboard" ("backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "subtitle", "title", "titleGradientFrom", "titleGradientTo", "titleGradientVia") SELECT "backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "subtitle", "title", "titleGradientFrom", "titleGradientTo", "titleGradientVia" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
