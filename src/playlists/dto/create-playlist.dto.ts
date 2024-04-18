import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  readonly songsIds: number[];

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
