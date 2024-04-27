import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBloodTypeDto {
  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  longName: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}