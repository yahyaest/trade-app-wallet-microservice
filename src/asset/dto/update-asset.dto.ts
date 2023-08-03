import { IsInt, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateAssetDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  walletName: string;

  @IsInt()
  @IsOptional()
  walletId: number;

  @IsString()
  @IsOptional()
  type: 'CRYPTO' | 'STOCK' | 'FOREX';

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  symbol: string;

  @IsInt()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  boughtAt: string;

  @IsString()
  @IsOptional()
  soldAt: string;

  @IsInt()
  @IsOptional()
  boughtAmount: number;

  @IsInt()
  @IsOptional()
  soldAmount: number;
}
