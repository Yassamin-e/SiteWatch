-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'GENERAL_DIRECTOR',
    "otp" TEXT,
    "otpExpireDate" DATETIME,
    "picture" TEXT NOT NULL DEFAULT 'none'
);
INSERT INTO "new_User" ("email", "firstname", "id", "lastname", "otp", "otpExpireDate", "password", "picture", "userType") SELECT "email", "firstname", "id", "lastname", "otp", "otpExpireDate", "password", "picture", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
