/*
  Warnings:

  - Added the required column `title` to the `Rapport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rapport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Rapport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Rapport" ("date", "id", "projectId", "text") SELECT "date", "id", "projectId", "text" FROM "Rapport";
DROP TABLE "Rapport";
ALTER TABLE "new_Rapport" RENAME TO "Rapport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
