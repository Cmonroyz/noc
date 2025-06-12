import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogEntity,LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth:{
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  constructor() {}

  async sendEmail(options: sendMailOptions):Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      const sentInfomation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      //console.log(sentInfomation);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailFileSystemLogs (to:string | string[]){
    const subject = 'Logs del sercidor';
    const htmlBody= `
      <h3>Lorem ipsum</h3>
      <p> Lorem ipsum body</p>
      `;
    const attachements:Attachement[] = [
      {filename: 'logs-all.log', path: './log/logs-all.log'},
      {filename: 'logs-high.log', path: './log/logs-high.log'},
      {filename: 'logs-medium.log', path: './log/logs-medium.log'}
    ];
    return this.sendEmail({
      to, subject, attachements, htmlBody
    });
  } 
}