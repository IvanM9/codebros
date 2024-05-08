import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExperienceDto } from 'src/dtos/experiences.dto';
import { CurrentUser } from 'src/security/jwt-strategy/auth.decorator';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { ExperiencesService } from 'src/services/experiences.service';

@Controller('experiences')
@ApiTags('experiences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role(RoleEnum.CONSULTANT)
export class ExperiencesController {
  constructor(private service: ExperiencesService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar experiencia' })
  async addExperience(
    @Body() data: ExperienceDto,
    @CurrentUser() { id }: InfoUserInterface,
  ) {
    return this.service.add(data, id);
  }
}
