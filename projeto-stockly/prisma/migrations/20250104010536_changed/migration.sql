/*
  Warnings:

  - You are about to drop the column `unitDecimal` on the `SaleProduct` table. All the data in the column will be lost.
  - Added the required column `unitPrice` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "unitDecimal",
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;
