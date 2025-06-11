import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { error } from "console";

export class Server {

  public static start() {
    console.log("Server is starting...");
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = "http://google.com";
        new CheckService(
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute( url );
        //Test con un json server.
        //new CheckService().execute("http://localhost:3000");
      }
    );

  }
}
