import { Injectable, HttpService } from '@nestjs/common';
import { AppService } from '../app.service';
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
  //response data that is being returned upon request
  private receivedResponse: any;
  //expected response data of returned data
  private expectedResponse: any;
  //error message for false response type
  private errorResponseMsg = 'Incorrect Parameters';

  constructor(
    private httpService: HttpService,
    private logCreator: AppService,
  ) {}

  /**
   * Upon failure, this method creates a log and sends it to the issue creator component and
   * stores the log in an array in the backend
   *
   * @param errorSource the source of error
   * @param errorMessage the message of the error
   * @param expectedResponse the data that is expected to be returned
   * @param receivedResponse the data that is actually returned
   */
  createAndSendLog(
    errorSource: string,
    errorMessage: string,
    expectedResponse,
    receivedResponse,
  ): LogMessageFormat {
    const log: LogMessageFormat = {
      type: LogType.ERROR,
      time: Date.now(),
      source: errorSource,
      detector: 'Error Response Monitor',
      message: errorMessage,
      data: {
        expected: expectedResponse,
        result: receivedResponse,
      },
    };
    this.logCreator.createLogMsg(log);
    this.logCreator.sendLogMessage(log);
    return log;
  }

  /**
   * Makes a request based on the request parameters inside post body
   * and evaluates whether the expected response and the received response of
   * the response match. If not, a log is created and sent to the issue creator.
   * An appropriate response with the log is additionally returned for the UI to display.
   *
   * @param requestParams post body with request parameters
   * @returns an object that contains a message field named msg and a log field named log.
   * Depending on the outcome of the request, the log field is populated and the message is set
   * accordingly
   */
  async makeRequest(requestParams: any): Promise<any> {
    this.requestUrl = requestParams.url;
    this.expectedResponse = requestParams.expResponse;
    switch (requestParams.httpMethod) {
      case 'get': {
        try {
          const res = await this.httpService.get(this.requestUrl).toPromise();
          this.receivedResponse = res.data;
          if (this.receivedResponse.toString() === this.expectedResponse) {
            return { msg: res.data, log: null };
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedResponse,
              this.receivedResponse,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        } catch (err) {
          const log = this.createAndSendLog(
            this.requestUrl,
            err.message,
            this.expectedResponse,
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
          this.receivedResponse = res.status;
          if (this.receivedResponse.toString() === this.expectedResponse) {
            return { msg: `Status: ${res.status} | ${res.data}`, log: null };
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedResponse,
              `${this.receivedResponse} Status Code`,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        } catch (err) {
          if (err.response) {
            if (this.expectedResponse === err.response.status.toString()) {
              return { msg: `Status: ${err.response.status}`, log: null };
            } else {
              const log = this.createAndSendLog(
                this.requestUrl,
                this.errorResponseMsg,
                this.expectedResponse,
                `${err.response.status} Status Code`,
              );
              return { msg: this.errorResponseMsg, log: log };
            }
          } else {
            const log = this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedResponse,
              `${err.message}`,
            );
            return { msg: err.message, log: log };
          }
        }
      }
    }
  }
}
