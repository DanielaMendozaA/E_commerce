import { Injectable } from "@nestjs/common";
import * as winston from 'winston';
import 'winston-daily-rotate-file'

@Injectable()
export class LoggerService{
  private readonly logger: winston.Logger;

  constructor(){
    // Crea una instancia del logger de winston
    this.logger = winston.createLogger({
      // Establece el nivel de logging en 'info'
      level: 'info',
      // Configura el formato del log
      format: winston.format.combine(
        // Añade una marca de tiempo a cada mensaje de log con el formato 'YYYY-MM-DD HH:mm:ss'
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        // Convierte el mensaje de log a formato JSON
        winston.format.json()
      ),
      transports: [
        // Configura el transportador 
        new winston.transports.DailyRotateFile({
          // Establece el nombre del archivo de txt
          filename: 'logs/error-%DATE%.txt',
          // Establece el patrón de fecha
          datePattern: 'YYYY-MM-DD',
          // Habilita la compresión de archivos
          zippedArchive: true,
          // Establece el tamaño máximo de los archivos
          maxSize: '20m',
          // Establece el número máximo de archivos
          maxFiles: '14d',
          // Establece el nivel de logging en 'error'
          level: 'error',
          // Establece el formato del log
          format: winston.format.printf(
            // Establece el formato del log
            ({ timestamp, level, message }) => {
              // Convierte el mensaje de log a JSON
              const logMessage = JSON.parse(message);
              // Retorna el mensaje de log con el formato especificado
              return `${timestamp} [${level.toUpperCase()}]: ${logMessage.statusCode} ${logMessage.method} ${logMessage.path}\nClient IP: ${logMessage.clientIp}\nMessage: ${logMessage.message}\nStack: ${logMessage.stack ? logMessage.stack : 'N/A'}\n`;
            }),
        }),
        // Configura el transportador
        new winston.transports.DailyRotateFile({
          // Establece el nombre del archivo de log
          filename: 'logs/error-%DATE%.log',
          // Establece el patrón de fecha
          datePattern: 'YYYY-MM-DD',
          // Habilita la compresión de archivos
          zippedArchive: true,
          // Establece el tamaño máximo de los archivos
          maxSize: '20m',
          // Establece el número máximo de archivos
          maxFiles: '14d',
          // Establece el nivel de logging en 'info'
          level: 'error',
          // Establece el formato del log
          format: winston.format.printf(
            // Establece el formato del log
            ({ timestamp, level, message }) => {
              // Retorna el mensaje de log con el formato especificado
              return `${timestamp} ${level} ${message}`;
            }),
        }),
        new winston.transports.Console()
      ]
    })
  }

  log(message: string){
    this.logger.info(message);
  }

  error(message: string){
    this.logger.error(message);
  }

  warn(message: string){
    this.logger.warn(message);
  }

  debug(message: string){
    this.logger.debug(message)
  }

  verbose(message: string){
    this.logger.verbose(message);
  }
 
}
