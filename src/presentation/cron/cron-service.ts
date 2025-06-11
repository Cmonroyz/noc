import { CronJob } from 'cron';

export class CronService {

  static createJob() {
    const job = new CronJob(
    '*/2 * * * * *', // cronTime
    () => {
      const date = new Date();
      console.log('2 seg',date);
    },
    );
    job.start();
  }
}