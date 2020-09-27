import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { request } from 'http';
import { ErrorFormat, LogType } from 'logging-format';
import { v4 as uuidv4 } from 'uuid';
import { AppService } from '../app.service';

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
  async createAndSendLog(): Promise<ErrorFormat> {
    const error: ErrorFormat = {
      correlationId: uuidv4(),
      log: {
        type: LogType.ERROR,
        time: Date.now(),
        sourceUrl: this.requestUrl,
        detectorUrl: this.errorResponseMonitorUrl,
        message: this.errorResponseMsg,
        data: {
          expected: this.expectedResponse,
          actual: this.receivedResponse,
        },
      },
    };
    await this.logCreator.reportLogFromError(error);
    return error;
  }

  /**
   * Evaluates the provided result from the get request in the function makeRequest with
   * the expectedResponse variable set in the function makeRequest. It returns an object 
   * depending on the outcome of the evaluation.
   * 
   * @param result result from the get request in the function makeRequest
   * @returns an object that contains a message field named msg and a log field named log.
   * Depending on the outcome of the request, the log field is populated and the message is set
   * accordingly. The msg field is set to the fetched response data when it matches with the
   * expected response data, it will be set to an error message otherwise. The log field
   * is populated once the parameters are incorrect or the request can not be executed properly, it is
   * null otherwise.
   */
  async evaluateGetReq(result) {
    this.receivedResponse = result.data;
    if (this.receivedResponse.toString() === this.expectedResponse) {
      return { msg: result.data, log: null };
    } else {
      this.errorResponseMsg = "Incorrect Parameters"
      const error = await this.createAndSendLog();
      return { msg: this.errorResponseMsg, log: error.log };
    }
  }

  /**
   * Evaluates the provided result from the post request in the function makeRequest with
   * the expectedResponse variable set in the function makeRequest. It returns an object 
   * depending on the outcome of the evaluation.
   * 
   * @param result result from the post request in the function makeRequest
   * @returns an object that contains a message field named msg and a log field named log.
   * Depending on the outcome of the request, the log field is populated and the message is set
   * accordingly. The msg field is set to the fetched response data when it matches with the
   * expected response data, it will be set to an error message otherwise. The log field
   * is populated once the parameters are incorrect or the request can not be executed properly, it is
   * null otherwise.
   */
  async evaluatePostReq(result) {
    this.receivedResponse = result.status;
    if (this.receivedResponse.toString() === this.expectedResponse) {
      return { msg: `Status: ${result.status} | ${result.data}`, log: null };
    } else {
      this.errorResponseMsg = "Incorrect Parameters"
      this.receivedResponse = `${this.receivedResponse} Status Code`;
      const error = await this.createAndSendLog();
      return { msg: this.errorResponseMsg, log: error.log };
    }
  }

  /**
   * Evaluates the provided error from the post request in the function makeRequest with
   * the expectedResponse variable set in the function makeRequest. It returns an object 
   * depending on the outcome of the evaluation.
   * 
   * @param error error that has been thrown when executing the post request in the function makeRequest
   * @returns an object that contains a message field named msg and a log field named log.
   * Depending on the outcome of the request, the log field is populated and the message is set
   * accordingly. The msg field is set to the fetched response data when it matches with the
   * expected response data, it will be set to an error message otherwise. The log field
   * is populated once the parameters are incorrect or the request can not be executed properly, it is
   * null otherwise.
   */
  async evaluateErrorForPost(err) {
    if (this.expectedResponse === err.response.status.toString()) {
      return { msg: `Status: ${err.response.status}`, log: null };
    } else {
      this.errorResponseMsg = "Incorrect Parameters"
      this.receivedResponse = `${err.response.status} Status Code`;
      const error = await this.createAndSendLog();
      return { msg: this.errorResponseMsg, log: error.log };
    }
  }

  /**
   * Makes a request based on the request parameters inside post body
   * and calls evaluation function for the respective request if possible.
   * If requests can not be executed, a log is created and an object is returned
   * containing an error message and the respective log.
   * 
   * @param requestParams post body with request parameters
   *
   * @returns an object that contains a message field named msg and a log field named log.
   * The msg field is set to the error message and the log field is always populated with 
   * the log containing the information necessary describing the undesired behaviour.
   */
  async makeRequest(requestParams: any): Promise<any> {
    this.requestUrl = requestParams.url;
    this.expectedResponse = requestParams.expResponse;
    switch (requestParams.httpMethod) {
      case 'get': {
        try {
          const result = await this.httpService.get(this.requestUrl).toPromise();
          return await this.evaluateGetReq(result);
        } catch (err) {
          this.errorResponseMsg = err.message;
          this.receivedResponse = err.message;
          const error = await this.createAndSendLog();
          return { msg: err.message, log: error.log };
        }
      }
      case 'post': {
        try {
          const result = await this.httpService
            .post(this.requestUrl, { body: `${requestParams.postBody}` })
            .toPromise();
          return await this.evaluatePostReq(result);
        } catch (err) {
          if (err.response) {
            return await this.evaluateErrorForPost(err);
          } else {
            this.receivedResponse = `${err.message}`;
            const error = await this.createAndSendLog();
            return { msg: err.message, log: error.log };
          }
        }
      }
    }
  }
}
