import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto';
import { CustomLogger } from 'src/myLogger';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new CustomLogger(AssetService.name);

  async getAssets() {
    return await this.prisma.asset.findMany();
  }

  async getAssetsWithParams(query: any) {
    // handle query data by days
    if (query.days) {
      const now = new Date();
      now.setDate(now.getDate() - query.days);
      query.createdAt = {
        gte: now.toISOString(), // Greater than or equal to query.days  ago
        lte: new Date().toISOString(), // Less than or equal to today
      };
      delete query.days;
    }
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
