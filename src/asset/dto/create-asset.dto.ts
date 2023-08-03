import { IsEmail, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  walletName: string;

  @IsInt()
  walletId: number;

  @IsString()
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
