import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


//permitirnos llamar metodos que se encuentran dentro de repository.
export abstract class LogRepository {
  abstract saveLog( log: LogEntity):Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel):Promise<LogEntity[]>;
}