import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute( url:string ):Promise<boolean>;
}

type SuccesCallback = () =>void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase {
  //Crear dependencias.
  constructor (
    private readonly logRepository: LogRepository,
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {

  }
  //servicio que revisa cualquier url.
  public async execute ( url:string):Promise<boolean>{

    try {
      const req = await fetch( url );
      if( !req.ok ){
        throw new Error (`Error on check service ${ url }`);
      }
      const log = new LogEntity({
        message:`Server ${ url } working`,
        level:LogSeverityLevel.low,
        origin: 'check-service.ts'
      });
      this.logRepository.saveLog(log);
      this.succesCallback();
      return true;
    } catch (error) {
      //console.log(`${error}`);
      const  errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity ({
        message:errorMessage,
        level:LogSeverityLevel.high,
        origin:'check-service.ts'
      });
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}