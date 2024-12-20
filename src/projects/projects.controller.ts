import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserPayload, Usertype } from 'src/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PvsService } from './pvs.service';
import { CreatePvDto } from './dto/create-pv.dto';
import { UpdatePvDto } from './dto/update-pv.dto';

@ApiTags('projects')
@ApiBearerAuth('authorization')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly pvsService: PvsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: UserPayload,
  ) {
    return this.projectsService.create(createProjectDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('name') name: string, @User() user: UserPayload) {
    if (user.userType === Usertype.PROJECT_MANAGER) {
      return this.projectsService.findAll(
        name,
        user.id,
        user.generalDirectorID,
      );
    } else if (user.userType === Usertype.GENERAL_DIRECTOR) {
      return this.projectsService.findAll(name, null, user.id);
    } else {
      return this.projectsService.findAll(name);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(+id);

    if (!project) {
      throw new NotFoundException('project not found');
    }
    return project;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Post(':id/pvs/')
  async createPv(
    @Param('id', ParseIntPipe) projectId: number,
    // @Param('pvid') pvid: number,
    @Body() createPvDto: CreatePvDto,
  ) {
    const projectExist = await this.projectsService.findOne(projectId);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }
    return this.pvsService.create(projectId, createPvDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id/pvs/:pvid')
  async findPv(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('pvid', ParseIntPipe) pvid: number,
  ) {
    const projectExist = await this.projectsService.findOne(projectId);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }
    const rapport = await this.pvsService.findById(projectId, pvid);
    if (!rapport) {
      throw new NotFoundException('rapport not found');
    }
    return rapport;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Patch(':id/pvs/:pvid')
  async udpatePv(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('pvid', ParseIntPipe) pvid: number,
    @Body() updatePvDto: UpdatePvDto,

    // @User()user:User
  ) {
    const projectExist = await this.projectsService.findOne(projectId);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }
    const rapport = await this.pvsService.findById(projectId, pvid);
    if (!rapport) {
      throw new NotFoundException('rapport not found');
    }
    return await this.pvsService.udpate(projectId, pvid, updatePvDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Usertype.PROJECT_MANAGER)
  @Delete(':id/pvs/:pvid')
  async deletePv(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('pvid', ParseIntPipe) pvid: number,
    // @User() user: User (Optional: Use this if you need user info)
  ) {
    // Check if the project exists
    const projectExist = await this.projectsService.findOne(projectId);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }

    // Check if the specific PV (report) exists for the project
    const rapport = await this.pvsService.findById(projectId, pvid);
    if (!rapport) {
      throw new NotFoundException('Report not found');
    }

    // Proceed with deletion
    await this.pvsService.delete(projectId, pvid);

    // Optionally return a success message or status
    return {
      message: 'Report successfully deleted',
      projectId,
      pvid,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id/pvs/')
  async findAllPvs(@Param('id', ParseIntPipe) projectId: number) {
    const projectExist = await this.projectsService.findOne(projectId);
    if (!projectExist) {
      throw new NotFoundException('Project not found');
    }
    // if (!rapport) {
    //   throw new NotFoundException('rapport not found');
    // }
    return await this.pvsService.findAll(projectId);
  }
}
