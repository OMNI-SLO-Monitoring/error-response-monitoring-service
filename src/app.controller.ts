import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async convertIntoLog(@Body() error: ErrorFormat) {
    this.appService.reportLogFromError(error)
  }

  /**
   * Returns list of all log messages reived during runtime of service
   * 
   * @returns all received log messages
   */
  @Get('messages')
  async getAllMessages() {
    return this.appService.getAllMessages();
  }
}
