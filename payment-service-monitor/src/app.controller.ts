import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { LogMessageFormat } from 'logging-format';
import { RequestSenderService } from './request-sender/request-sender.service';
import { MonitoringSelectionService } from './monitoring-selection/monitoring-selection.service';
import { url } from 'inspector';
import { request } from 'http';

/**
 * Controller to show all messages received on a get request and to send received errors to the the issue creator on a post request
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private monitoringSelectionService : MonitoringSelectionService,
    private requestSender: RequestSenderService,
  ) {}

  /**
   *
   * @param logMessage logMessage sent by price service
   * 
   * Checks if requesting service is being monitored, if true
   * converts an error message from a post request into the LogMessage
   * and sends it to localhost:3500 to the issue creator
   * Else the request is ignored
   */
  @Post()
  async convertIntoLog(@Body() logMessage: LogMessageFormat) {
    if ((await this.monitoringSelectionService.checkIfServiceIsSelected('1234')).length != 0) {
      console.log('yes')
      this.appService.createLogMsg(logMessage);
      this.appService.sendLogMessage(logMessage);
    }
  }

  /**
   * Json array sits on localhost:3400/messages containing all messages since server start. Returned Json array is used for UI
   */

  @Get('messages')
  async getAllMessages() {
    return this.appService.getAllMessages();
  }
}
