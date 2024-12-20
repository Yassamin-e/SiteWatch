import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodeMailerService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as the mail service
      auth: {
        user: this.configService.get('EMAIL_ADD'), // Your Gmail address
        pass: this.configService.get('EMAIL_PASS'), // Your Gmail app password
      },
    });
  }

  async sendOtp(email: string, otp: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_ADD'), // Your Gmail address
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}