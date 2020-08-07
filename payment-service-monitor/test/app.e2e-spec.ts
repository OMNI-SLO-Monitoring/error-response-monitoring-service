import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { dbMock } from '../src/db-mock-data/database-mock';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    let mockAppService = {
      getAllMessages: () => {
        return [];
      },
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getModelToken('selection'),
          useValue: dbMock,
        },
      ],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/messages (GET)', () => {
    return request(app.getHttpServer())
      .get('/messages')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
