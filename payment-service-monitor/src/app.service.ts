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

  constructor(private logger: IssueLoggingService) {}

  /**
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
   * 
   * sending the log message to kafka topic
   */

  async sendLogMessage(logMessage: LogMessageFormat) {
    await producer.connect();
    await producer.send({
      topic: 'logs',
      messages: [{
value: JSON.stringify(logMessage)}]
    });
    await producer.disconnect();
  }

  /**
   * returns all log messages created
   * @returns the messages array containing all messages
   */
  getAllMessages() {
    return [...this.messages];
  }
}
