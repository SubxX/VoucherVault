import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/user.module';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [],
  providers: [SupabaseStrategy],
  exports: [SupabaseStrategy],
})
export class AuthModule {}
