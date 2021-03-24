import { Controller, Get } from '@nestjs/common';
import { Public } from 'decorators/Public';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  public getIndex(): string {
    return this.appService.getIndex();
  }
}
