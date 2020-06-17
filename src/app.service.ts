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


  async createLogMsg(logType: LogType, message: string) {
 
    this.logger.log({
      type: logType,
      time: this.time,
      source: this.priceServiceUrl,
      target: this.issueCreatorUrl,
      message: message
    });
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

  getAllMessages(){
    return [...this.messages];
  }
}
