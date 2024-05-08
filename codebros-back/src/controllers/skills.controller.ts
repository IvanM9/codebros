import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillDto } from 'src/dtos/skills.dto';
import { CurrentUser } from 'src/security/jwt-strategy/auth.decorator';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { SkillsService } from 'src/services/skills.service';

@Controller('skills')
@ApiTags('skills')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role(RoleEnum.CONSULTANT)
export class SkillsController {
  constructor(private service: SkillsService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar habilidad' })
  async addSkill(
    @Body() data: SkillDto,
    @CurrentUser() { id }: InfoUserInterface,
  ) {
    return this.service.add(data, id);
  }
}
