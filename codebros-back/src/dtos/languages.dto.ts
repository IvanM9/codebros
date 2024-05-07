import { ApiProperty } from '@nestjs/swagger';
import { LevelLanguage } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class LanguageDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: LevelLanguage })
  @IsEnum(LevelLanguage)
  level: LevelLanguage;
}
