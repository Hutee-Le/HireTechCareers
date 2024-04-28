import { Controller, Get } from '@nestjs/common';

@Controller('user') // /user
export class UserController {
  @Get() // method GET => "/" === /user
  findAll(): string {
    return 'This action return all users';
  }

  @Get('/by-id') // GET => "/by-id" === /user/by-id
  findById(): string {
    return 'This action return a user by id';
  }
}
