import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LanguageDto } from 'src/dtos/languages.dto';
import { CurrentUser } from 'src/security/jwt-strategy/auth.decorator';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { LanguagesService } from 'src/services/languages.service';

@Controller('languages')
@ApiTags('languages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role(RoleEnum.CONSULTANT)
export class LanguagesController {
  constructor(private service: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar idioma' })
  async addLanguage(
    @Body() data: LanguageDto,
    @CurrentUser() { id }: InfoUserInterface,
  ) {
    return this.service.add(data, id);
  }
}
