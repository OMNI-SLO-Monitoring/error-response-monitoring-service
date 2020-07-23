import { Injectable, HttpService } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LogType, LogMessageFormat } from 'logging-format';

/**
 * This service is responsible for sending a get or post request to an url and dependent on whether
 * the response equals the expected response it will either send an error log to an url or accept the request
 * 
 */
@Injectable()
export class RequestSenderService {
  //url endpoint for request
  private requestUrl: string;
  //data type of data that is being returned upon request
  private receivedType: any;
  //expected response type of returned data
  private expectedType: any;
  //error message for false response type
  private errorResponseMsg = 'Incorrect Parameters';

  constructor(
    private httpService: HttpService,
    private logCreator: AppService,
  ) {}

  /**
   * Upon failure, this method creates a log and sends it to the issue creator component and
   * stores the log in an array in the backend
   * @param errorSource the source of error
   * @param errorMessage the message of the error
   * @param expectedData the response type that is expected to be returned
   * @param receivedData the response type that is actually returned
   */
  createAndSendLog(
    errorSource: string,
    errorMessage: string,
    expectedData,
    receivedData,
  ): LogMessageFormat {
    const log: LogMessageFormat = {
      type: LogType.ERROR,
      time: Date.now(),
      source: errorSource,
      detector: 'Error Response Monitor',
      message: errorMessage,
      data: {
        expected: expectedData,
        result: receivedData,
      },
    };
    this.logCreator.createLogMsg(log);
    this.logCreator.sendLogMessage(log);
    return log;
  }

  /**
   * Makes a request based on the request parameters inside post body
   * and evaluates whether the expected type and the received type of
   * the response match. If not, a log is created and sent to the issue creator.
   * An appropriate response with the log is additionally returned for the UI to display.
   * @param requestParams post body with request parameters
   */
  async makeRequest(requestParams: any): Promise<any> {
    this.requestUrl = requestParams.url;
    this.expectedType = requestParams.responseType;
    switch (requestParams.httpMethod) {
      case 'get': {
        try {
          const res = await this.httpService.get(this.requestUrl).toPromise();
          this.receivedType = typeof res.data;
          if (this.receivedType === this.expectedType) {
            return { msg: res.data, log: null };
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedType,
              this.receivedType,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        } catch (err) {
          const log = this.createAndSendLog(
            this.requestUrl,
            err.message,
            this.expectedType,
            err.message,
          );
          return { msg: err.message, log: log };
        }
      }
      case 'post': {
        try {
          const res = await this.httpService
            .post(this.requestUrl, { body: `${requestParams.postBody}` })
            .toPromise();
          this.receivedType = res.status;
          if (this.receivedType.toString() === this.expectedType) {
            return { msg: `Status: ${res.status} | ${res.data}`, log: null };
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedType,
              `${this.receivedType} Status Code`,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        } catch (err) {
          console.log('hi');
          if (err.response) {
            if (this.expectedType === err.response.status.toString()) {
              return { msg: `Status: ${err.response.status}`, log: null };
            }
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedType,
              `${err.response.status} Status Code`,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        }
      }
    }
  }
}
