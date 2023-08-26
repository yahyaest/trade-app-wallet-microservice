import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/myLogger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHistoryDto } from './dto';

@Injectable()
export class HistoryService {
 constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new CustomLogger(HistoryService.name);

  async getHistories() {
   return await this.prisma.history.findMany();
 }

 async getHistoriesWithParams(query: any) {
  return await this.prisma.history.findMany({ where: query });
}

async addHistory(body: CreateHistoryDto) {
 return await this.prisma.history.create({ data: body });
}
}
