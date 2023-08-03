import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './dto';
import { DataAccessGuard } from 'src/auth/guard';
import { CustomRequest } from 'src/auth/interface/request.interface';
import { CustomLogger } from 'src/myLogger';

@Controller('api/wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  private readonly logger = new CustomLogger(WalletController.name);

  @Get('')
  @UseGuards(DataAccessGuard)
  async getWallets(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.user;
      if (user.role !== 'ADMIN') {
        query.username = user.email;
      }
      return await this.walletService.getWalletsWithParams(query);
    } catch (error) {
      this.logger.error(`Failed to retrieve wallets: ${error.message}`);
      throw new HttpException('No wallets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getWallet(@Param('id') id: string) {
    try {
      const wallet = await this.walletService.getWallet(id);
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      return wallet;
    } catch (error) {
      this.logger.error(`Failed to retrieve wallet: ${error.message}`);
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addWallet(@Body() createWalletDto: CreateWalletDto) {
    try {
      return await this.walletService.addWallet(createWalletDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  async updateWallet(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    try {
      return await this.walletService.updateWallet(id, updateWalletDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  async deleteWallet(@Param('id') id: string) {
    try {
      const wallet = await this.walletService.removeWallet(id);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      return wallet;
    } catch (error) {
      this.logger.error(`Failed to retrieve wallet: ${error.message}`);
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
  }
}
