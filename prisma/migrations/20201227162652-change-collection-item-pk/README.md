# Migration `20201227162652-change-collection-item-pk`

This migration has been generated by reisyun at 12/28/2020, 1:27:02 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN')

CREATE TYPE "public"."Gender" AS ENUM ('SECRET', 'MALE', 'FEMALE')

CREATE TYPE "public"."Language" AS ENUM ('KOREAN', 'ENGLISH', 'JAPANESE')

CREATE TYPE "public"."HistoryCategory" AS ENUM ('PLANNING', 'CURRENT', 'COMPLETED')

CREATE TYPE "public"."MediaFormat" AS ENUM ('TVA', 'OVA', 'ONA', 'MOVIE', 'MUSIC', 'SPECIAL')

CREATE TYPE "public"."MediaStatus" AS ENUM ('RELEASING', 'FINISHED', 'UNRELEASED', 'CANCELLED')

CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
)

CREATE TABLE "profile" (
"id" SERIAL,
    "shortBio" TEXT,
    "avatar" TEXT,
    "gender" "Gender" NOT NULL DEFAULT E'SECRET',
    "language" "Language" NOT NULL DEFAULT E'ENGLISH',
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "spoiler" BOOLEAN NOT NULL DEFAULT true,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "category" "HistoryCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),
    "collectorId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "history_item" (
    "id" TEXT NOT NULL,
    "repeat" INTEGER NOT NULL DEFAULT 0,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "historyId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),
    "collectorId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "collection_like_dislike" (
"id" SERIAL,
    "isLike" BOOLEAN NOT NULL,
    "collectorId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "collection_item" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collectionId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    PRIMARY KEY ("mediaId")
)

CREATE TABLE "media" (
    "id" TEXT NOT NULL,
"no" SERIAL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "synopsis" TEXT,
    "studio" TEXT,
    "format" "MediaFormat",
    "status" "MediaStatus",
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "episodeCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "removedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
)

CREATE TABLE "media_like_dislike" (
"id" SERIAL,
    "isLike" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "genre" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "_GenreToMedia" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
)

CREATE UNIQUE INDEX "user.email_unique" ON "user"("email")

CREATE UNIQUE INDEX "profile_userId_unique" ON "profile"("userId")

CREATE UNIQUE INDEX "media.no_unique" ON "media"("no")

CREATE INDEX "media.no_title_studio_index" ON "media"("no", "title", "studio")

CREATE UNIQUE INDEX "_GenreToMedia_AB_unique" ON "_GenreToMedia"("A", "B")

CREATE INDEX "_GenreToMedia_B_index" ON "_GenreToMedia"("B")

ALTER TABLE "profile" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "review" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "review" ADD FOREIGN KEY("mediaId")REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "history" ADD FOREIGN KEY("collectorId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "history_item" ADD FOREIGN KEY("historyId")REFERENCES "history"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "history_item" ADD FOREIGN KEY("mediaId")REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "collection" ADD FOREIGN KEY("collectorId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "collection_like_dislike" ADD FOREIGN KEY("collectorId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "collection_like_dislike" ADD FOREIGN KEY("collectionId")REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "collection_item" ADD FOREIGN KEY("collectionId")REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "collection_item" ADD FOREIGN KEY("mediaId")REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "media_like_dislike" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "media_like_dislike" ADD FOREIGN KEY("mediaId")REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_GenreToMedia" ADD FOREIGN KEY("A")REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_GenreToMedia" ADD FOREIGN KEY("B")REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201226104059-add-history..20201227162652-change-collection-item-pk
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -24,10 +24,9 @@
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
   removedAt DateTime?
-  profile                Profile                 @relation(fields: [profileId], references: [id])
-  profileId              Int
+  profile                Profile?
   histories              History[]
   collections            Collection[]
   collectionLikeDisLikes CollectionLikeDisLike[]
   mediaLikeDisLikes      MediaLikeDisLike[]
@@ -54,9 +53,10 @@
   avatar   String?
   gender   Gender   @default(SECRET)
   language Language @default(ENGLISH)
-  user User?
+  user   User   @relation(fields: [userId], references: [id])
+  userId String
   @@map(name: "profile")
 }
@@ -73,9 +73,9 @@
   user    User   @relation(fields: [userId], references: [id])
   userId  String
   media   Media  @relation(fields: [mediaId], references: [id])
-  mediaId Int    @unique
+  mediaId String
   @@map(name: "review")
 }
@@ -111,9 +111,9 @@
   history   History @relation(fields: [historyId], references: [id])
   historyId String
   media     Media   @relation(fields: [mediaId], references: [id])
-  mediaId   Int
+  mediaId   String
   @@map(name: "history_item")
 }
@@ -148,16 +148,15 @@
   @@map(name: "collection_like_dislike")
 }
 model CollectionItem {
-  id        String   @id @default(uuid())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   collection   Collection @relation(fields: [collectionId], references: [id])
   collectionId String
   media        Media      @relation(fields: [mediaId], references: [id])
-  mediaId      Int
+  mediaId      String     @id
   @@map(name: "collection_item")
 }
@@ -179,9 +178,10 @@
   CANCELLED
 }
 model Media {
-  id           Int          @id @default(autoincrement())
+  id           String       @id @default(uuid())
+  no           Int          @unique @default(autoincrement())
   title        String
   image        String?
   synopsis     String?
   studio       String?
@@ -199,9 +199,9 @@
   reviews           Review[]
   historyItems      HistoryItem[]
   collectionItems   CollectionItem[]
-  @@index([title, studio])
+  @@index([no, title, studio])
   @@map(name: "media")
 }
 model MediaLikeDisLike {
@@ -210,9 +210,9 @@
   user    User   @relation(fields: [userId], references: [id])
   userId  String
   media   Media  @relation(fields: [mediaId], references: [id])
-  mediaId Int
+  mediaId String
   @@map(name: "media_like_dislike")
 }
```

