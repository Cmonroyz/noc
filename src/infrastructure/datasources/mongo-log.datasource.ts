import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasouerce';
import { LogEntity, LogSeverityLevel} from '../../domain/entities/log.entity';

export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('mongo log created:', newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    });
    return logs.map(mongolog=> LogEntity.fromObject(mongolog));
  }
}