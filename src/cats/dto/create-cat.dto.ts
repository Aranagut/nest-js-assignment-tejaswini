import { IsInt, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsInt()
  @IsOptional()
  readonly age?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly breed?: string;
}
