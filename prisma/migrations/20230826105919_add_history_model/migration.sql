-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "walletName" TEXT NOT NULL,
    "walletId" INTEGER,
    "intialValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "nonSoldAssetsValue" INTEGER NOT NULL,
    "margin" INTEGER NOT NULL,
    "marginAmount" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
