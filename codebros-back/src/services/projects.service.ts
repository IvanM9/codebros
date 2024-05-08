import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/projects.dto';
import { PrismaService } from 'src/prisma.service';
import { SkillsService } from './skills.service';
import { LanguagesService } from './languages.service';

@Injectable()
export class ProjectsService {
  constructor(
    private db: PrismaService,
    private skillService: SkillsService,
    private languageService: LanguagesService,
  ) {}

  async createProject(data: CreateProjectDto, userId: string) {
    const project = await this.db.project
      .create({
        data: {
          name: data.name,
          description: data.description,
          teamSize: data.teamSize,
          duration: data.duration,
          remote: data.remote,
          budget: data.budget,
          client: data.client,
          manager: { connect: { id: userId } },
        },
        select: {
          id: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Error al crear el proyecto');
      });

    const skills = data.requiredSkills.map(async (skill) => {
      await this.skillService.addSkillToProject(skill, project.id);
    });

    const languages = data.requiredLanguages.map(async (language) => {
      await this.languageService.addLanguageToProject(language, project.id);
    });

    await Promise.all([skills, languages]);

    return { message: 'Proyecto creado correctamente' };
  }

  async getProjects() {
    return {
      data: await this.db.project.findMany({
        include: {
          requiredLanguages: true,
          requiredSkills: true,
          projectConsultants: {
            select: {
              consultant: {
                select: {
                  user: {
                    select: {
                      firstName: true,
                      email: true,
                    },
                  },
                },
              },
              status: true,
            },
          },
        },
      }),
    };
  }
}
