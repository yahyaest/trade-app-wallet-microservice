import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CustomLogger } from 'src/myLogger';
import { DataAccessGuard } from 'src/auth/guard';
import { CustomRequest } from 'src/auth/interface/request.interface';
import { CreateHistoryDto } from './dto';

@Controller('api/histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  private readonly logger = new CustomLogger(HistoryController.name);

  @Get('')
  @UseGuards(DataAccessGuard)
  async getHistories(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.user;
      if (user.role !== 'ADMIN') {
        query.username = user.email;
      }
      return await this.historyService.getHistoriesWithParams(query);
    } catch (error) {
      this.logger.error(`Failed to retrieve histories: ${error.message}`);
      throw new HttpException('No histories found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addHistory(@Body() createHistoryDto: CreateHistoryDto) {
    try {
      return await this.historyService.addHistory(createHistoryDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
