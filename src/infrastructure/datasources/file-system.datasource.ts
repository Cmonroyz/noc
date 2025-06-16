import { LogDatasource } from '../../domain/datasources/log.datasouerce';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';


export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'log/';
  private readonly allLogsPath = 'log/logs-all.log';
  private readonly mediumLogsPath = 'log/logs-medium.log';
  private readonly highLogsPath = 'log/logs-high.log';

  constructor () {
    this.createLogsFiles();
  }
  // vemos si existen los file system o lo crearemos.
  private createLogsFiles = ( ) => {
    if (!fs.existsSync(this.logPath)){
      fs.mkdirSync(this.logPath);
    }
    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach( path =>{
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    })
  }


  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${ JSON.stringify(newLog) }\n`;
    fs.appendFileSync(this.allLogsPath,logAsJson);
    if (newLog.level === LogSeverityLevel.low) return;
    
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath,logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath,logAsJson);
    }
  }

  private getLogFromFile = (path:string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    if( content === '' ) return [];
    const logs = content.split('\n').map(
      log => LogEntity.fromJson(log)
    );
    return logs;
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch( severityLevel ) {
      case LogSeverityLevel.low:
        return this.getLogFromFile(this.allLogsPath);
      
      case LogSeverityLevel.medium:
        return this.getLogFromFile(this.mediumLogsPath);
      
      case LogSeverityLevel.high:
        return this.getLogFromFile(this.highLogsPath);
      
      default:
        throw new Error(`${ severityLevel} not implemeted`);
    }
  }

}