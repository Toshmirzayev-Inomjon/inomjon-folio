-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "headlineUz" TEXT,
    "headlineEn" TEXT,
    "headlineRu" TEXT,
    "bioUz" TEXT,
    "bioEn" TEXT,
    "bioRu" TEXT,
    "heroImage" TEXT NOT NULL,
    "cvUrl" TEXT,
    "telegramUrl" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "careerStartDate" DATETIME,
    "happyClientsCount" INTEGER NOT NULL DEFAULT 20,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("bio", "cvUrl", "githubUrl", "headline", "heroImage", "id", "instagramUrl", "linkedinUrl", "name", "telegramUrl", "updatedAt") SELECT "bio", "cvUrl", "githubUrl", "headline", "heroImage", "id", "instagramUrl", "linkedinUrl", "name", "telegramUrl", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
