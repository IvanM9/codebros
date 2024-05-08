import { BadRequestException, Injectable } from '@nestjs/common';
import { ExperienceDto } from 'src/dtos/experiences.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private db: PrismaService) {}

  async addExperience(experience: ExperienceDto, consultantId: string) {
    await this.db.experience
      .create({
        data: {
          consultantId: consultantId,
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

    return { message: 'Se ha registrado la experiencia correctamente' };
  }

  async add(experience: ExperienceDto, userId: string) {
    const consultant = await this.db.consultant.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    return await this.addExperience(experience, consultant.id);
  }
}
