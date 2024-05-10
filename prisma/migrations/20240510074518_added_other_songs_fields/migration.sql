/*
  Warnings:

  - Added the required column `duration` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "lyrics" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;
