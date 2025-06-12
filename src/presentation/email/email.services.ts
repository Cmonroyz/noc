import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';


interface sendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth:{
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmail(options: sendMailOptions):Promise<boolean> {
    const { to, subject, htmlBody } = options;
    try {
      const sentInfomation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
      });

      console.log(sentInfomation);
      return true;
    } catch (error) {
      return false;
    }
  }
}