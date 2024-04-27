import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBloodTypeDto {
  @IsString()
  @IsNotEmpty()
  short_name: string;

  @IsString()
  @IsNotEmpty()
  long_name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}