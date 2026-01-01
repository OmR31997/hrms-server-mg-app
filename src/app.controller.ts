import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@common/decorators';

@ApiBearerAuth("access-token")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  api_test(): string {
    return this.appService.health();
  }
}
