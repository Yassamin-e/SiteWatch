import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { NodeMailerModule } from 'src/node-mailer/node-mailer.module';

@Module({
  imports: [UsersModule, PrismaModule, NodeMailerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
