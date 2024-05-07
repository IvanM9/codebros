import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';
import {
  CreateUserDto,
  RegisterInformationConsultant,
} from 'src/dtos/users.dto';
import { PrismaService } from 'src/prisma.service';
import { RoleEnum } from 'src/security/jwt-strategy/role.enum';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async createConsultant(data: CreateUserDto) {
    this.db.user
      .create({
        data: {
          email: data.email,
          password: hashSync(data.password, 10),
          role: RoleEnum.CONSULTANT,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      })
      .catch(() => {
        throw new BadRequestException('Usuario ya registrado');
      });

    return { message: 'Se ha registrado correctamente' };
  }

  async registerInformation(
    data: RegisterInformationConsultant,
    userId: string,
  ) {
    this.db.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Usuario no encontrado');
      });

    const consultant = await this.db.consultant
      .create({
        data: {
          userId,
          location: data.location,
          timeZone: data.timeZone,
          employmentStatus: data.employmentStatus,
          availableHours: data.availableHours,
          willingToTravel: data.willingToTravel,
          provisionForRemoteWork: data.provisionForRemoteWork,
          feeFees: data.feeFees,
          portfolio: data.portfolio,
          linkedIn: data.linkedIn,
          github: data.github,
        },
        select: {
          id: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Información ya registrada');
      });

    const certifications = data.certifications.forEach(
      async (certification) => {
        await this.db.certification
          .create({
            data: {
              consultantId: consultant.id,
              name: certification.name,
              authority: certification.authority,
              license: certification.license,
              startDate: certification.startDate,
              endDate: certification.endDate,
              url: certification.url,
            },
          })
          .catch(() => {
            throw new BadRequestException('Error al registrar certificaciones');
          });
      },
    );

    const experiences = data.experiences.forEach(async (experience) => {
      await this.db.experience
        .create({
          data: {
            consultantId: consultant.id,
            title: experience.title,
            company: experience.company,
            position: experience.position,
            location: experience.location,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
            industry: experience.industry,
          },
        })
        .catch(() => {
          throw new BadRequestException('Error al registrar experiencias');
        });
    });

    const languages = data.languages.forEach(async (language) => {
      await this.db.language
        .create({
          data: {
            consultants: {
              connect: {
                id: consultant.id,
              },
            },
            name: language.name,
            level: language.level,
          },
        })
        .catch(() => {
          throw new BadRequestException('Error al registrar idiomas');
        });
    });

    const skills = data.skills.forEach(async (skill) => {
      const skillAux = await this.db.skill.findUnique({
        where: {
          name: skill.name,
        },
      });

      if (skillAux) {
        await this.db.skill
          .update({
            where: {
              name: skill.name,
            },
            data: {
              consultants: {
                connect: {
                  id: consultant.id,
                },
              },
            },
          })
          .catch(() => {
            throw new BadRequestException('Error al registrar habilidades');
          });
      } else {
        await this.db.skill
          .create({
            data: {
              consultants: {
                connect: {
                  id: consultant.id,
                },
              },
              name: skill.name,
              type: skill.type,
            },
          })
          .catch(() => {
            throw new BadRequestException('Error al registrar habilidades');
          });
      }
    });

    await Promise.all([certifications, experiences, languages, skills]);

    return { message: 'Se ha completado la información correctamente' };
  }

  async getConsultant(userId: string) {
    const consultant = await this.db.consultant.findUnique({
      where: {
        userId: userId,
      },
      select: {
        location: true,
        timeZone: true,
        employmentStatus: true,
        availableHours: true,
        willingToTravel: true,
        provisionForRemoteWork: true,
        feeFees: true,
        portfolio: true,
        linkedIn: true,
        github: true,
        isBusy: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        certifications: {
          select: {
            id: true,
            name: true,
            authority: true,
            startDate: true,
            endDate: true,
            license: true,
            url: true,
          },
        },
        experiences: {
          select: {
            company: true,
            position: true,
            description: true,
            endDate: true,
            industry: true,
            location: true,
            startDate: true,
            title: true,
          },
        },
        languages: {
          select: {
            id: true,
            level: true,
            name: true,
          },
        },
        skills: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    if (!consultant) {
      throw new NotFoundException('Consultor no encontrado');
    }

    return { data: consultant };
  }

  async getConsultants(isBusy?: boolean) {
    const consultants = await this.db.consultant.findMany({
      where: {
        isBusy: isBusy,
      },
      select: {
        location: true,
        timeZone: true,
        employmentStatus: true,
        availableHours: true,
        willingToTravel: true,
        provisionForRemoteWork: true,
        feeFees: true,
        portfolio: true,
        linkedIn: true,
        github: true,
        isBusy: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        certifications: {
          select: {
            id: true,
            name: true,
            authority: true,
            startDate: true,
            endDate: true,
            license: true,
            url: true,
          },
        },
        experiences: {
          select: {
            company: true,
            position: true,
            description: true,
            endDate: true,
            industry: true,
            location: true,
            startDate: true,
            title: true,
          },
        },
        languages: {
          select: {
            id: true,
            level: true,
            name: true,
          },
        },
        skills: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    return { data: consultants };
  }
}
