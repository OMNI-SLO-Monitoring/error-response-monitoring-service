import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { ErrorFormat } from 'logging-format';
import { AppService } from './app.service';


/**
 * Controller to show all messages received on a get request and to send received errors to the the issue creator on a post request
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  /**
   * receives an error and reports it as a log to the issue creator
   * 
   * @param error that should be reported
   */
  @Post()
  async convertIntoLog(@Body() error: ErrorFormat, @Ip() ip) {
    this.appService.reportLogFromError(error)
  }

  /**
   * Json array sits on localhost:3400/messages containing all messages since server start. Returned Json array is used for UI
   * 
   * @returns all log messages
   */
  @Get('messages')
  async getAllMessages() {
    return this.appService.getAllMessages();
  }
}
