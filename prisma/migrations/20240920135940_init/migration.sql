/*
  Warnings:

  - Added the required column `progress` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
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
    "Descritpion" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("BET", "Descritpion", "ETP", "Location", "cost", "id", "name", "userId") SELECT "BET", "Descritpion", "ETP", "Location", "cost", "id", "name", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
