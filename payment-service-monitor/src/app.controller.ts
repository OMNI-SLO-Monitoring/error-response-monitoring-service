import { Controller, Get, Post, Body, Ip, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LogMessageFormat, ErrorFormat } from 'logging-format';


/**
 * Controller to show all messages received on a get request and to send received errors to the the issue creator on a post request
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  /**
   * recieves an error and 
   * and sends it to localhost:3500 to the issue creator.
   *
   * @param error sent by price service
   */
  @Post()
  async convertIntoLog(@Body() error: ErrorFormat) {
    return this.appService.reportLogFromError(error);
  }

  /**
   * Json array sits on localhost:3400/messages containing all messages since server start. Returned Json array is used for UI
   */
  @Get('messages')
  async getAllMessages() {
    return this.appService.getAllMessages();
  }
}
