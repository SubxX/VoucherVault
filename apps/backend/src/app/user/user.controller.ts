import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/auth.gurad';

@Controller('user')
export class UsersController {
  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    return { user: req?.user };
  }
}
