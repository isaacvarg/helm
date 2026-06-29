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
    "shortcutLinkScope" TEXT NOT NULL DEFAULT 'tab'
);
INSERT INTO "new_Dashboard" ("backgroundBlur", "backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "settingsBgColor", "settingsBgImage", "settingsBgOpacity", "settingsBorderColor", "settingsBorderStyle", "settingsBorderWidth", "settingsButtonSize", "settingsButtonType", "settingsShowIcon", "settingsShowTitle", "showSubtitle", "showTitle", "subtitle", "tabBarPosition", "theme", "title", "titleColor", "titleGradientFrom", "titleGradientTo", "titleGradientVia") SELECT "backgroundBlur", "backgroundImage", "bgOverlayFrom", "bgOverlayOpacity", "bgOverlayTo", "bgOverlayVia", "id", "settingsBgColor", "settingsBgImage", "settingsBgOpacity", "settingsBorderColor", "settingsBorderStyle", "settingsBorderWidth", "settingsButtonSize", "settingsButtonType", "settingsShowIcon", "settingsShowTitle", "showSubtitle", "showTitle", "subtitle", "tabBarPosition", "theme", "title", "titleColor", "titleGradientFrom", "titleGradientTo", "titleGradientVia" FROM "Dashboard";
DROP TABLE "Dashboard";
ALTER TABLE "new_Dashboard" RENAME TO "Dashboard";
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
    "shortcutKey" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    CONSTRAINT "Link_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("bgColor", "bgImage", "bgOpacity", "borderColor", "borderStyle", "borderWidth", "description", "href", "icon", "id", "newTab", "order", "sectionId", "showDescription", "showIcon", "showTitle", "textAlign", "textColor", "title", "titleSize", "titleWeight") SELECT "bgColor", "bgImage", "bgOpacity", "borderColor", "borderStyle", "borderWidth", "description", "href", "icon", "id", "newTab", "order", "sectionId", "showDescription", "showIcon", "showTitle", "textAlign", "textColor", "title", "titleSize", "titleWeight" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
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
    "pillBgOpacity" REAL NOT NULL DEFAULT 1,
    "pillBgImage" TEXT,
    "pillShowIcon" BOOLEAN NOT NULL DEFAULT true,
    "pillShowTitle" BOOLEAN NOT NULL DEFAULT true,
    "pillTitleColor" TEXT,
    "pillTitleSize" TEXT NOT NULL DEFAULT 'sm',
    "pillTitleWeight" TEXT NOT NULL DEFAULT 'medium',
    "shortcutKey" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Tab_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tab" ("bgColor", "bgImage", "bgOpacity", "borderColor", "borderStyle", "borderWidth", "dashboardId", "headerColor", "headerHAlign", "headerSize", "headerTitle", "headerVAlign", "headerWeight", "icon", "id", "label", "linkColumns", "order", "pillBgColor", "pillBgImage", "pillBgOpacity", "pillGradientFrom", "pillGradientTo", "pillShowIcon", "pillShowTitle", "pillTitleColor", "pillTitleSize", "pillTitleWeight", "sectionColumns", "showSideImage", "sideImage", "sideImageAlt", "sideImageEdge", "slug") SELECT "bgColor", "bgImage", "bgOpacity", "borderColor", "borderStyle", "borderWidth", "dashboardId", "headerColor", "headerHAlign", "headerSize", "headerTitle", "headerVAlign", "headerWeight", "icon", "id", "label", "linkColumns", "order", "pillBgColor", "pillBgImage", "pillBgOpacity", "pillGradientFrom", "pillGradientTo", "pillShowIcon", "pillShowTitle", "pillTitleColor", "pillTitleSize", "pillTitleWeight", "sectionColumns", "showSideImage", "sideImage", "sideImageAlt", "sideImageEdge", "slug" FROM "Tab";
DROP TABLE "Tab";
ALTER TABLE "new_Tab" RENAME TO "Tab";
CREATE UNIQUE INDEX "Tab_slug_key" ON "Tab"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
