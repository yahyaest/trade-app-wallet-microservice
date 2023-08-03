-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('CRYPTO', 'STOCK', 'FOREX');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CRYPTO', 'STOCK', 'FOREX');

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "intilValue" TEXT NOT NULL,
    "currentValue" TEXT NOT NULL,
    "type" "WalletType" NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "wallet_name" TEXT NOT NULL,
    "walletId" INTEGER,
    "type" "AssetType" NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "amount" INTEGER NOT NULL,
    "boughtAt" TEXT NOT NULL,
    "soldAt" TEXT NOT NULL,
    "boughtAmount" INTEGER NOT NULL,
    "soldAmount" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_name_username_key" ON "Wallet"("name", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_username_wallet_name_name_key" ON "Asset"("username", "wallet_name", "name");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
