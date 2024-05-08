import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './security/security.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from './prisma.service';
import { ExperiencesService } from './services/experiences.service';
import { LanguagesService } from './services/languages.service';
import { SkillsService } from './services/skills.service';
import { ExperiencesController } from './controllers/experiences.controller';
import { SkillsController } from './controllers/skills.controller';
import { LanguagesController } from './controllers/languages.controller';

@Module({
  imports: [SecurityModule],
  controllers: [
    AppController,
    UsersController,
    ExperiencesController,
    SkillsController,
    LanguagesController,
  ],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    ExperiencesService,
    LanguagesService,
    SkillsService,
  ],
})
export class AppModule {}
