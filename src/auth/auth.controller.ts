import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ReqOtpDto } from './dto/reqOtp.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { ChangePassDto } from './dto/changePass.Dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/reqotp')
  requestPassChange(@Body() reqOtpDto: ReqOtpDto) {
    return this.authService.sendOtp(reqOtpDto.email);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/verifyotp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto.email, verifyOtpDto.otp);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/changepass')
  changePass(@Body() changePassDto: ChangePassDto) {
    return this.authService.changePassword(
      changePassDto.email,
      changePassDto.otp,
      changePassDto.newPass,
      changePassDto.confirmPass,
    );
  }
}
