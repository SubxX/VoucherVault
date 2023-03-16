import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase.guard';

@ApiTags('-User')
@Controller('user')
export class UsersController {
  @ApiBearerAuth()
  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    return { user: req?.user };
  }
}
