/*
  Warnings:

  - You are about to drop the column `wallet_name` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,walletName,name]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletName` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Asset_username_wallet_name_name_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "wallet_name",
ADD COLUMN     "walletName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_username_walletName_name_key" ON "Asset"("username", "walletName", "name");
