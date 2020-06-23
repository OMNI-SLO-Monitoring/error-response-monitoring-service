import { Injectable, HttpService } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LogType, LogMessageFormat } from 'logging-format';

@Injectable()
export class RequestSenderService {
  //url endpoint for request
  private requestUrl: string;
  //data that is being returned upon request
  private receivedType: any;
  //expected response type
  private expectedType: any;

  constructor(
    private httpService: HttpService,
    private logCreator: AppService,
  ) {}

  /**
   * Makes a request based on the request parameters inside post body
   * and evaluates whether the expected type and the received type of
   * the response match. If not, a log is created and sent to the issue creator
   * @param requestParams post body with request parameters
   */
  async makeRequest(requestParams: any): Promise<any> {
    this.requestUrl = requestParams.url;
    this.expectedType = requestParams.responseType;
    switch (requestParams.httpMethod) {
      case 'get': {
        const res = await this.httpService.get(this.requestUrl).toPromise();
        this.receivedType = typeof res.data;
        if (this.receivedType === this.expectedType) {
          return res.data;
        } else {
          const log: LogMessageFormat = {
            type: LogType.ERROR,
            time: Date.now(),
            source: this.requestUrl,
            detector: 'Error Response Monitor',
            message: 'Incorrect Response Type',
            data: {
              expected: this.expectedType,
              result: this.receivedType,
            },
          };
          this.logCreator.createLogMsg(log);
          this.logCreator.sendLogMessage(log);
          throw new Error('Incorrect Response Type');
        }
      }
      case 'post': {
        console.log('post request');
        break;
      }
    }
  }
}
