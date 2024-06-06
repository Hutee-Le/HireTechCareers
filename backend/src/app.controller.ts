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
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';

@Controller() // route /
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get() // route " " /=> api (restfull)
  @Render('home')
  getHello() {
    const message = this.appService.getHello();

    return {
      message: message,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
