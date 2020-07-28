import { Injectable } from '@nestjs/common';
import { IssueLoggingService } from 'logging-module';
import { LogMessageFormat, ErrorFormat } from 'logging-format';

/**
 * This service is responsible for the creation and saving of error messages in an array and sending them to the issue creator
 */
@Injectable()
export class AppService {

  messages: LogMessageFormat[] = [];

  reportedCorrelationIds: string[] = [];

  constructor(private logger: IssueLoggingService) {

  }

  /**
   * @param logMessage log message in the LogMessageFormat
   * creation of a log message and pushing that message into array 'messages'
   */
  async createLogMsg(logMessage: LogMessageFormat) {
    this.messages.push(logMessage);
  }

  /**
   *
   * @param logMessage log message in the LogMessageFormat
   * sending the log message to issue creator on localhost:3500 via IssueLoggingService
   */
  sendLogMessage(log: LogMessageFormat) {
    this.logger.log(log);
  }

  /**
   * Creates a log message from an error and reports it to the issue-creator
   * 
   * @param error that sould ne reported
   */
  async reportLogFromError(error: ErrorFormat) {
    console.log("recieved error to report")
    if (!(this.reportedCorrelationIds.includes(error.correlationId))) {
      this.reportedCorrelationIds.push(error.correlationId);
      console.log("reporting error")
      this.logger.log(error.log);
    }
  }

  /**
   * returns all log messages created
   * @returns the messages array containing all messages
   */
  getAllMessages() {
    return this.messages;
  }
}
