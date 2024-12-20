import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/auth/prisma/prisma.module';
import { PvsService } from './pvs.service';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PvsService],
})
export class ProjectsModule {}
