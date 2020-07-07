import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LogMessageFormat } from 'logging-format';
import { RequestSenderService } from './request-sender/request-sender.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private requestSender: RequestSenderService,
  ) {}

  /**
   *
   * @param logMessage logMessage sent by price service
   * converts an error message from a post request into the LogMessage
   * and sends it to localhost:3500 to the issue creator.
   */
  @Post()
  async convertIntoLog(@Body() logMessage: LogMessageFormat) {
    this.appService.createLogMsg(logMessage);
    this.appService.sendLogMessage(logMessage);
  }

  /**
   * Json array sits on localhost:3400/messages containing all messages since server start. Returned Json array is used for UI
   */

  @Get('messages')
  async getAllMessages() {
    return this.appService.getAllMessages();
  }

  /**
   * The request sent by the account service will go to this endpoint and
   * will be transferred to the database service
   */
  @Get('account-value')
  async requestAccountValue() {
    return this.requestSender.fetchAccountValue();
  }
}
