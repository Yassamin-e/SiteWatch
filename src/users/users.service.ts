import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: RegisterDto) {
    return this.prismaService.user.create({
      data: { ...data },
    });
  }
  
  async findById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  
  async findByIdSafe(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        picture: true,
        userType: true,
        projects: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        picture: true,
        password:true,
        userType: true,
        generalDirectorID:true,
      },
    });
  }

  async findOne(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist = await this.findById(id);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        picture: true,
        password:true,
        generalDirectorID:true,

        userType: true,
      },
    });
  }

  async remove(id: number) {
    const userExist = await this.findById(id);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
