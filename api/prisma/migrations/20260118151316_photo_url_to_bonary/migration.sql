/*
  Warnings:

  - You are about to drop the column `photo_url` on the `pollutions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pollutions" DROP COLUMN "photo_url",
ADD COLUMN     "photo" TEXT;
