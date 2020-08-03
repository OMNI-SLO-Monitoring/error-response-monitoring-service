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

  constructor(private logger: IssueLoggingService) {}

  /**
   * creation of a log message and pushing that message into array 'messages'
   *
   * @param logMessage log message in the LogMessageFormat
   */
  async createLogMsg(logMessage: LogMessageFormat) {
    this.messages.push(logMessage);
  }

  /**
   * sending the log message to issue creator on localhost:3500 via IssueLoggingService
   *
   * @param logMessage log message in the LogMessageFormat
   */
  sendLogMessage(log: LogMessageFormat) {
    this.logger.log(log);
  }

  /**
   * Creates a log message from an error and reports it to the issue-creator
   *
   * @param error that should be reported
   */
  async reportLogFromError(error: ErrorFormat) {
    console.log('received error to report');
    if (!this.reportedCorrelationIds.includes(error.correlationId)) {
      this.reportedCorrelationIds.push(error.correlationId);
      console.log('reporting error');
      this.logger.log(error.log);
    }
  }

  /**
   * returns all log messages created
   *
   * @returns the messages array containing all messages
   */
  getAllMessages() {
    return this.messages;
  }
}
