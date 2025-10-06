/*
  Warnings:

  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "storeId",
ADD COLUMN     "spec" JSONB;

-- DropTable
DROP TABLE "Translation";
