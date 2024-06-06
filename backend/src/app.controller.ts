import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(@Request() req) {
    return req.user;
  }
}
