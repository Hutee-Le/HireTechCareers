import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // route /
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // route " " /=> api (restfull)
  @Render('home')
  getHello() {
    const message = this.appService.getHello();

    return {
      message: message,
    };
  }
}
