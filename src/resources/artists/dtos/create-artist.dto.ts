import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  //   @IsArray()
  //   @IsInt({ each: true })
  //   @IsPositive({ each: true })
  //   songs?: number[];
}
