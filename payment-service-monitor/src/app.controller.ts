import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { LogType} from 'logging-format';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Post()
  async convertIntoLog(
    @Body('message') message: string,
    @Body('type') logType: LogType
  ) {
      const logMsg = this.appService.createLogMsg(logType,message);
      return 'log message created!';
  }

  @Get('messages')
  getAllMessages(){
    return this.appService.getAllMessages();
  }
}
