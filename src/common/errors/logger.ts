import * as winston from 'winston';
import 'winston-daily-rotate-file';

// Configura el formato del log para .txt
const txtLogFormat = winston.format.printf(({ timestamp, level, message }) => {
  const logMessage = JSON.parse(message);
  return `${timestamp} [${level.toUpperCase()}]: ${logMessage.statusCode} ${logMessage.method} ${logMessage.path}\nClient IP: ${logMessage.clientIp}\nMessage: ${logMessage.message}\nStack: ${logMessage.stack ? logMessage.stack : 'N/A'}\n`;
});

// Configura el formato del log para .log
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Configura el transportador para el archivo .txt
const txtTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.txt',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error', // Solo guarda logs de errores
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    txtLogFormat
  ),
});

// Configura el transportador para el archivo .log
const logTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error', // Solo guarda logs de errores
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
});

// Crea el logger de winston
const logger = winston.createLogger({
  transports: [txtTransport, logTransport],
});

export { logger };
