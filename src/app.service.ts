import { Injectable } from '@nestjs/common';
import { LogMessageFormat, ErrorFormat } from 'logging-format';
import { ConfigService } from '@nestjs/config';
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'error-monitor',
  brokers: [new ConfigService().get<string>('KAFKA_URL', 'localhost:9092')],
});
const producer = kafka.producer();

/**
 * This service is responsible for the creation and saving of log messages in an array and sending them to the issue creator
 */
@Injectable()
export class AppService {
  messages: LogMessageFormat[] = [];

  reportedCorrelationIds: string[] = [];


  /**
   * Sends given log message to kafka queue
   * 
   * @param logMessage log message to be sent to queue. 
   */
  async sendLogMessage(logMessage: LogMessageFormat) {
    await producer.connect();
    await producer.send({
      topic: 'logs',
      messages: [
        {
          value: JSON.stringify(logMessage),
        },
      ],
    });
    await producer.disconnect();
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
      this.messages.push(error.log);
      this.sendLogMessage(error.log);
    }
  }

  /**
   * returns all log messages created during runtime of service
   *
   * @returns the messages array containing all messages
   */
  getAllMessages() {
    return this.messages;
  }
}
