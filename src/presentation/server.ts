import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-services";

export class Server {

  public static start() {
    console.log("Server is starting...");
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        //const date = new Date();
        //console.log('5 seg',date);
        new CheckService().execute("http://google.com");
      }
    );

  }
}
