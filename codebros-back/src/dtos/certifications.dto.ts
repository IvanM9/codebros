import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CertificationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Institución que otorga la certificación' })
  @IsString()
  authority: string;

  @ApiProperty({ description: 'Número de licencia' })
  @IsString()
  license: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  url: string;
}
