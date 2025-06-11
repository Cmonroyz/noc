import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// Reglas de negocion como queremos que funcione.
export abstract class LogDatasource {
  abstract saveLog( log: LogEntity):Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel):Promise<LogEntity[]>;
}