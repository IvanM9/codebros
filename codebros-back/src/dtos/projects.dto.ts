import { ApiProperty } from '@nestjs/swagger';
import { LanguageDto } from './languages.dto';
import { SkillDto } from './skills.dto';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [SkillDto], required: false })
  @IsArray()
  @IsOptional()
  requiredSkills: SkillDto[];

  @ApiProperty({ type: [LanguageDto], required: false })
  @IsArray()
  @IsOptional()
  requiredLanguages: LanguageDto[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  teamSize?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty()
  @IsBoolean()
  remote: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  budget?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  client?: string;
}
