import { Injectable } from '@nestjs/common';
import { IssueLoggingService } from 'logging-module';
import { LogType, LogMessageFormat } from 'logging-format';

@Injectable()
export class AppService {
  messages: LogMessageFormat[] = [];
  priceServiceUrl = "http://localhost:3300";
  issueCreatorUrl = "http://localhost:3500";
  time = new Date().getTime()

  constructor(private logger: IssueLoggingService) { }

  /**
 * 
 * @param logType the LogType of the error, One of 'ERROR', 'CPU', 'CB_OPEN', 'TIMEOUT'
 * @param message message of the error
 * 
 * creation of a log message and pushing that message into array 'messages'
 */

  async createLogMsg(logType: LogType, message: string) {
    let logMsg: LogMessageFormat = {
      type: logType,
      time: this.time,
      source: this.priceServiceUrl,
      target: this.issueCreatorUrl,
      message: message
    }
    this.messages.push(logMsg);
    return logMsg;
  }
  /**
   * 
   * @param logType the LogType of the error, One of 'ERROR', 'CPU', 'CB_OPEN', 'TIMEOUT'
   * @param message message of the error
   * 
   * sending the log message to issue creator on localhost:3500 via IssueLoggingService
   */

  sendLogMessage(logType: LogType, message: string) {
    this.logger.log({
      type: logType,
      time: this.time,
      source: this.priceServiceUrl,
      target: this.issueCreatorUrl,
      message: message
    });
  }
  
  /**
   * returns all log messages created
   */

  getAllMessages() {
    return [...this.messages];
  }
}
