import { BadRequestException, Injectable } from '@nestjs/common';
import { LanguageDto } from 'src/dtos/languages.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LanguagesService {
  constructor(private db: PrismaService) {}

  async addLanguage(language: LanguageDto, consultantId: string) {
    const existLanguage = await this.db.language.findUnique({
      where: {
        name: language.name,
      },
    });

    if (existLanguage) {
      await this.db.language
        .update({
          where: {
            name: language.name,
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
          throw new BadRequestException('Error al registrar idiomas');
        });
    } else {
      await this.db.language
        .create({
          data: {
            consultants: {
              connect: {
                id: consultantId,
              },
            },
            name: language.name,
            level: language.level,
          },
        })
        .catch(() => {
          throw new BadRequestException('Error al registrar idiomas');
        });

      return { message: 'Se ha registrado el idioma correctamente' };
    }
  }

  async add(language: LanguageDto, userId: string) {
    const consultant = await this.db.consultant.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.addLanguage(language, consultant.id);
  }

  async addLanguageToProject(language: LanguageDto, projectId: string) {
    const existLanguage = await this.db.language.findUnique({
      where: {
        name: language.name,
      },
    });

    if (existLanguage) {
      await this.db.language
        .update({
          where: {
            name: language.name,
          },
          data: {
            projects: {
              connect: {
                id: projectId,
              },
            },
          },
        })
        .catch(() => {
          throw new BadRequestException('Error al registrar idiomas');
        });
    } else {
      await this.db.language
        .create({
          data: {
            projects: {
              connect: {
                id: projectId,
              },
            },
            name: language.name,
            level: language.level,
          },
        })
        .catch(() => {
          throw new BadRequestException('Error al registrar idiomas');
        });

      return { message: 'Se ha registrado el idioma correctamente' };
    }
  }
}
