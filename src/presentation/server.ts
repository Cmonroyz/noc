import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.services";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
export class Server {

  public static start() {
    console.log("Server is starting...");

    // envio de correos.
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'to_email@example.com',
      subject: 'Logs de sistema',
      htmlBody: `
      <h3>Lorem ipsum</h3>
      <p> Lorem ipsum body</p>
      `,
    });

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     //const url = "http://localhost:3000";
    //     const url = "http://google.com";
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute( url );
    //     //Test con un json server.
    //     //new CheckService().execute("http://localhost:3000");
    //   }
    // );

  }
}
