import { IsEmail, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  intialValue: string;

  @IsString()
  currentValue: string;

  @IsString()
  type: 'CRYPTO' | 'STOCK' | 'FOREX';
}
