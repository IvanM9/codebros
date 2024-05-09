import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENVIRONMENT } from 'src/constants/environment';
import { generatePromtMatching } from 'src/constants/prompts';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

@Injectable()
export class AiService {
  genAI = new GoogleGenerativeAI(ENVIRONMENT.API_KEY_AI);
  model = this.genAI.getGenerativeModel({
    model: 'gemini-pro',
  });

  constructor(
    private db: PrismaService,
    private userService: UsersService,
  ) {}

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

    const consultants = (await this.userService.getConsultants(false)).data;

    const prompt = generatePromtMatching(project, consultants);
    // const result = await this.model.generateContent(prompt);
    // const response = result.response;
    // return response.text();

    return { data: prompt };
  }
}
