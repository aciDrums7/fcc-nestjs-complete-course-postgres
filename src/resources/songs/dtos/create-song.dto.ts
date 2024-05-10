import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  releaseDate!: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  duration!: string;

  @IsOptional()
  @IsString()
  lyrics?: string;
}
