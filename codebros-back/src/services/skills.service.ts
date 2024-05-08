import { BadRequestException, Injectable } from '@nestjs/common';
import { SkillDto } from 'src/dtos/skills.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private db: PrismaService) {}

  async addSkill(skill: SkillDto, consultantId: string) {
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
                id: consultantId,
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
                id: consultantId,
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

    return { message: 'Se ha registrado la habilidad correctamente' };
  }

  async add(skill: SkillDto, userId: string) {
    const consultant = await this.db.consultant.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.addSkill(skill, consultant.id);
  }
}
