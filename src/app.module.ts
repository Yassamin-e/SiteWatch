import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './auth/prisma/prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { NodeMailerModule } from './node-mailer/node-mailer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [config],
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads', 'images'),
      serveRoot: '/images',
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
