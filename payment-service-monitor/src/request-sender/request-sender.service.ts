import { Injectable, HttpService } from '@nestjs/common';
import { AppService } from '../app.service';
import { ConfigService } from '@nestjs/config';
import { LogMessageFormat, LogType } from 'logging-format';

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
  //this service url
  private errorResponseMonitorUrl = this.configService.get<string>(
    'BACKEND_RESPONSE_MONITOR_URL',
    'http://localhost:3400/',
  );

  constructor(
    private httpService: HttpService,
    private logCreator: AppService,
    private configService: ConfigService,
  ) {
    this.configService = new ConfigService();
  }

  /**
   * Upon failure, this method creates a log and sends it to the issue creator component and
   * stores the log in an array in the backend
   *
   * @param errorSource the source of error
   * @param errorMessage the message of the error
   * @param expectedResponse the data that is expected to be returned
   * @param receivedResponse the data that is actually returned
   */
  async createAndSendLog(
    errorSource: string,
    errorMessage: string,
    expectedResponse,
    receivedResponse,
  ): Promise<LogMessageFormat> {
    const log: LogMessageFormat = {
      type: LogType.ERROR,
      time: Date.now(),
      sourceUrl: errorSource,
      detectorUrl: this.errorResponseMonitorUrl,
      message: errorMessage,
      data: {
        expected: expectedResponse,
        actual: receivedResponse,
      },
    };
    await this.logCreator.createLogMsg(log);
    //await this.logCreator.sendLogMessage(log);
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
   * accordingly. The msg field is set to the fetched response data when it matches with the
   * expected response data, it will be set to an error message otherwise. The log field
   * is populated once the parameters are incorrect or the request can not be executed properly, it is
   * null otherwise.
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
            const log = await this.createAndSendLog(
              this.requestUrl,
              this.errorResponseMsg,
              this.expectedResponse,
              this.receivedResponse,
            );
            return { msg: this.errorResponseMsg, log: log };
          }
        } catch (err) {
          const log = await this.createAndSendLog(
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
            const log = await this.createAndSendLog(
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
              const log = await this.createAndSendLog(
                this.requestUrl,
                this.errorResponseMsg,
                this.expectedResponse,
                `${err.response.status} Status Code`,
              );
              return { msg: this.errorResponseMsg, log: log };
            }
          } else {
            const log = await this.createAndSendLog(
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
