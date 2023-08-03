import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async getAssets() {
    return await this.prisma.asset.findMany();
  }

  async getAssetsWithParams(query: Object) {
    return await this.prisma.asset.findMany({ where: query });
  }

  async getAsset(id: string) {
    return await this.prisma.asset.findUnique({ where: { id: +id } });
  }

  async getSpecificAsset(username: string, walletName: string, name: string) {
    return await this.prisma.asset.findMany({
      where: { username, walletName, name },
    });
  }

  async addAsset(body: CreateAssetDto) {
    return await this.prisma.asset.create({ data: body });
  }

  async updateAsset(id: string, body: UpdateAssetDto) {
    return await this.prisma.asset.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeAsset(id: string) {
    return await this.prisma.asset.delete({ where: { id: +id } });
  }
}
