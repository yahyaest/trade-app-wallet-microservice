import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWalletDto, UpdateWalletDto } from './dto';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getWallets() {
    return await this.prisma.wallet.findMany();
  }

  async getWalletsWithParams(query: Object) {
    return await this.prisma.wallet.findMany({ where: query });
  }

  async getWallet(id: string) {
    return await this.prisma.wallet.findUnique({ where: { id: +id } });
  }

  async addWallet(body: CreateWalletDto) {
    return await this.prisma.wallet.create({ data: body });
  }

  async updateWallet(id: string, body: UpdateWalletDto) {
    return await this.prisma.wallet.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeWallet(id: string) {
    // remove wallet assets
    const walletAssets = await this.prisma.asset.findMany({where : {walletId : +id}})
    for (let wallet of walletAssets){
      await this.prisma.asset.delete({where:{id : wallet.id}})
    }
    // remove wallet
    return await this.prisma.wallet.delete({ where: { id: +id } });
  }
}
