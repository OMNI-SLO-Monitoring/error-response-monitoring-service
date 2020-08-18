import { Injectable } from '@nestjs/common';
import { IssueLoggingService } from 'logging-module';
import { LogMessageFormat } from 'logging-format';
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'error-monitor',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();


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

  async sendLogMessage(logMessage: LogMessageFormat) {
    await producer.connect();
    await producer.send({
      topic: 'logs',
      messages: [{
value: JSON.stringify(logMessage)}]
    });
    await producer.disconnect();

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
