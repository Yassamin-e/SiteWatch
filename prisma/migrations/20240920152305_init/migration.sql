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
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("BET", "Description", "ETP", "Location", "cost", "id", "name", "progress", "userId") SELECT "BET", "Description", "ETP", "Location", "cost", "id", "name", "progress", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'GENERAL_DIRECTOR',
    "otp" TEXT NOT NULL DEFAULT 'none',
    "otpExpireDate" DATETIME,
    "picture" TEXT NOT NULL DEFAULT 'none'
);
INSERT INTO "new_User" ("email", "firstname", "id", "lastname", "password", "picture", "userType") SELECT "email", "firstname", "id", "lastname", "password", "picture", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
