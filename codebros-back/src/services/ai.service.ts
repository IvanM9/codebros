import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ENVIRONMENT } from 'src/constants/environment';
import { generatePromtMatching } from 'src/constants/prompts';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleGenerativeAI } = require('@google/generative-ai');
@Injectable()
export class AiService {
  genAI = new GoogleGenerativeAI(ENVIRONMENT.API_KEY_AI);
  model = this.genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
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

    try {
      const prompt = generatePromtMatching(project, consultants);
      console.log('prompt: ', prompt);
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      });
      const response = result.response;

      return response.text();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al generar el contenido');
    }

    // return { data: prompt };
  }
}
