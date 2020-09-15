import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpModule, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { LogMessageFormat, LogType } from 'logging-format';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  //mock log
  const mockMessages: LogMessageFormat[] = [
    {
      type: LogType.ERROR,
      time: Date.now(),
      sourceUrl: 'Database service',
      detectorUrl: 'Error Response Monitor',
      message: 'An error occurred',
      data: {
        expected: 'John',
        result: 'Jeff',
      },
    },
  ];
  //mock app service
  let appService = {
    getAllMessages: () => mockMessages,
  };

  beforeEach(async () => {
    let mockAppService = {
      getAllMessages: () => {
        return [];
      },
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(appService)

      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * Test function for a get request to fetch all the log messages with
   * mock log
   */
  it('/messages (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/messages')
      .expect(200)
      .expect(mockMessages);
  });
});

describe('Request Sender (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  /**
   * Test function for the case when expected response does equals
   * received response
   */
  it('/request-sender (POST) expected equals received response', async () => {
    const result = {
      data: 31,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    let mockReqParams = {
      url: 'http://localhost:3000/request-handler/balance',
      httpMethod: 'get',
      expResponse: '31',
      postBody: undefined,
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    return await request(app.getHttpServer())
      .post('/request-sender')
      .send(mockReqParams)
      .expect(201)
      .expect(`{"msg":31,"log":null}`);
  });
});
