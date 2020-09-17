import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestSenderModule } from './request-sender/request-sender.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [RequestSenderModule, ConfigModule.forRoot({isGlobal:true}) ],
  controllers: [AppController],
})
export class AppModule {}
