import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggingModule } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';

@Module({
  imports: [
    LoggingModule,
    RequestSenderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
