import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { AiService } from 'src/services/ai.service';

@Controller('ai')
@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role(RoleEnum.MANAGER)
export class AiController {
  constructor(private service: AiService) {}

  @Get('matching/:projectId')
  @ApiOperation({
    summary:
      'Generar emparejamiento de consultores con el proyecto seleccionado',
  })
  async matching(@Param('projectId') projectId: string) {
    return this.service.matching(projectId);
  }
}
