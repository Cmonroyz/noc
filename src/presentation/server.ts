import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
export class Server {

  public static start() {
    console.log("Server is starting...");
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        //const url = "http://localhost:3000";
        const url = "http://google.com";
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute( url );
        //Test con un json server.
        //new CheckService().execute("http://localhost:3000");
      }
    );

  }
}
