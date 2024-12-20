import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { NodeMailerService } from 'src/node-mailer/node-mailer.service';
import { PrismaService } from './prisma/prisma.service';
import { Usertype } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private nodemailerService: NodeMailerService,
    private prismaService: PrismaService,
  ) {}
  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // const payload = { sub: user.userId, username: user.username };
    console.log(result);

    return {
      ...result,
      access_token: await this.jwtService.signAsync(result),
    };
  }

  async signUp(registerDto: RegisterDto) {
    const userExist = await this.usersService.findOne(registerDto.email);

    if (userExist) {
      throw new BadRequestException('Email already exist');
    }
    if (
      registerDto.userType === Usertype.GENERAL_DIRECTOR ||
      registerDto.userType === Usertype.ADMIN
    ) {
      delete registerDto.generalDirectorID;
    } else {
      console.log(registerDto.generalDirectorID);

      const directorExist = await this.usersService.findById(
        registerDto.generalDirectorID,
      );
      if (!directorExist) {
        throw new NotFoundException('Director not found');
      }
    }

    return await this.usersService.create(registerDto);
  }

  generateOTP() {
    const otpExpireDate = new Date();
    otpExpireDate.setMinutes(otpExpireDate.getMinutes() + 10); // OTP expires in 10 minutes

    // Generate a random number between 1000 and 9999 (inclusive)
    return {
      otpExpireDate: otpExpireDate,
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
    };
  }

  async sendOtp(email: string) {
    const userExist = await this.usersService.findOne(email);
    if (!userExist) {
      throw new NotFoundException('user not found');
    }
    const otpData = this.generateOTP();
    await this.nodemailerService.sendOtp(email, otpData.otp);

    await this.prismaService.user.update({
      where: {
        id: userExist.id,
      },
      data: {
        otp: otpData.otp,
        otpExpireDate: otpData.otpExpireDate,
      },
    });

    return {
      message: 'check your email',
    };
  }

  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<{ success: boolean; message?: string }> {
    // Find the user by email
    const user = await this.usersService.findOne(email);

    // Check if user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if OTP matches and if it is still valid
    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // Check if the OTP has expired
    if (user.otpExpireDate < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    // Return success response
    return { success: true, message: 'OTP verified successfully' };
  }

  async changePassword(
    email: string,
    otp: string,
    newPass: string,
    confirmPass: string,
  ) {
    const user = await this.usersService.findOne(email);
    console.log(email);
    console.log(user);
    console.log(user.otp);
    console.log(user.otpExpireDate);

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpireDate < new Date() ||
      !user.otp ||
      !user.otpExpireDate
    ) {
      throw new BadRequestException('wrong otp or otp expired');
    }

    if (newPass !== confirmPass) {
      throw new BadRequestException("passwords aren't matching");
    }

    const updateduser = await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        otp: null,
        otpExpireDate: null,
        password: newPass,
      },
    });

    return {
      message: 'password changed successfully, now log in',
    };
    // if (!user || user.otp !== otp || user.otpExpireDate < new Date()) {
    //   throw new BadRequestException('wrong otp or otp expired');
    // }
  }
}
