/*
  Warnings:

  - You are about to drop the column `iamges` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "iamges",
ADD COLUMN     "images" TEXT[];
