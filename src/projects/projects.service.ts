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

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: UserPayload) {
    const userExist = this.usersService.findById(user.id);
    if (!userExist) {
      throw new BadRequestException('your user id isnt found ');
    }

    if (createProjectDto.generalDirectorID !== user.generalDirectorID) {
      throw new BadRequestException('Wrong director id ');
    }

    const projectname = createProjectDto.name;
    const projectExist = await this.prismaService.project.findFirst({
      where: {
        name: projectname,
      },
    });

    if (projectExist) {
      throw new BadRequestException('project with this name already exist ');
    }

    const directorExist = await this.usersService.findById(
      createProjectDto.generalDirectorID,
    );
    if (!directorExist) {
      throw new NotFoundException('Director not found');
    }

    const createdProject = await this.prismaService.project.create({
      data: { ...createProjectDto, userId: user.id },
    });

    return createdProject;
  }

  findAll(name?: string, userid?: number, generalDirectorID?: number) {
    const filterdata = {
      userId: userid,
      generalDirectorID: generalDirectorID,
    };

    console.log(filterdata);

    if (!userid) {
      delete filterdata.userId;
    }
    if (!generalDirectorID) {
      delete filterdata.generalDirectorID;
    }

    return this.prismaService.project.findMany({
      where: {
        name: { contains: name },
        ...filterdata,
      },

      select: {
        id: true,
        name: true,
        BET: true,
        ETP: true,
        start: true,
        end: true,
        cost: true,
        Description: true,
        Location: true,
        progress: true,
        rapports: true,
        userId: true,
        user: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
            id: true,
            picture: true,
            userType: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.project.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        BET: true,
        ETP: true,
        start: true,
        end: true,
        cost: true,
        Description: true,
        Location: true,
        progress: true,
        rapports: true,
        userId: true,
        user: {
          select: {
            email: true,
            firstname: true,
            lastname: true,
            id: true,
            picture: true,
            userType: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectExist = await this.findOne(id);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }

    const updatedProject = await this.prismaService.project.update({
      where: {
        id: id,
      },
      data: updateProjectDto,
    });
    return updatedProject;
  }

  async remove(id: number) {
    const projectExist = await this.findOne(id);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }

    await this.prismaService.project.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'project deleted',
    };
  }
}
