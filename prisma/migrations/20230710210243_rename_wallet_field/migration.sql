/*
  Warnings:

  - You are about to drop the column `intilValue` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `intialValue` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "intilValue",
ADD COLUMN     "intialValue" TEXT NOT NULL;
