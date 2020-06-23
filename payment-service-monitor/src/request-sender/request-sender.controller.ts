import { Controller, Body, Post } from '@nestjs/common';
import { RequestSenderService } from './request-sender.service';

@Controller('request-sender')
export class RequestSenderController {
  constructor(private requestSenderService: RequestSenderService) {}

  /**
   * Receives the request parameters and passes them down to the
   * request sender service
   * @param requestParams post body with request parameters
   */
  @Post()
  receiveRequestParameters(@Body() requestParams) {
    return this.requestSenderService.makeRequest(requestParams);
  }
}
