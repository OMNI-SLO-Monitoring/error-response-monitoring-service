import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggingModule } from 'logging-module';
import { RequestSenderModule } from './request-sender/request-sender.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [LoggingModule, RequestSenderModule, ConfigModule.forRoot({isGlobal:true}) ],
  controllers: [AppController],
})
export class AppModule {}
