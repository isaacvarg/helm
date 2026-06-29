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
    "theme" TEXT NOT NULL DEFAULT 'mocha',
    "showTitle" BOOLEAN NOT NULL DEFAULT true,
    "showSubtitle" BOOLEAN NOT NULL DEFAULT true,
    "titleColor" TEXT,
    "backgroundBlur" INTEGER NOT NULL DEFAULT 5,
    "tabBarPosition" TEXT NOT NULL DEFAULT 'bottom',
    "settingsShowIcon" BOOLEAN NOT NULL DEFAULT true,
    "settingsShowTitle" BOOLEAN NOT NULL DEFAULT true,
    "settingsButtonType" TEXT NOT NULL DEFAULT 'ghost',
    "settingsButtonSize" TEXT NOT NULL DEFAULT 'sm',
    "settingsBorderWidth" INTEGER NOT NULL DEFAULT 0,
    "settingsBorderStyle" TEXT NOT NULL DEFAULT 'solid',
    "settingsBorderColor" TEXT,
    "settingsBgColor" TEXT,
    "settingsBgOpacity" REAL NOT NULL DEFAULT 1,
    "settingsBgImage" TEXT,
    "shortcutShowIndicators" BOOLEAN NOT NULL DEFAULT true,
    "shortcutLinkScope" TEXT NOT NULL DEFAULT 'tab',
    "shortcutKbdSize" TEXT NOT NULL DEFAULT 'sm'
);
INSERT INTO "new_Dashboard" ("backgroundBlur", "backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "settingsBgColor", "settingsBgImage", "settingsBgOpacity", "settingsBorderColor", "settingsBorderStyle", "settingsBorderWidth", "settingsButtonSize", "settingsButtonType", "settingsShowIcon", "settingsShowTitle", "shortcutLinkScope", "shortcutShowIndicators", "showSubtitle", "showTitle", "subtitle", "tabBarPosition", "theme", "title", "titleColor", "titleGradientFrom", "titleGradientTo", "titleGradientVia") SELECT "backgroundBlur", "backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "settingsBgColor", "settingsBgImage", "settingsBgOpacity", "settingsBorderColor", "settingsBorderStyle", "settingsBorderWidth", "settingsButtonSize", "settingsButtonType", "settingsShowIcon", "settingsShowTitle", "shortcutLinkScope", "shortcutShowIndicators", "showSubtitle", "showTitle", "subtitle", "tabBarPosition", "theme", "title", "titleColor", "titleGradientFrom", "titleGradientTo", "titleGradientVia" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
