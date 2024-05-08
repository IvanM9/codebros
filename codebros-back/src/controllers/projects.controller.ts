import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from 'src/dtos/projects.dto';
import { CurrentUser } from 'src/security/jwt-strategy/auth.decorator';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { ProjectsService } from 'src/services/projects.service';

@Controller('projects')
@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Role(RoleEnum.MANAGER)
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  async createProject(
    @Body() data: CreateProjectDto,
    @CurrentUser() { id }: InfoUserInterface,
  ) {
    return this.service.createProject(data, id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  async getProjects() {
    return this.service.getProjects();
  }
}
