import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  RegisterInformationConsultant,
} from 'src/dtos/users.dto';
import { CurrentUser } from 'src/security/jwt-strategy/auth.decorator';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { JwtAuthGuard } from 'src/security/jwt-strategy/jwt-auth.guard';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';
import { Role } from 'src/security/jwt-strategy/roles.decorator';
import { RoleGuard } from 'src/security/jwt-strategy/roles.guard';
import { UsersService } from 'src/services/users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create-consultant')
  @ApiOperation({ summary: 'Registrar un consultor' })
  async createConsultant(@Body() data: CreateUserDto) {
    return this.service.createConsultant(data);
  }

  @Post('register-information')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.CONSULTANT)
  @ApiOperation({ summary: 'Registrar información de consultor' })
  async registerInformation(
    @Body() data: RegisterInformationConsultant,
    @CurrentUser() { id }: InfoUserInterface,
  ) {
    return this.service.registerInformation(data, id);
  }

  @Get('consultants')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MANAGER)
  @ApiQuery({ name: 'isBusy', required: false })
  @ApiOperation({ summary: 'Obtener consultores' })
  async getConsultants(@Query('isBusy') isBusy: boolean) {
    return this.service.getConsultants(isBusy);
  }

  @Get('consultant')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MANAGER, RoleEnum.CONSULTANT)
  @ApiQuery({
    name: 'id',
    required: false,
    description:
      'Si el usuario es administrador, debe enviar el id del consultor',
  })
  @ApiOperation({
    summary: 'Obtener consultor por id o por consultor loggeado',
  })
  async getConsultantById(
    @CurrentUser() currentUser: InfoUserInterface,
    @Query('id') id?: string,
  ) {
    if (!id && currentUser.role !== RoleEnum.CONSULTANT) {
      throw new BadRequestException('El id es requerido');
    }

    return this.service.getConsultant(
      currentUser.role === RoleEnum.CONSULTANT ? currentUser.id : id,
    );
  }
}
