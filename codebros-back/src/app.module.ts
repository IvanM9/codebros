import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
