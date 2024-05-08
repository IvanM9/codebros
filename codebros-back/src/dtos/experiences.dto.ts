import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ExperienceDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty({ description: 'Cargo en la empresa' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Ubicación de la empresa' })
  @IsString()
  location: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'Descripción de las funciones realizadas',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Industria de la empresa', required: false })
  @IsString()
  @IsOptional()
  industry: string;
}
