import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ENVIRONMENT } from 'src/constants/environment';
import { generatePromtMatching } from 'src/constants/prompts';
import { PrismaService } from 'src/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { GoogleGenerativeAI } = require('@google/generative-ai');
@Injectable()
export class AiService {
  genAI = new GoogleGenerativeAI(ENVIRONMENT.API_KEY_AI);
  model = this.genAI.getGenerativeModel({
    // model: 'gemini-1.5-pro-latest',
    model: 'gemini-pro',
  });

  constructor(private db: PrismaService) {}

  async matching(projectId: string) {
    const project = await this.db.project
      .findUniqueOrThrow({
        where: {
          id: projectId,
        },
        select: {
          name: true,
          budget: true,
          client: true,
          description: true,
          duration: true,
          remote: true,
          teamSize: true,
          requiredLanguages: {
            select: {
              name: true,
              level: true,
            },
          },
          requiredLevel: true,
          requiredSkills: {
            select: {
              name: true,
              type: true,
            },
          },
          startDate: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('Error al obtener el proyecto');
      });

    const consultants = await this.db.consultant
      .findMany({
        select: {
          id: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          skills: {
            select: {
              name: true,
              type: true,
            },
          },
          languages: {
            select: {
              name: true,
              level: true,
            },
          },
          experiences: {
            select: {
              title: true,
              company: true,
              startDate: true,
              endDate: true,
              industry: true,
              position: true,
              description: true,
            },
          },
          certifications: {
            select: {
              name: true,
              authority: true,
            },
          },
          feeFees: true,
          location: true,
          availableHours: true,
          employmentStatus: true,
          willingToTravel: true,
          provisionForRemoteWork: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('Error al obtener los consultores');
      });

    try {
      const prompt = generatePromtMatching(project, consultants);
      console.log('prompt: ', prompt);
      const response = (await this.model.generateContent(prompt)).response;

      const result = JSON.parse(response.text());

      await this.db.$transaction(async (db) => {
        const matched = result.map(async (consultant) => {
          await db.projectConsultant
            .create({
              data: {
                consultantId: consultant.id,
                projectId: projectId,
              },
            })
            .catch(() => {});
        });

        await Promise.all(matched);
      });

      return { data: result };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al generar el contenido');
    }

    // return { data: prompt };
  }
}
