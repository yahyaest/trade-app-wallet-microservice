import { IsInt, IsJSON, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  username?: string;

  @IsInt()
  @IsOptional()
  intialValue?: string;

  @IsString()
  @IsOptional()
  currentValue?: string;

  @IsString()
  @IsOptional()
  type?: 'CRYPTO' | 'STOCK' | 'FOREX';
}
