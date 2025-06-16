import { envs } from '../config/plugins/env.plugins';
import { CronService } from "./cron/cron-service";
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { CheckService } from "../domain/use-cases/checks/check-services";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.services";
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  //new MongoLogDatasource(),
);
const emailService = new EmailService();
export class Server {

  public static async start() {
    console.log("Server is starting...");

    //todo: Mandar email
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: 'cmonroyz@emeal.nttdata.com',
    //   subject: 'Logs de sistema',
    //   htmlBody: `
    //   <h3>Lorem ipsum</h3>
    //   <p> Lorem ipsum body</p>
    //   `,
    // });

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);

    //todo: Cron service.
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     //const url = "http://localhost:3000";
    //     const url = "http://google.com";
    //     new CheckService(
    //       logRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute( url );
    //     //Test con un json server.
    //     //new CheckService().execute("http://localhost:3000");
    //   }
    // );

  }
}
