import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  breed?: string;
}
