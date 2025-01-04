/*
  Warnings:

  - You are about to drop the column `unitPrice` on the `SaleProduct` table. All the data in the column will be lost.
  - Added the required column `unitDecimal` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "unitPrice",
ADD COLUMN     "unitDecimal" DECIMAL(10,2) NOT NULL;
