import { IsBoolean, IsNumber, IsString, isString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly filename: string;

  @IsNumber()
  readonly views: number;

  @IsBoolean()
  readonly isPublished: boolean;
}
