import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { LogMessageFormat } from 'logging-format';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

/**
   * @param message the message that the error message sends
   * @param logType the logType of the error
   * 
   * converts an error message from a post request into the LogMessage and sends it to localhost:3500 to the issue creator. 
   * on success the message 'log message created!' will be displayed
   */

  @Post()
  async convertIntoLog(
    @Body() logMessage: LogMessageFormat) {
    this.appService.createLogMsg(logMessage);
    this.appService.sendLogMessage(logMessage);
    return 'log message created!';
  }
  
  /**
   * Json array sits on localhost:3400/messages containing all messages since server start. Returned Json array is used for UI
   */

  @Get('messages')
  getAllMessages() {
    return this.appService.getAllMessages();
  }
}
