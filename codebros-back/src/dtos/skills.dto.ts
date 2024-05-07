import { ApiProperty } from '@nestjs/swagger';
import { TypeSkill } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class SkillDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: TypeSkill })
  @IsEnum(TypeSkill)
  type: TypeSkill;
}
