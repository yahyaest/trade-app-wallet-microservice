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
import { CreateAssetDto, UpdateAssetDto } from './dto';
import { AssetService } from './asset.service';
import {
  getUserCoinTransactions,
  getUserCryptoWalletAssetsList,
} from 'clients/crypto';
import { DataAccessGuard } from 'src/auth/guard';
import { CustomRequest } from 'src/auth/interface/request.interface';
import { CustomLogger } from 'src/myLogger';

@Controller('api/assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  private readonly logger = new CustomLogger(AssetController.name);

  @Get('')
  @UseGuards(DataAccessGuard)
  async getAssets(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.user;
      if (user.role !== 'ADMIN') {
        query.username = user.email;
      }
      return await this.assetService.getAssetsWithParams(query);
    } catch (error) {
      this.logger.error(`Failed to retrieve assets: ${error.message}`);
      throw new HttpException('No assets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getAsset(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.user;
      const asset = await this.assetService.getAsset(id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      if (user.email !== asset.username && user.role !== 'ADMIN') {
        throw new Error('Asset belong to another user');
      }
      return asset;
    } catch (error) {
      this.logger.error(`Failed to retrieve asset: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addAsset(@Body() createAssetDto: CreateAssetDto) {
    try {
      // 1 - TODO  in crypto/stock/forex MS in transaction controller add /user_assets endpoint
      let userWalletAssetsList = [];
      if (createAssetDto.type === 'CRYPTO') {
        this.logger.log(
          `get crypto Assets for user ${createAssetDto.username} with wallet ${createAssetDto.walletName}`,
        );
        const userWalletAssetsListResponse =
          await getUserCryptoWalletAssetsList(
            createAssetDto.username,
            createAssetDto.walletName,
          );
        userWalletAssetsList = userWalletAssetsListResponse.data;
        this.logger.log(
          `Crypto assets list for or user ${createAssetDto.username} with wallet ${createAssetDto.walletName} : ${userWalletAssetsList}`,
        );
      }

      if (createAssetDto.type === 'STOCK') {
      }
      if (createAssetDto.type === 'FOREX') {
      }
      // 2 - TODO for each coin get realated transactions from crypto/stock/forex MS with param username, type, wallet, name
      // Then check coin asset existance and prepare asset payload wether for post or update asset
      let userWalletAssetsResult = [];
      for (let asset of userWalletAssetsList) {
        this.logger.log(
          `Getting user ${createAssetDto.username} transactions for crypto asset ${asset.name} with wallet ${createAssetDto.walletName} `,
        );
        const userAssetTransactionsResponse = await getUserCoinTransactions(
          createAssetDto.username,
          createAssetDto.walletName,
          asset.name,
        );
        const userAssetTransactions = userAssetTransactionsResponse.data;

        const boughtAssetTransactions = userAssetTransactions.filter(
          (transaction) => transaction.action === 'BUY',
        );

        const soldAssetTransactions = userAssetTransactions.filter(
          (transaction) => transaction.action === 'SELL',
        );

        let boughtAt = 0;
        let soldAt = 0;
        let boughtAmount = 0;
        let soldAmount = 0;
        let amount = 0;

        for (let transaction of boughtAssetTransactions) {
          boughtAt = boughtAt + parseFloat(transaction.value);
          boughtAmount = boughtAmount + transaction.amount;
        }

        for (let transaction of soldAssetTransactions) {
          soldAt = soldAt + parseFloat(transaction.value);
          soldAmount = soldAmount + transaction.amount;
        }

        amount = boughtAmount - soldAmount;

        let payload: CreateAssetDto | UpdateAssetDto = createAssetDto;
        payload.name = asset.name;
        payload.symbol = asset.symbol;
        payload.boughtAt = boughtAt.toFixed(3);
        payload.soldAt = soldAt.toFixed(3);
        payload.boughtAmount = boughtAmount;
        payload.soldAmount = soldAmount;
        payload.amount = amount;

        const getAsset = await this.assetService.getSpecificAsset(
          createAssetDto.username,
          createAssetDto.walletName,
          asset.name,
        );

        if (getAsset.length === 0) {
          this.logger.log(
            `Adding new asset ${asset.name} for user ${
              createAssetDto.username
            } to wallet ${
              createAssetDto.walletName
            } with payload  ${JSON.stringify(payload)} `,
          );
          const addedAsset = await this.assetService.addAsset(payload);
          userWalletAssetsResult.push(addedAsset);
        } else {
          this.logger.log(
            `Updating asset ${asset.name} for user ${
              createAssetDto.username
            } to wallet ${
              createAssetDto.walletName
            } with payload ${JSON.stringify(payload)} `,
          );
          const updatedAsset = await this.assetService.updateAsset(
            getAsset[0].id.toString(),
            payload,
          );
          userWalletAssetsResult.push(updatedAsset);
        }
      }

      return userWalletAssetsResult;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateAsset(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.user;
      const asset = await this.assetService.getAsset(id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      if (user.email !== asset.username && user.role !== 'ADMIN') {
        throw new Error('Asset belong to another user');
      }
      return await this.assetService.updateAsset(id, updateAssetDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteAsset(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.user;
      const asset = await this.assetService.getAsset(id);
      if (!asset) {
        throw new Error('Asset not found');
      }
      if (user.email !== asset.username && user.role !== 'ADMIN') {
        throw new Error('Asset belong to another user');
      }
      await this.assetService.removeAsset(id);
      return asset;
    } catch (error) {
      this.logger.error(`Failed to retrieve asset: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
