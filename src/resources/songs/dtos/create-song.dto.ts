import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  releaseDate!: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  duration!: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  artistId?: number;
}
