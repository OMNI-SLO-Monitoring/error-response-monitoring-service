import { Injectable } from '@nestjs/common';
import { IssueLoggingService } from 'logging-module';
import { LogType, LogMessageFormat } from 'logging-format';

@Injectable()
export class AppService {
  messages: LogMessageFormat[] = [];

  constructor(private logger: IssueLoggingService) {}

  /**
   *
   * @param logMessage log message in the LogMessageFormat
   * creation of a log message and pushing that message into array 'messages'
   */

  async createLogMsg(logMessage: LogMessageFormat) {
    let logMsg: LogMessageFormat = {
      type: logMessage.type,
      time: logMessage.time,
      source: logMessage.source,
      detector: logMessage.detector,
      message: logMessage.message,
      data: logMessage.data,
    };
    this.messages.push(logMsg);
  }
  /**
   *
   * @param logMessage log message in the LogMessageFormat
   * sending the log message to issue creator on localhost:3500 via IssueLoggingService
   */

  sendLogMessage(logMessage: LogMessageFormat) {
    this.logger.log({
      type: logMessage.type,
      time: logMessage.time,
      source: logMessage.source,
      detector: logMessage.detector,
      message: logMessage.message,
      data: logMessage.data,
    });
  }

  /**
   * returns all log messages created
   */
  getAllMessages() {
    return [...this.messages];
  }
}
