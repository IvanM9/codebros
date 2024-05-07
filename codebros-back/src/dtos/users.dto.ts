import { ApiProperty } from '@nestjs/swagger';
import { EmploymentStatus } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';
import { SkillDto } from './skills.dto';
import { LanguageDto } from './languages.dto';
import { ExperienceDto } from './experiences.dto';
import { CertificationDto } from './certifications.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'La contraseña debe tener al menos 6 caracteres, 1 letra minúscula, 1 letra mayúscula y 1 número',
    },
  )
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10)
  phone: string;
}

export class RegisterInformationConsultant {
  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Zona horaria', example: 'America/Mexico_City' })
  @IsString()
  timeZone: string;

  @ApiProperty({ enum: EmploymentStatus })
  @IsEnum(EmploymentStatus)
  employmentStatus: EmploymentStatus;

  @ApiProperty({ description: 'Horas disponibles' })
  @IsNumber()
  availableHours: number;

  @ApiProperty({ description: 'Disponibilidad para viajar' })
  @IsBoolean()
  willingToTravel: boolean;

  @ApiProperty({ description: 'Disponibilidad para trabajar remotamente' })
  @IsBoolean()
  provisionForRemoteWork: boolean;

  @ApiProperty({ description: 'Tarifa por hora' })
  @IsDecimal({ decimal_digits: '2' })
  feeFees: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  portfolio: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  linkedIn: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  github: string;

  @ApiProperty({ required: false, type: [SkillDto] })
  @IsArray()
  @IsOptional()
  skills: SkillDto[];

  @ApiProperty({ required: false, type: [LanguageDto] })
  @IsArray()
  @IsOptional()
  languages: LanguageDto[];

  @ApiProperty({ required: false, type: [ExperienceDto] })
  @IsArray()
  @IsOptional()
  experiences: ExperienceDto[];

  @ApiProperty({ required: false, type: [CertificationDto] })
  @IsArray()
  @IsOptional()
  certifications: CertificationDto[];
}
