-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "BET" TEXT NOT NULL,
    "ETP" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "Location" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "start" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("BET", "Description", "ETP", "Location", "cost", "end", "id", "name", "progress", "start", "userId") SELECT "BET", "Description", "ETP", "Location", "cost", "end", "id", "name", "progress", "start", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
