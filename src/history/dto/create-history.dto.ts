import { IsEmail, IsInt, IsString, IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  walletName: string;

  @IsInt()
  walletId: number;

  @IsNumber()
  intialValue: number;

  @IsNumber()
  currentValue: number;

  @IsNumber()
  nonSoldAssetsValue: number;

  @IsNumber()
  margin: number;

  @IsNumber()
  marginAmount: number;
}
