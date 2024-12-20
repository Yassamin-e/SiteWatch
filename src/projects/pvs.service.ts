import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from 'src/constants';
import { CreatePvDto } from './dto/create-pv.dto';
import { UpdatePvDto } from './dto/update-pv.dto';

@Injectable()
export class PvsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(projectid: number, createPvDto: CreatePvDto) {
    const { images, ...restDtoData } = createPvDto;
    const createdPv = await this.prismaService.rapport.create({
      data: { ...restDtoData, projectId: projectid },
    });

    images.map(async (image) => {
      await this.prismaService.image.create({
        data: {
          rapportId: createdPv.id,
          url: image,
        },
      });
    });

    return createdPv;
  }
  async findById(projectid: number, pvid: number) {
    return await this.prismaService.rapport.findFirst({
      where: {
        id: pvid,
        projectId: projectid,
      },
      select: {
        id: true,
        title: true,
        date: true,
        text: true,
        projectId: true,
        project: true,
        images: true,
      },
    });
  }
  async findAll(projectid: number) {
    return await this.prismaService.rapport.findMany({
      where: {
        projectId: projectid,
      },
      select: {
        id: true,
        title: true,
        date: true,
        text: true,
        projectId: true,
        project: true,
        images: true,
      },
    });
  }
  async udpate(projectId: number, pvid: number, updatePvDto: UpdatePvDto) {
    let { images, ...restDtoData } = updatePvDto;
  
    if (!images) {
      images = []; 
    }
  
    await this.prismaService.image.deleteMany({
      where: {
        rapportId: pvid,
      },
    });
  
    if (images.length > 0) {
      const imageCreationPromises = images.map(async (image) => {
        return await this.prismaService.image.create({
          data: {
            rapportId: pvid,
            url: image,
          },
        });
      });
      
      // Wait for all images to be created
      await Promise.all(imageCreationPromises);
    }
  
    // Update the rapport with the remaining data
    return await this.prismaService.rapport.update({
      where: {
        id: pvid,
        projectId: projectId,
      },
      data: restDtoData,
    });
  }
  
  async delete(projectid: number, pvid: number) {
    await this.prismaService.rapport.delete({
      where: {
        id: pvid,
        projectId: projectid,
      },
    });
    return {
      message: 'deleted',
    };
  }
}
